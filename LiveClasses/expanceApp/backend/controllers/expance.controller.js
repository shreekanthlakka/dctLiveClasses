import Expances from "../models/expance.model.js";
import { validationResult } from "express-validator";

const getAllExpances = async (req, res) => {
    try {
        const expances = await Expances.find();
        if (!expances) {
            throw new Error("Count found any expances");
        }
        res.status(200).json({
            success: true,
            data: expances,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

const getSingleExpence = async (req, res, next) => {
    try {
        const expence = await Expances.findById(req.params.id);
        if (!expence) {
            throw new Error("Not able to fetch an expence with this id");
        }
        res.status(200).json({
            success: true,
            data: expence,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

const createAnExpence = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { amount, category, description, expanceDate } = req.body;
        const createdExpence = Expances.create({
            amount,
            category,
            description,
            expanceDate,
        });
        if (!createdExpence) {
            throw new Error("Error creating the expance");
        }
        res.status(201).json({
            success: true,
            data: createdExpence,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

const updateAnExpence = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { amount, category, description, expanceDate } = req.body;
        const updatedExpence = await Expances.findByIdAndUpdate(
            req.params.id,
            { amount, category, description, expanceDate },
            { new: true }
        );
        if (!updatedExpence) {
            throw new Error("No user found with that ID.");
        }
        res.status(200).json({
            success: true,
            data: updateExpence,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const deleteAnExpence = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const deletedExpence = await Expances.findByIdAndRemove(req.params.id);
        if (!deleteExpence) {
            throw new Error("expence didnt deleted with this ID");
        }
        res.status(200).json({
            success: true,
            data: deleteExpence,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

export {
    getAllExpances,
    createAnExpence,
    updateAnExpence,
    deleteAnExpence,
    getSingleExpence,
};
