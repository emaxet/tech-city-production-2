import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import authentication from './reducers/authentication';

export default combineReducers({
  flashMessages,
  authentication
})