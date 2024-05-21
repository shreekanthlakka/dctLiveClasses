import { createContext, useContext, useReducer } from "react";
import { loginApi, logoutApi } from "../services/userService";

const initialState = {
    userAccount: {},
    isLoading: false,
    isLoggedIn: false,
    errors: null,
    profile: {},
    isAuthenticated: false,
    role: "",
};
const userContext = createContext();

function userReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, errors: null };
        case "ERROR":
            return { ...state, isLoading: false, errors: action.payload };
        case "LOGIN":
            return {
                ...state,
                isLoading: false,
                userAccount: action.payload,
                role: action.role,
            };
        case "SET_USER":
            return {
                isLoading: false,
                userAccount: action.payload,
                isLoggedIn: true,
                isAuthenticated: action.isAuthenticated,
            };
        case "SET_PROFILE":
            return { ...state, isLoading: false, profile: action.payload };
        case "LOGOUT":
            return initialState;
        case "DEFAULT":
            return state;
    }
}

function UserContextProvider({ children }) {
    const [
        {
            userAccount,
            isLoading,
            errors,
            isLoggedIn,
            profile,
            role,
            isAuthenticated,
        },
        dispatch,
    ] = useReducer(userReducer, initialState);

    const loginUser = async ({ email, password }) => {
        try {
            dispatch({ type: "START" });
            const res = await loginApi({ email, password });
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.errors })
                );
            }
            dispatch({ type: "LOGIN", payload: res.user, role: res.user.role });

            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: JSON.parse(error.message) });
        }
    };

    const logoutUser = async () => {
        try {
            dispatch({ type: "START" });
            const res = await logoutApi();
            if (!res.success) {
                throw {
                    status: 503,
                    message: "Server error occurred while logging out.",
                };
            }
            if (res.success) {
                localStorage.removeItem("token");
                dispatch({ type: "LOGOUT" });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const value = {
        userAccount,
        isLoading,
        errors,
        isLoggedIn,
        loginUser,
        dispatch,
        logoutUser,
        profile,
        role,
        isAuthenticated,
    };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("Use User context is out of scope");
    }
    return context;
}

export { UserContextProvider, useUser };
