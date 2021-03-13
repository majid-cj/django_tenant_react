import { LOGGED_IN } from "../constants";

const initialState = {
  logged_in: false,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case LOGGED_IN:
      return { ...state, logged_in: payload.value };

    default:
      return { ...state };
  }
};
