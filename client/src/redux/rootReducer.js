import { combineReducers } from 'redux';
import loginReducer from '../redux/login/reducer';
import { adminReducer, adminOpenReducer } from '../redux/admin/reducer';
import { openModalReducer } from '../redux/signup/reducer';
import { guideCardsReducer } from '../redux/map/reducer';
import scrollListener from '../redux/scroll/reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['loginReducer'],
};

const rootReducer = combineReducers({
  loginReducer,
  adminReducer,
  adminOpenReducer,
  guideCardsReducer,
  scrollListener,
  openModalReducer,
});

export default persistReducer(persistConfig, rootReducer);
