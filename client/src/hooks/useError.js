import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { exit } from '../redux/login/action';

export const useError = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isError = (content) => {
    alert(content || '로그인이 유효하지 않습니다. 로그인해 주세요');
    dispatch(exit());
    navigate('/login', { replace: true });
  };

  return [isError];
};

// yeji / 20211210
// 기능 : 401 statue code를 받았을 경우 강제 로그아웃 후 login 페이지로 이동
// 매개변수
// 1) content : alert의 커스텀한 메시지
