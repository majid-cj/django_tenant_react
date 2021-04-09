import { useEffect, useReducer, useState } from 'react';
import { getAPI } from '../services/apis/TodoGroupAPIs';

const INIT = 0,
  SUCCESS = 1,
  FAILED = 2;

const groupFetchReducer = (state, payload) => {
  switch (payload.type) {
    case INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SUCCESS:
      return {
        data: payload.value,
        loading: false,
        error: null,
      };

    case FAILED:
      return {
        data: {},
        loading: false,
        error: payload.value,
      };

    default:
      return state;
  }
};

export const fetchListHook = (initURL) => {
  const [url, setUrl] = useState(initURL);
  const [state, dispatch] = useReducer(groupFetchReducer, {
    data: {},
    loading: false,
    error: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getGroups = async () => {
      dispatch({ type: INIT });
      try {
        const response = await getAPI(url);
        const {count} = response
        if (!didCancel) dispatch({ type: SUCCESS, value: response });

        if (!didCancel && count === 0) {
          dispatch({ type: FAILED, value: 'list is empty' });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FAILED, value: error });
        }
      }
    };

    getGroups();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
