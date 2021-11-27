import { combineReducers } from 'redux';
import loginReducer from '../redux/login/reducer';
// 만든 리듀서를 import

const rootReducer = combineReducers({
  // 여기서 import 한 Reducer combine
  loginReducer,
});

export default rootReducer;
