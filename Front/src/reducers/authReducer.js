import { axiosInstance } from '../actions/networking';

const INITIAL_STATE = {
  isSignedIn: null,
  token: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.value) {
        axiosInstance.defaults.headers.common = {
          Authorization: `Bearer ${action.payload.value}`,
        };
        return { ...state, isSignedIn: true, token: action.payload.value };
      }
      return state;
    case 'SIGN_OUT':
      delete axiosInstance.defaults.headers.common.Authorization;
      return { ...state, isSignedIn: false, token: null };
    default:
      return state;
  }
};
