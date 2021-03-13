import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";
import ConfigurationReducer from "./ConfigurationReducer";
import TodoGroupReducer from "./TodoGroupReducer";
import TodoReducer from "./TodoReducer";
import UserReducer from "./UserReducer";
import UIReducer from "./UIReducer";

export default combineReducers({
  error: ErrorReducer,
  config: ConfigurationReducer,
  group: TodoGroupReducer,
  todo: TodoReducer,
  user: UserReducer,
  ui: UIReducer,
});
