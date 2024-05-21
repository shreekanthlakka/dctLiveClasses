import mongoose from "mongoose";

const expanceSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        expanceDate: {
            type: Date,
        },
        amount: {
            type: Number,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model("Expense", expanceSchema);

export default Expense;
