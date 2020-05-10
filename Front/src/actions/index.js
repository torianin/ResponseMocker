const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
});

export const selectResponse = (response) => {
  return {
    type: 'RESPONSE_SELECTED',
    payload: response,
  };
};

export const fetchResponses = () => async (dispatch) => {
  const response = await axiosInstance.get('/responses');

  dispatch({
    type: 'FETCH_RESPONSES',
    payload: response.data,
  });
};

export const removeResponse = (id) => async (dispatch) => {
  const response = await axiosInstance.delete('/responses/${id}');

  dispatch({
    type: 'REMOVE_RESPONSE',
    payload: response.data,
  });
};
