import { useEffect, useReducer, useState } from "react";
import {
    createCategoryApi,
    deleteCategoryApi,
    getAllCategoriesApi,
    updateCategoryApi,
} from "./ApiServices/categoriesApi";

const initialState = {
    categories: [],
    selectedCategory: {},
    open: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case "LOAD_ALLCAREGORIES":
            return { ...state, categories: action.payload };

        case "DELETE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        case "UPDATE_CATEGORY":
            return {
                ...state,
                categories: state.categories.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        case "SELECTED_ID":
            return { ...state, selectedCategory: action.payload };

        case "TOGGLE_DIALOG":
            return { ...state, open: !state.open };
        case "default":
            return state;
    }
}

function AppuseReducer() {
    const [name, setName] = useState("");
    const [updateCategory, setUpdateCategory] = useState("");
    const [{ categories, selectedCategory, open }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        getAllCategoriesApi()
            .then((res) => {
                dispatch({ type: "LOAD_ALLCAREGORIES", payload: res });
            })
            .catch((err) => console.log(err.message));
    }, []);

    function handleAddClick() {
        if (!name) return;
        const obj = {
            categoryname: name,
        };
        createCategoryApi(obj)
            .then((res) => {
                dispatch({ type: "ADD_CATEGORY", payload: res });
                setName("");
            })
            .catch((err) => console.log(err.message));
    }
    function handleDeleteClick(id) {
        deleteCategoryApi(id)
            .then((res) => {
                dispatch({ type: "DELETE_CATEGORY", payload: res._id });
            })
            .catch((err) => console.log(err.message));
    }
    function handleUpdateClick(id) {
        if (!updateCategory) return;
        const obj = {
            categoryname: updateCategory,
        };
        updateCategoryApi(id, obj)
            .then((res) => {
                dispatch({ type: "UPDATE_CATEGORY", payload: res });
                dispatch({ type: "TOGGLE_DIALOG" });
                setUpdateCategory("");
            })
            .catch((err) => console.log(err.message));
    }
    return (
        <div>
            <h2>Expence App</h2>
            <div>
                <h3>Add a Category</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the category name..."
                />
                <button onClick={handleAddClick}>Add</button>
            </div>
            <h3>CategoriesListing-{categories.length}</h3>
            <div>
                {categories.map((ele) => (
                    <div key={ele._id}>
                        <span>{ele.categoryname}</span>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "SELECTED_ID",
                                    payload: ele,
                                });
                                dispatch({ type: "TOGGLE_DIALOG" });
                            }}
                        >
                            Update
                        </button>
                        <button onClick={() => handleDeleteClick(ele._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <dialog open={open}>
                <p>
                    Update category{" "}
                    <strong> {selectedCategory.categoryname}</strong>
                </p>
                <input
                    type="text"
                    value={updateCategory}
                    onChange={(e) => setUpdateCategory(e.target.value)}
                />
                <button onClick={() => dispatch({ type: "TOGGLE_DIALOG" })}>
                    close
                </button>
                <button onClick={() => handleUpdateClick(selectedCategory._id)}>
                    update
                </button>
            </dialog>
        </div>
    );
}

export default AppuseReducer;
