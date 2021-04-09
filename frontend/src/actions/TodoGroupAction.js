import { SET_ERROR, TODO_GROUP_URL } from '../constants';
import { createAPI, updateAPI } from '../services/apis/TodoGroupAPIs';
import { debounce, doNothing } from '../utils/utils';
import { showMainLoader } from './InitAction';

export const createTodoGroups = (requestData, callback = doNothing) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearTodoErrors());
  try {
    await createAPI(requestData);

    debounce(() => {
      callback();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
  }
};

export const updateTodoGroups = (requestData, callback = doNothing) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearTodoErrors());
  try {
    await updateAPI(requestData, TODO_GROUP_URL);

    debounce(() => {
      callback();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
  }
};

export const deleteTodoGroups = () => async (dispatch) => {};

export const clearTodoErrors = () => (dispatch) => {
  const error = { code: 200, message: null };
  dispatch({ type: SET_ERROR, value: error });
};
