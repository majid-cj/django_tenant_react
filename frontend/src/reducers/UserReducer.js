import { LOG_OUT, SET_USER } from "../constants";

const initialState = {
  user: undefined,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case SET_USER:
      return { user: payload.value };

    case LOG_OUT:
      return { user: undefined };

    default:
      return { ...state };
  }
};
