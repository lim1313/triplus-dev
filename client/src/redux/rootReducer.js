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
import { chatUserInfoReducer, chatListReducer } from '../redux/chat/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['loginReducer'],
  blacklist: [
    'cardFilterReducer',
    'guideModalReducer',
    'guideCardsReducer',
    'chatUserInfoReducer',
    'chatListReducer',
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
});

export default persistReducer(persistConfig, rootReducer);
