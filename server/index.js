require('dotenv').config();

// 필요한 모듈 다운
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const app = express();
const { createServer } = require('http');
const httpServer = createServer(app);
const { Server } = require('socket.io');

// port 80으로 변경
const port = process.env.HTTP_PORT || 80;

// Router 연결
const adminPage = require('./router/adminPage');
const chattingPage = require('./router/chattingPage');
const loginPage = require('./router/loginPage');
const mainPage = require('./router/mainPage');
const managementPage = require('./router/managementPage');
const mapPage = require('./router/mapPage');
const myPage = require('./router/myPage');
const signupPage = require('./router/signupPage');
const authPage = require('./router/authPage');
const fileManagement = require('./router/fileManagement');
const logout = require('./controller/logout');
const confirmEmail = require('./controller/functions/confirmEmail');

// 필요한 함수
// const getUserChatInfo = require('./controller/functions/getUserChatInfo');
const {
  isSocketAuthorized,
  getUserChatInfo,
  getChatContents,
  updateMessage,
} = require('./controller/functions/getUserChatInfo');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'http://localhost',
      'https://triplus.world',
      'https://www.triplus.world',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(cookieParser());

app.use('/admin', adminPage);
app.use('/chat', chattingPage);
app.use('/login', loginPage);
app.use('/main', mainPage);
app.use('/management', managementPage);
app.use('/map', mapPage);
app.use('/my', myPage);
app.use('/signup', signupPage);
app.use('/oauth', authPage);
app.use('/file-management', fileManagement);
app.get('/logout', logout.logout);
app.get('/confirmEmail', confirmEmail.confirmEmail);

app.get('/hello-triplus', (req, res) => {
  res.status(200).send('Hello triplus');
});

httpServer.listen(port, () => {
  console.log(`          server listening on ${port}`);
});

// * socket.io 부분
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'http://localhost',
      'https://triplus.world',
      'https://www.triplus.world',
    ],
    credentials: true,
  },
});

io.on('connection', async (socket) => {
  console.log(`connect with id: ${socket.id}`);

  // const userChatInfo = isSocketAuthorized(socket.handshake.headers.cookie['accessToken']);
  if (!socket.handshake.headers.cookie) return socket.emit('shouldLogin');
  const userInfo = isSocketAuthorized(socket.handshake.headers.cookie.replace('accessToken=', ''));
  // console.log(userInfo);
  if (!userInfo) return socket.emit('shouldLogin');

  const userChatInfos = await getUserChatInfo(userInfo);
  // console.log(userChatInfos);

  socket.emit('getRooms', userChatInfos);

  socket.on('joinRoom', async (currentRoom, selectedRoom) => {
    if (!!currentRoom) {
      socket.leave(currentRoom);
    }
    socket.join(selectedRoom);
    console.log('joinRoom', io.sockets.adapter.rooms);
    const messages = await getChatContents(selectedRoom);
    const initialChat = JSON.parse(messages);
    socket.emit('initialChat', initialChat);
  });

  socket.on('sendMessage', (DBform, selectedRoom) => {
    console.log('socket-id는 ', socket.id);
    const { date, user_id, content } = DBform;
    const messageUpdate = {
      date,
      user_id,
      content,
    };
    updateMessage(messageUpdate, selectedRoom);
    const data = { date, user_id, content };
    console.log(data);
    io.to(selectedRoom).emit('getMessage', [data]);
  });

  socket.on('disconnectng', () => {
    console.log('disconnecting');
  });

  socket.on('disconnect', () => {
    console.log('disconnected -------------------------------------------------');
    console.log('disconnect', io.sockets.adapter.rooms);
  });
});

// 서버 실행할 때, sequelize 실행하여 데이터베이스 생성

sequelize
  .sync({
    alert: true,
  })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((error) => {
    console.log(error);
  });

// TODO
/**
 * * 1. 채팅 페이지 접근
 * > 로그인을 한다
 * > axios.get 요청 토큰을 보낸다 GET /chat/rooms
 * > 토큰을 확인하고, 요청자 userId 정보를 가져온다
 * > 가져온 정보를 바탕으로 roomId, room에 속한 다른 유저의 userId를 가져온다
 * > 클라이언트에 roomId, roomId 와 연결된 상대 userId 도 보내준다.
 * > room 을 select 하기 전까지는 내용을 가져오지 않는다.
 *
 * * 2. Select room
 * > axios.get(roomId)
 * > 데이터 베이스에 존재하는 message 들을 가져온다.
 * > message 는 배열이고, 클라이언트 쪽에서는 message 순회를 한다
 * > message 요소 객체 내에 userId: ~~ 가 본인과 동일하다면 오른쪽 컴포넌트로,
 * > userId 가 본인과 동일하지 않다면 왼쪽 컴포넌트로 만든다.
 *
 * * 3. sendMessage
 * > input 창에 담긴 정보가 socket event 'sendMessage' 를 통해 전달된다.
 * > roomId도 함께 보낸다
 *
 * > 프론트엔드:
 * >>> 콜백 함수를 이용해서 자신이 전달한 메세지를 컴포넌트로 만든다
 *
 * > 백엔드:
 * >>> 해당 roomId인 chat_room 테이블에 message 를 업데이트 한다
 * >>> 프론트엔드에서 받은 콜백 함수를 실행한다
 * >>> socket.to(roomId).emit('getMessage', msg) 를 통해서 룸에 존재하는 본인 이외의 다른 사람에게 받은 메세지를 전달한다
 *
 * * 4. getMessage
 * > 받은 메세지는 왼쪽 채팅 컴포넌트로 만든다
 *
 * * 5. 채팅 버튼 누르기
 * > post 요청
 * > 나의 userId (토큰)
 * > 상대의 userId (body)
 *
 * > let isDuplicate = false
 *
 * > const myRoom = chat_member.findAll({where: {userId: accessToken.userId}}) // [A, B, C]
 * > const yourRoom = chat_member.findAll({where: userId = req.body.userId})
 * > for(let room of myRoom) {
 * >   for (let another of yourRoom){
 * >      if(room.room_id === another.room_id) {
 * >        isDuplicate = true
 * >        break
 * >      }
 * >    }
 * > }
 *
 * > if(isDuplicate) {
 * >   // 있는 방을 그대로 사용하는 것
 * >   return
 * > } else {
 * >   // 채팅방을 생성한 것
 * >   chat_room.create()
 * >   userList 에 room_id 넣기
 * >   chat_member.bulkCreate(userList)
 * >   return room_Id
 * > }
 *
 * > 채팅방이 만들어진다.
 * > 프론트엔드 쪽에서 '/chat'
 * > subRouting 은 따로 구현하지 않는다.
 * > 그 만들어진 roomId 자체를 select 하는 걸로
 */
