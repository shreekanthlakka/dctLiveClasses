import axios from "axios";

const URI = "http://localhost:8000/api/v1";

const getAllCategoriesApi = async () => {
    try {
        const res = await axios.get(`${URI}/categories`);
        // console.log("--------GET ALL CATEGORIES SERVICE---------", res.data);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

const createCategoryApi = async (obj) => {
    try {
        const res = await axios.post(`${URI}/categories`, obj);
        // console.log(
        //     "-------------CREATE CATEGORY SERVICE-------------",
        //     res.data.data
        // );
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

const updateCategoryApi = async (id, updatedObj) => {
    try {
        const res = await axios.put(`${URI}/categories/${id}`, updatedObj);
        console.log("updated obj => ", res.data);
        return res.data.data;
    } catch (error) {
        console.log(error.message);
    }
};

const deleteCategoryApi = async (id) => {
    try {
        const res = await axios.delete(`${URI}/categories/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error.message);
    }
};

export {
    getAllCategoriesApi,
    updateCategoryApi,
    createCategoryApi,
    deleteCategoryApi,
};
