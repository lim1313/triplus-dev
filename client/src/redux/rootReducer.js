import { combineReducers } from 'redux';
import loginReducer from '../redux/login/reducer';
import { adminReducer, adminOpenReducer } from '../redux/admin/reducer';
import { openModalReducer } from '../redux/signup/reducer';
import { guideCardsReducer } from '../redux/map/reducer';
import scrollListener from '../redux/scroll/reducer';

const rootReducer = combineReducers({
  loginReducer,
  adminReducer,
  adminOpenReducer,
  guideCardsReducer,
  scrollListener,
  openModalReducer,
});

export default rootReducer;
