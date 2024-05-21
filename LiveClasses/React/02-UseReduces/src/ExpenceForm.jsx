import { useState } from "react";

const initialState = {
    expenceDate: "",
    title: "",
    amount: "",
    description: "",
    category: "",
};

function ExpenceForm() {
    const [form, setForm] = useState(initialState);
    const categories = ["Rent", "Food", "Travel", "Shopping"];
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(form);
        setForm(initialState);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Expense Form</h1>
            <div>
                <label htmlFor="date">date</label>
                <input
                    type="date"
                    name="expenceDate"
                    id="date"
                    value={form.expenceDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="title">title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={form.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="amount">amount</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={form.amount}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="description">description</label>
                <textarea
                    name="description"
                    id="description"
                    value={form.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="category">category</label>
                <select
                    onChange={handleChange}
                    id="category"
                    value={form.category}
                    name="category"
                >
                    <option value="">Select a category</option>
                    {categories.map((ele) => (
                        <option key={ele} value={ele}>
                            {ele}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ExpenceForm;
