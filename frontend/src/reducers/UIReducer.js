import { AUTH_LOADER, TODO_GROUP_DIALOG } from "../constants";

const initialState = {
  loader: false,
  dialog: false,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case AUTH_LOADER:
      return { ...state, loader: payload.value };

    case TODO_GROUP_DIALOG:
      return { ...state, dialog: payload.value };

    default:
      return { ...state };
  }
};
