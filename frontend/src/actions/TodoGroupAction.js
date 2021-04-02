import { SET_ERROR } from '../constants';
import { createTodoGroup } from '../services/apis/TodoGroupAPIs';
import { debounce, doNothing } from '../utils/utils';
import { showMainLoader } from './InitAction';

export const createTodoGroups = (requestData, callback = doNothing) => async (dispatch) => {
  dispatch(showMainLoader(true, 0));
  dispatch(clearTodoErrors());
  try {
    await createTodoGroup(requestData);

    debounce(() => {
      callback();
    })();
  } catch (error) {
    dispatch({ type: SET_ERROR, value: error });
  } finally {
    dispatch(showMainLoader());
  }
};

export const updateTodoGroups = () => async (dispatch) => {};

export const deleteTodoGroups = () => async (dispatch) => {};

export const clearTodoErrors = () => (dispatch) => {
  const error = { code: 200, message: null };
  dispatch({ type: SET_ERROR, value: error });
};
