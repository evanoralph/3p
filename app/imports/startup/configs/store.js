
// This config file has all the reducers used across all modules
import { combineReducers, createStore } from 'redux';

// Reducers
import * as mainReducers from './reducers/index';

const reducer = combineReducers({ ...mainReducers });
const Store = createStore(reducer);

export default Store;