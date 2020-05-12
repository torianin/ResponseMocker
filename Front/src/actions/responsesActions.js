import { axiosInstance } from './networking';

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

export const fetchResponse = (id) => async (dispatch) => {
  const response = await axiosInstance.get(`/responses/${id}`);

  dispatch({
    type: 'FETCH_RESPONSE',
    payload: response.data,
  });
};

export const createResponse = (formValues) => async (dispatch) => {
  const response = await axiosInstance.post('/responses', formValues);

  dispatch({
    type: 'CREATE_RESPONSE',
    payload: response.data,
  });
};

export const editResponse = (id, formValues) => async (dispatch) => {
  const response = await axiosInstance.put(`/responses/${id}`, formValues);

  dispatch({
    type: 'EDIT_RESPONSE',
    payload: response.data,
  });
};

export const deleteResponse = (id) => async (dispatch) => {
  await axiosInstance.delete(`/responses/${id}`);

  dispatch({
    type: 'DELETE_RESPONSE',
    payload: id,
  });
};
