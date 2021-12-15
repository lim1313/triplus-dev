import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loginReducer from '../redux/login/reducer';
import { adminReducer, adminOpenReducer } from '../redux/admin/reducer';
import { openModalReducer } from '../redux/signup/reducer';
import { guideCardsReducer, guideModalReducer } from '../redux/map/reducer';
import { cardFilterReducer } from '../redux/mapFilter/reducer';
import scrollReducer from '../redux/scroll/reducer';
import toggleReducer from '../redux/toggle/reducer';
import { chatUserInfoReducer, chatListReducer, currentRoomReducer } from '../redux/chat/reducer';
import { guideDeleteReducer } from './management/reducer';
import { openTourModalReducer } from './tourManagement/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['loginReducer', 'adminReducer'],
  blacklist: [
    'cardFilterReducer',
    'guideModalReducer',
    'guideCardsReducer',
    'chatUserInfoReducer',
    'chatListReducer',
    'currentRoomReducer',
    'guideDeleteReducer',
    'openTourModalReducer',
  ],
};

const rootReducer = combineReducers({
  loginReducer,
  adminReducer,
  adminOpenReducer,
  scrollReducer,
  toggleReducer,
  openModalReducer,
  cardFilterReducer,
  guideCardsReducer,
  guideModalReducer,
  chatUserInfoReducer,
  chatListReducer,
  currentRoomReducer,
  guideDeleteReducer,
  openTourModalReducer,
});

export default persistReducer(persistConfig, rootReducer);
