import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import jobReducer from "./jobSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobReducer,
    },
});

export default store;
