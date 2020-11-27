import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootreducer from './reducer'
const middleware = [thunk];

const store = createStore(rootreducer, compose(applyMiddleware(...middleware)));

export default store;