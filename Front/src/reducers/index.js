import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import responsesReducer from './responsesReducer';
import loginReducer from './authReducer';

export default combineReducers({
  responses: responsesReducer,
  auth: loginReducer,
  form: formReducer,
});
