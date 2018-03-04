import {createStore, applyMiddleware} from 'redux';
import Reducer from '../reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];

const Store = createStore(
  Reducer,
  applyMiddleware(...middleware)
);
export default Store;