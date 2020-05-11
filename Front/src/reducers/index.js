import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import responsesReducer from './responsesReducer';

export default combineReducers({
  responses: responsesReducer,
  form: formReducer,
});
