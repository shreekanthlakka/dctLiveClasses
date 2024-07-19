const initialState = {
    count: 0,
};

function countReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 };
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        case "RESET":
            return initialState;
        case "INCREMENT_BY":
            return { ...state, count: state.count + action.payload };
        case "DECREMENT_BY":
            return { ...state, count: state.count - action.payload };
        case "SET_VALUE":
            return { ...state, count: action.payload };
        default:
            return state;
    }
}

export default countReducer;
