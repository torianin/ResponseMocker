import { combineReducers } from 'redux';
import responsesReducer from './responsesReducer';
import loginReducer from './authReducer';

export default combineReducers({
  responses: responsesReducer,
  auth: loginReducer,
});
