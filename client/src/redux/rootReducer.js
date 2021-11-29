import { combineReducers } from 'redux';
import loginReducer from '../redux/login/reducer';
import { adminReducer, adminOpenReducer } from '../redux/admin/reducer';
import scrollListener from '../redux/scroll/reducer';
// 만든 리듀서를 import

const rootReducer = combineReducers({
  // 여기서 import 한 Reducer combine
  loginReducer,
  adminReducer,
  adminOpenReducer,
  scrollListener,
});

export default rootReducer;
