import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWare = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
