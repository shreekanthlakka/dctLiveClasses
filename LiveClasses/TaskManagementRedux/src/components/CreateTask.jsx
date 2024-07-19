import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, updateTask } from "../actions/taskActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & input {
        width: 30rem;
    }
`;

const RadioStyles = styled.div``;

const initialState = {
    title: "",
    description: "",
    isCompleted: false,
};

function CreateTask() {
    const [formData, setFormData] = useState(initialState);
    const editId = useSelector((state) => state.tasks.editId);
    const task = useSelector((state) =>
        state.tasks.tasks.find((ele) => ele.id === editId)
    );

    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title && !formData.description) return;
        const data = {
            id: task ? task.id : Number(new Date()),
            ...formData,
        };

        task ? dispatch(updateTask(data)) : dispatch(addTask(data));
        setFormData(initialState);
        dispatch(editTask(null));
    }
    function handleCancelButton() {
        dispatch(editTask(null));
        setFormData(initialState);
    }

    useEffect(() => {
        if (task) {
            setFormData({ ...task });
        }
    }, [task]);

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>{task ? "Edit Task" : "Create Task"}</h2>
                <TextField
                    label="Title"
                    variant="outlined"
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                    }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />
                <RadioStyles>
                    {/* <input type="radio" name="status" value="all" id="all" />
                    <label htmlFor="all">All</label> */}
                    {/* <input
                        type="radio"
                        name="status"
                        value="complected"
                        id="complected"
                        checked={formData.status === "complected"}
                        onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                        }
                    />
                    <label htmlFor="complected">Complected</label>
                    <input
                        type="radio"
                        name="status"
                        value="in-progress"
                        id="in-progress"
                        checked={formData.status === "in-progress"}
                        onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                        }
                    />
                    <label htmlFor="in-progress">In-Progress</label> */}
                </RadioStyles>
                <Button variant="contained" type="submit">
                    {task ? "Update Task" : "Add Task"}
                </Button>
                {task && (
                    <Button variant="contained" onClick={handleCancelButton}>
                        Cancel
                    </Button>
                )}
            </Form>
        </Container>
    );
}

export default CreateTask;
