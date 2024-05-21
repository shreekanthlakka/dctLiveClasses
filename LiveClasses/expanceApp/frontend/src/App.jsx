import { useEffect, useState } from "react";
import {
    createCategoryApi,
    deleteCategoryApi,
    getAllCategoriesApi,
    updateCategoryApi,
} from "./ApiServices/categoriesApi";

function App() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [updateCategoryName, setUpdateCategoryName] = useState("");
    const [selected, setSelected] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getCategoriesData() {
            const res = await getAllCategoriesApi();
            setCategories(res);
        }
        getCategoriesData();
    }, []);

    function handleCategorySubmit(e) {
        e.preventDefault();
        const newObj = {
            categoryname: name,
        };
        createCategoryApi(newObj)
            .then((res) => {
                // console.log(res);
                setCategories([...categories, res]);
            })
            .catch((err) => err.message);

        setName("");
    }

    function handelDeleteCategory(id) {
        deleteCategoryApi(id)
            .then((res) => {
                setCategories((prev) =>
                    prev.filter((category) => category._id !== res._id)
                );
            })
            .catch((err) => err.message);
    }

    function handleUpdateCategory(id) {
        if (!updateCategoryName) return;
        const updatedObj = {
            categoryname: updateCategoryName,
        };
        updateCategoryApi(id, updatedObj)
            .then((res) => {
                setCategories((prev) =>
                    prev.map((ele) => (ele._id === res._id ? res : ele))
                );
                setUpdateCategoryName("");
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <div>
            <h2>Expence App</h2>
            <h3>Expence Listing - {categories?.length}</h3>

            {categories?.map((ele) => (
                <div key={ele._id}>
                    <p style={{ display: "inline" }} key={ele._id}>
                        {ele.categoryname}
                    </p>

                    <button
                        onClick={() => {
                            setSelected(ele);
                            setOpen((e) => !e);
                        }}
                    >
                        Update
                    </button>
                    <button onClick={() => handelDeleteCategory(ele._id)}>
                        Delete
                    </button>
                </div>
            ))}

            <h3>Add a Category</h3>
            <form onSubmit={handleCategorySubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <dialog open={open}>
                <p>
                    Update category <strong> {selected.categoryname}</strong>
                </p>
                <input
                    type="text"
                    value={updateCategoryName}
                    onChange={(e) => setUpdateCategoryName(e.target.value)}
                />
                <button onClick={() => setOpen((e) => !e)}>close</button>
                <button onClick={() => handleUpdateCategory(selected._id)}>
                    update
                </button>
            </dialog>
        </div>
    );
}

export default App;
