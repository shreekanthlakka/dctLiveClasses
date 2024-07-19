import {
    ADD_TASK,
    CHANGE_STATUS,
    EDIT_TASK,
    REMOVE_TASK,
    TOGGLE_IS_COMPLETED,
    UPDATE_TASK,
} from "./actionTyles";

const addTask = (data) => {
    return {
        type: ADD_TASK,
        payload: data,
    };
};

const removeTask = (id) => {
    return {
        type: REMOVE_TASK,
        payload: id,
    };
};

const toggleIsComplected = (id) => {
    return {
        type: TOGGLE_IS_COMPLETED,
        payload: id,
    };
};

const changeTaskStatus = (status) => {
    return {
        type: CHANGE_STATUS,
        payload: status,
    };
};

const editTask = (id) => {
    return {
        type: EDIT_TASK,
        payload: id,
    };
};

const updateTask = (id) => {
    return {
        type: UPDATE_TASK,
        payload: id,
    };
};

export {
    addTask,
    removeTask,
    toggleIsComplected,
    changeTaskStatus,
    editTask,
    updateTask,
};
