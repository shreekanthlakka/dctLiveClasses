import { useEffect } from "react";
import TaskManager from "./components/TaskManager";
import { useSelector } from "react-redux";

function App() {
    const state = useSelector((state) => state.tasks);
    useEffect(() => {
        localStorage.setItem("initialState", JSON.stringify(state));
    }, [state]);
    return (
        <div>
            <TaskManager />
        </div>
    );
}

export default App;
