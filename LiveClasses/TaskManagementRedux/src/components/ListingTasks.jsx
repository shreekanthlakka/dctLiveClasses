import { useDispatch, useSelector } from "react-redux";
import {
    changeTaskStatus,
    editTask,
    removeTask,
    toggleIsComplected,
} from "../actions/taskActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { ALL, COMPLETED, PENDING } from "../actions/actionTyles";

const statuses = [
    { id: Math.random(), label: ALL },
    { id: Math.random(), label: PENDING },
    { id: Math.random(), label: COMPLETED },
];

function ListingTasks() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const currentStatus = useSelector((state) => state.tasks.selectedStatus);
    const dispatch = useDispatch();

    const filterTaskByStatus = () => {
        if (currentStatus === ALL) {
            return tasks;
        } else if (currentStatus === PENDING) {
            return tasks.filter((ele) => !ele.isComplected);
        } else if (currentStatus === COMPLETED) {
            return tasks.filter((ele) => ele.isComplected);
        }
    };

    function handleEdit(id) {
        dispatch(editTask(id));
    }

    return (
        <div>
            <h2>Tasks - {tasks.length} </h2>

            <div>
                {statuses.map((ele) => (
                    <React.Fragment key={ele.id}>
                        <input
                            type="radio"
                            checked={currentStatus === ele.label}
                            value={ele.label}
                            onChange={() =>
                                dispatch(changeTaskStatus(ele.label))
                            }
                            id={ele.label}
                        />
                        <label htmlFor={ele.label}>
                            {ele.label.charAt(0).toUpperCase() +
                                ele.label.slice(1).toLowerCase()}
                        </label>
                    </React.Fragment>
                ))}
            </div>

            {filterTaskByStatus().map((ele) => (
                <div key={ele.id}>
                    <Card
                        sx={{
                            width: "40rem",
                            backgroundColor: "#d3d3d3",
                            margin: "5px",
                        }}
                    >
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 18 }}
                                color="text.secondary"
                            >
                                Title -{" "}
                                <strong style={{ color: "blue" }}>
                                    {ele.title}
                                </strong>
                            </Typography>
                            <Typography variant="body2">
                                Description - <strong>{ele.description}</strong>
                            </Typography>
                            <CardActions>
                                <Checkbox
                                    checked={ele.isComplected}
                                    onChange={() =>
                                        dispatch(toggleIsComplected(ele.id))
                                    }
                                />
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => dispatch(removeTask(ele.id))}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleEdit(ele.id)}
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default ListingTasks;
