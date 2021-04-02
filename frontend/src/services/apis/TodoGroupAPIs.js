import { TODO_GROUP_URL } from '../../constants';
import { BadRequest, GeneralError, ServerError, UnauthorizedRequest } from '../../utils/errors';
import { api } from './API';

export const createTodoGroup = async (requestData) => {
  try {
    const response = await api().post(TODO_GROUP_URL, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const {
      status,
      data: { name },
    } = error.response;
    handleStatusCode(status, name[0]);
  }
};

export const getTodoGroup = async (url = TODO_GROUP_URL) => {
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

export const getTodoGroupByID = async (id) => {
  try {
    const response = await api().get(`${TODO_GROUP_URL}${id}/`);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const updateTodoGroup = async (requestData) => {
  const { id } = requestData;
  try {
    const response = await api().put(`${TODO_GROUP_URL}${id}/`, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const deleteTodoGroup = async (id) => {
  try {
    const response = await api().delete(`${TODO_GROUP_URL}${id}/`);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

const handleStatusCode = (code, message = '') => {
  switch (code) {
    case 200:
    case 201:
      break;

    case 400:
      throw new BadRequest(200, message);

    case 401:
      throw new UnauthorizedRequest();

    case 404:
      throw new NotData();

    case 503:
      throw new ServerError();

    default:
      throw new GeneralError();
  }
};
