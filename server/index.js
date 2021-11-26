require("dotenv").config();

// 필요한 모듈 다운
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {sequelize} = require("./models");
const app = express();

// port 80으로 변경
const port = process.env.HTTP_PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());

app.get("/hello-triplus", (req, res) => {
  res.status(200).send("Hello triplus");
});

// 서버 실행할 때, sequelize 실행하여 데이터베이스 생성
sequelize.sync({
  force: false
}).then(() => {
  console.log('데이터베이스 연결 성공');
}).catch((error) => {
  console.log(error);
});

app.listen(port, () => {
  console.log(`          server listening on ${port}`);
});
