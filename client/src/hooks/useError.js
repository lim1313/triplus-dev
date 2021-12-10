import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { exit } from '../redux/login/action';

export const useError = (content) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isError = (e) => {
    alert(content || '로그인이 만료되었습니다. 다시 로그인해 주세요');
    dispatch(exit());
    navigate('/login', { replace: true });
  };

  return [isError];
};
