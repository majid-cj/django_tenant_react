import { SET_ERROR, TODO_URL } from '../constants';
import { createAPI, deleteAPI, updateAPI } from '../services/apis/TodoGroupAPIs';
import { debounce, doNothing } from '../utils/utils';
import { showMainLoader } from './InitAction';

export const createTodo = (requestData, callback = doNothing) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearTodoErrors());
  try {
    await createAPI(requestData, TODO_URL);

    debounce(() => {
      callback();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
  }
};

export const updateTodo = (requestData) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearTodoErrors());
  try {
    await updateAPI(requestData, TODO_URL);
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearTodoErrors());
  try {
    await deleteAPI(id, TODO_URL);
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
  }
};

export const clearTodoErrors = () => (dispatch) => {
  const error = { code: 200, message: null };
  dispatch({ type: SET_ERROR, value: error });
};
