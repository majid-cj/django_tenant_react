import axios from "axios";
import { ROOT } from "../../constants";
import { getToken } from "../storages/Auth";
import { getLanguage } from "../storages/language";
import { getUser } from "../storages/User";

export const api = () => {
  const user = getUser();
  const token = getToken();
  const language = getLanguage();

  const baseURL = user ? `${user.username}.${ROOT}` : ROOT;
  const headers = token ? { Authorization: `Bearer ${token.access}` } : {};

  return axios.create({
    baseURL: `http://${baseURL}${language}/`,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": language,
    },
    timeout: 5000,
  });
};
