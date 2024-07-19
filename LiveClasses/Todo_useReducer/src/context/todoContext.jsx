import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    todos: [],
    isLoading: false,
    error: {},
    selected: {},
};

function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] };
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((ele) => ele.id !== action.payload),
            };
        case "TOGGLE_TODO":
            return {
                ...state,
                todos: state.todos.map((ele) =>
                    ele.id === action.payload
                        ? { ...ele, isComplected: !ele.isComplected }
                        : ele
                ),
            };
        case "default":
            return state;
    }
}

const todoContext = createContext();
function TodoContextProvider({ children }) {
    const [state, dispatch] = useReducer(
        todoReducer,
        localStorage.getItem("initTodo")
            ? JSON.parse(localStorage.getItem("initTodo"))
            : initialState
    );

    const { todos, isLoading, selected, error } = state;
    useEffect(() => {
        localStorage.setItem("initTodo", JSON.stringify(state));
    }, [state]);

    const values = {
        todos,
        isLoading,
        error,
        selected,
        dispatch,
    };
    return (
        <todoContext.Provider value={values}>{children}</todoContext.Provider>
    );
}

function useTodo() {
    return useContext(todoContext);
}

export { TodoContextProvider, useTodo };
