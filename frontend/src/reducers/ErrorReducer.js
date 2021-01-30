import { CLEAR_ERROR, SET_ERROR } from "../constants";

const initialState = {
  auth: null,
  general: null,
  user: null,
};

export default (state = initialState, payload) => {
  if (payload.type !== SET_ERROR) return { ...state };
  if (payload.type === CLEAR_ERROR) return { ...initialState };

  const { code, message } = payload.value;

  switch (code) {
    case 100:
      return { ...state, auth: message };

    case 200:
      return { ...state, general: message };

    case 300:
      return { ...state, user: message };

    default:
      return { ...state };
  }
};
