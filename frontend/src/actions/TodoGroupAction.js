import { SET_ERROR } from "../constants";
import { createTodoGroup } from "../services/apis/TodoGroupAPIs";
import { debounce, doNothing } from "../utils/utils";
import { clearAuthErrors } from "./AuthAction";
import { showMainLoader } from "./InitAction";

export const createTodoGroups = (requestData, callback = doNothing) => async (
  dispatch
) => {
  dispatch(showMainLoader(true, 0));
  try {
    await createTodoGroup(requestData);

    debounce(() => {
      callback();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
    dispatch(clearAuthErrors());
  }
};

export const updateTodoGroups = () => async (dispatch) => {};

export const deleteTodoGroups = () => async (dispatch) => {};
