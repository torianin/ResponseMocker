import _ from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESPONSES':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'CREATE_RESPONSE':
      return { ...state, [action.payload.id]: action.payload };
    case 'EDIT_RESPONSE':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_RESPONSE':
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
