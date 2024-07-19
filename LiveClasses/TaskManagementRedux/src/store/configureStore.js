import { createStore, combineReducers } from "redux";
import taskReducer from "../reducers/taskReducer";

const store = createStore(
    combineReducers({
        tasks: taskReducer,
    })
);

export default store;
