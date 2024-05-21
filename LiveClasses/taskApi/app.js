import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

import taskRoutes from "./routes/task.route.js";
app.use("/api/v1/tasks", taskRoutes);

export default app;
