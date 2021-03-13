import { useEffect, useReducer, useState } from "react";
import { getTodoGroup } from "../services/apis/TodoGroupAPIs";

const INIT = 0,
  SUCCESS = 1,
  FAILED = 2;

const grougFetchReducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SUCCESS:
      return {
        data: action.value,
        loading: false,
        error: null,
      };

    case FAILED:
      return {
        data: {},
        loading: false,
        error: action.value,
      };

    default:
      return state;
  }
};

export const getGroupsList = (initURL) => {
  const [url, setUrl] = useState(initURL);
  const [state, dispatch] = useReducer(grougFetchReducer, {
    data: {},
    loading: false,
    error: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getGroups = async () => {
      dispatch({ type: INIT });
      try {
        const response = await getTodoGroup(url);
        if (!didCancel) dispatch({ type: SUCCESS, value: response });

        if (!didCancel && response.count === 0)
          dispatch({ type: FAILED, value: "list is empty" });
      } catch (error) {
        if (!didCancel) dispatch({ type: FAILED, value: error });
      }
    };

    getGroups();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
