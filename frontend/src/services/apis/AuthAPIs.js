import { REFRESH_TOKEN_URL, SIGNIN_URL, SIGNUP_URL } from "../../constants";
import {
  BadRequest,
  GeneralError,
  ServerError,
  UserNotExits,
} from "../../utils/errors";
import { getToken } from "../storages/Auth";
import { api } from "./API";

export const signinAPI = async (requestData) => {
  try {
    const response = await api().post(SIGNIN_URL, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const signupAPI = async (requestData) => {
  try {
    const response = await api().post(SIGNUP_URL, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

export const refreshToken = async () => {
  const { refresh } = getToken();
  const requestData = { refresh_token: refresh };
  try {
    const response = await api().post(REFRESH_TOKEN_URL, requestData);
    const { status } = response;
    handleStatusCode(status);
    return response.data;
  } catch (error) {
    const { status } = error.response;
    handleStatusCode(status);
  }
};

const handleStatusCode = (status_code) => {
  switch (status_code) {
    case 200:
    case 201:
      break;

    case 400:
      throw new BadRequest();

    case 401:
      throw new UserNotExits();

    case 503:
      throw new ServerError();

    default:
      throw new GeneralError();
  }
};
