import { TODO_URL } from "../../constants";
import {
  BadRequest,
  GeneralError,
  ServerError,
  UnauthorizedRequest,
} from "../../utils/errors";
import { api } from "./API";

export const createTodo = async (requestData) => {
  try {
    const response = await api().post(TODO_URL, requestData);
    const { status } = response;
    handleTodoStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const getTodo = async () => {
  try {
    const response = await api().get(TODO_URL);
    const { status } = response;
    handleTodoStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const getTodoByID = async (id) => {
  try {
    const response = await api().get(`${TODO_URL}${id}/`);
    const { status } = response;
    handleTodoStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const updateTodo = async (requestData) => {
  const { id } = requestData;
  try {
    const response = await api().put(`${TODO_URL}${id}/`, requestData);
    const { status } = response;
    handleTodoStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api().delete(`${TODO_URL}${id}/`);
    const { status } = response;
    handleTodoStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

const handleTodoStatusCode = (code) => {
  switch (code) {
    case 200:
    case 201:
      break;

    case 400:
      throw new BadRequest();

    case 401:
      throw new UnauthorizedRequest();

    case 503:
      throw new ServerError();

    default:
      throw new GeneralError();
  }
};
