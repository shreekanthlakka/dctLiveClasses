import { useState } from "react";

function CategoryForm() {
    const [category, setCategory] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        const categoryObj = {
            id: Math.random(),
            category,
        };
        console.log(categoryObj);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category</label>
            <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CategoryForm;
