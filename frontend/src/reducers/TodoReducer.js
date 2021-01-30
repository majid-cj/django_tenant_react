import { UPDATE_TODO_LIST } from "../constants";

const initialState = [];

export default (state = initialState, payload) => {
  switch (payload.state) {
    case UPDATE_TODO_LIST:
      return payload.value;

    default:
      return { ...state };
  }
};
