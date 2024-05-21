import express from "express";
import Category from "../models/categories.model.js";
import { validationResult } from "express-validator";

const getallCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (!categories) {
            throw new Error("no categories");
        }
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

const createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    const { categoryname } = req.body;
    try {
        const createdcategory = await Category.create({
            categoryname,
        });
        if (!createdcategory) {
            throw new Error("not able to create category");
        }
        res.status(200).json({
            success: true,
            data: createdcategory,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

const getCategory = async (req, res, next) => {
    const id = req.params.id;

    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error("no data regarding this id");
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            data: null,
            message: error.message,
        });
    }
};

/**
 * app.get("/single-categoty/:id" , (req,res) => {
 *
 * const id = req.params.id;
 *
 * Category.findById(id)
 * .then((data)=>{
 * if(!data){
 * return res.status(404).json({})
 * }
 *
 * res.json(data)
 *
 * })
 * .catch((err)=>{console.log(err)
 * res.json(err)
 * })
 *
 * })
 *
 */

const updateCategory = async (req, res, next) => {
    try {
        const updatedcategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedcategory) {
            throw new Error("no record found  for updating!");
        }
        res.status(200).json({
            success: true,
            data: updatedcategory,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            data: {},
            message: error.message,
        });
    }
};

// const updateCategory = (req, res) => {
//     Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then((data) => {
//             if (!data) {
//                 return res.status(404).json({});
//             }
//             res.status(200).json(data);
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// };

const deleteCategory = async (req, res, next) => {
    try {
        const deletedcategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedcategory) {
            throw new Error("failed to delete  category with sent id");
        }
        res.status(200).json({
            success: true,
            data: deletedcategory,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            data: {},
            message: error.message,
        });
    }
};

// const deleteCategory = (req, res) => {
//     Category.findByIdAndDelete(req.params.id)
//         .then((data) => {
//             if (!data) {
//                 // throw new Error("Error while  deleting the category.");
//                 return res.status(404).json({});
//             }
//             res.status(200).json({
//                 success: true,
//                 data,
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 success: false,
//                 message: err.message,
//             });
//         });
// };

export {
    getallCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
