export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESPONSES':
      return action.payload;
    default:
      return state;
  }
};
