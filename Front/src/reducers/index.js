import { combineReducers } from 'redux';
import responsesReducer from './responsesReducer';

export default combineReducers({
    responses: responsesReducer
});
