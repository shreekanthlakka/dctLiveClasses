import { validationResult } from "express-validator";
import Task from "../models/task.model.js";

const createATask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ success: false, error: errors.array() });

    try {
        const { title, description, status } = req.body;
        const createdTask = await Task.create({
            title,
            description,
            status,
        });
        if (!createdTask) throw new Error(" task cannot be created");
        res.status(201).json({ success: true, data: createdTask });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks) {
            throw new Error("No tasks found");
        }
        res.status(200).json({
            success: true,
            length: tasks.length,
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};

const getATask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ success: false, error: errors.array() });

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("Not found");
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};

const updateATask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ success: false, error: errors.array() });

    try {
        const { description, title, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        );
        if (!updatedTask) {
            throw new Error("failed to update data");
        }
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteATask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ success: false, error: errors.array() });
    try {
        const delTask = await Task.findByIdAndDelete(req.params.id);
        if (!delTask) {
            throw new Error("No task with this ID found.");
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};

export { createATask, getAllTasks, getATask, updateATask, deleteATask };
