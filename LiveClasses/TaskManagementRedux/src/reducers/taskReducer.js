import {
    ADD_TASK,
    ALL,
    CHANGE_STATUS,
    EDIT_TASK,
    REMOVE_TASK,
    TOGGLE_IS_COMPLETED,
    UPDATE_TASK,
} from "../actions/actionTyles";

const initialState = {
    tasks: [],
    selectedStatus: ALL,
    editId: null,
};

function taskReducer(
    state = localStorage.getItem("initialState")
        ? JSON.parse(localStorage.getItem("initialState"))
        : initialState,
    action
) {
    switch (action.type) {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((ele) => ele.id !== action.payload),
            };
        case TOGGLE_IS_COMPLETED:
            return {
                ...state,
                tasks: state.tasks.map((ele) =>
                    ele.id === action.payload
                        ? { ...ele, isComplected: !ele.isComplected }
                        : ele
                ),
            };
        case CHANGE_STATUS:
            return { ...state, selectedStatus: action.payload };
        case EDIT_TASK:
            return { ...state, editId: action.payload };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((ele) =>
                    ele.id === action.payload.id
                        ? { ...action.payload }
                        : { ...ele }
                ),
            };
        default:
            return state;
    }
}

export default taskReducer;
