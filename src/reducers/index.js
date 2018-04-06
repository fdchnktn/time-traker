import { combineReducers } from 'redux';
import initializeReducer from './initializeReducer';

export default combineReducers({
  initializationData: initializeReducer
});