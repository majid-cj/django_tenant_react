import { AUTH_LOADER, LOGGED_IN, SET_ERROR, SET_USER } from '../constants';
import { getToken } from '../services/storages/Auth';
import { getUser } from '../services/storages/User';
import { debounce } from '../utils/utils';

export const initApp = () => (dispatch) => {
  const user = getUser();
  const token = getToken();

  dispatch({ type: SET_USER, value: { user: user, token: token } });
  dispatch({ type: LOGGED_IN, value: user ? true : false });
};

export const setAuthErrors = (message) => (dispatch) => {
  const error = { code: 300, message: message };
  dispatch({ type: SET_ERROR, value: error });
};

export const showMainLoader = (show = false, timeout = 75) => (dispatch) => {
  debounce(() => {
    dispatch({ type: AUTH_LOADER, value: show });
  }, timeout)();
};
