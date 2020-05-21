const INITIAL_STATE = {
  isSignedIn: localStorage.access_token !== undefined,
  token: localStorage.access_token,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.value) {
        localStorage.setItem('access_token', action.payload.value);
        return { ...state, isSignedIn: true, token: action.payload.value };
      }
      return state;
    case 'SIGN_OUT':
      localStorage.removeItem('access_token');
      return { ...state, isSignedIn: false, token: null };
    default:
      return state;
  }
};
