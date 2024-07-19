const increment = () => {
    return {
        type: "INCREMENT",
    };
};
const decrement = () => {
    return {
        type: "DECREMENT",
    };
};

const reset = () => {
    return {
        type: "RESET",
    };
};

const incrementBy = (num) => {
    return {
        type: "INCREMENT_BY",
        payload: Number(num),
    };
};

const decrementBy = (num) => {
    return {
        type: "DECREMENT_BY",
        payload: Number(num),
    };
};

const setValue = (val) => {
    return {
        type: "SET_VALUE",
        payload: Number(val),
    };
};
export { increment, decrement, reset, incrementBy, decrementBy, setValue };
