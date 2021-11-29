import { combineReducers } from 'redux';
import loginReducer from '../redux/login/reducer';
import { adminReducer, adminOpenReducer } from '../redux/admin/reducer';
import { guideCardsReducer } from '../redux/map/reducer';

const rootReducer = combineReducers({
  loginReducer,
  adminReducer,
  adminOpenReducer,
  guideCardsReducer,
});

export default rootReducer;
