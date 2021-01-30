import { UPDATE_TODO_GROUP_LIST } from "../constants";

const initialState = [];

export default (state = initialState, payload) => {
  switch (payload.type) {
    case UPDATE_TODO_GROUP_LIST:
      return payload.value;

    default:
      return { ...state };
  }
};
