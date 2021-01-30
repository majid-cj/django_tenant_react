import {
  APP_VIEW,
  AUTH_VIEW,
  LOGGED_IN,
  APP_NAVIGATION,
  AUTH_NAVIGATION,
} from "../constants";

const initialState = {
  logged_in: false,
  app_nav: APP_VIEW.HOME,
  auth_nav: AUTH_VIEW.SIGN_IN,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case LOGGED_IN:
      return { ...state, logged_in: payload.value };

    case APP_NAVIGATION:
      return { ...state, app_nav: payload.value };

    case AUTH_NAVIGATION:
      return { ...state, auth_nav: payload.value };

    default:
      return { ...state };
  }
};
