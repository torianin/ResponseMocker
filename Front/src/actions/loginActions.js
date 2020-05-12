import { axiosInstance } from './networking';

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const login = (formValues) => async (dispatch) => {
  const response = await axiosInstance.post(
    '/login',
    {},
    {
      auth: {
        username: formValues.login,
        password: formValues.password
      },
    }
  );

  dispatch({
    type: 'LOGIN',
    payload: response.data,
  });
};
