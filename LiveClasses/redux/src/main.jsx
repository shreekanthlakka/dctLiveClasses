import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import taskApp from "../src/ReduxTasks/taskCRUD/taskApp.jsx";
import configureStore from "./store/configureStore.js";

const store = configureStore();
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <taskApp />
        </Provider>
    </React.StrictMode>
);
