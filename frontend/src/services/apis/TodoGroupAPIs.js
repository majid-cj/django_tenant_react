import { TODO_GROUP_URL } from '../../constants';
import { BadRequest, GeneralError, ServerError, UnauthorizedRequest } from '../../utils/errors';
import { api } from './API';

export const createAPI = async (requestData, URL = TODO_GROUP_URL) => {
  try {
    const response = await api().post(URL, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const getAPI = async (url = TODO_GROUP_URL) => {
  try {
    const response = await api().get(url);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const updateAPI = async (requestData, URL) => {
  const { id } = requestData;
  try {
    const response = await api().put(`${URL}${id}/`, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const deleteAPI = async (id, URL) => {
  try {
    const response = await api().delete(`${URL}${id}/`);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

const handleStatusCode = (code) => {
  switch (code) {
    case 200:
    case 201:
      break;

    case 400:
      throw new BadRequest(200);

    case 401:
      throw new UnauthorizedRequest(200);

    case 404:
      throw new NotData(200);

    case 503:
      throw new ServerError(200);

    default:
      throw new GeneralError(200);
  }
};
