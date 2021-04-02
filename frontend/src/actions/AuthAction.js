import { LOGGED_IN, LOG_OUT, SET_ERROR, SET_USER } from '../constants';
import { refreshToken, signinAPI, signupAPI } from '../services/apis/AuthAPIs';
import { deleteToken, setToken } from '../services/storages/Auth';
import { deleteUser, setUser } from '../services/storages/User';
import { debounce, doNothing } from '../utils/utils';
import { showMainLoader } from './InitAction';

export const signinUser = (signinData, callBack = doNothing) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearAuthErrors());
  try {
    const response = await signinAPI(signinData);

    const { access, refresh, id, username } = response;

    const user = { id: id, username: username };
    const token = { access: access, refresh: refresh };

    setToken(token);
    setUser(user);

    dispatch({ type: SET_USER, value: { ...user } });
    dispatch({ type: LOGGED_IN, value: true });

    debounce(() => {
      callBack();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
    dispatch(clearAuthErrors());
  }
};

export const signupUser = (signupData, callBack = doNothing) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearAuthErrors());
  try {
    await signupAPI(signupData);
    debounce(() => {
      callBack();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
    dispatch(clearAuthErrors());
  }
};

export const refreshUserToken = () => async (dispatch) => {
  dispatch(clearAuthErrors());
  try {
    const { refresh_token, access_token } = await refreshToken();
    const token = { access: access_token, refresh: refresh_token };
    setToken(token);
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  }
};

export const signoutUser = (callBack = doNothing) => (dispatch) => {
  deleteUser();
  deleteToken();
  dispatch({ type: LOG_OUT });
  dispatch({ type: LOGGED_IN, value: false });

  debounce(() => {
    callBack();
  })();
};

export const clearAuthErrors = (timeout = 5000) => (dispatch) => {
  const error = { code: 300, message: null };
  debounce(() => {
    dispatch({ type: SET_ERROR, value: error });
  }, timeout)();
};
