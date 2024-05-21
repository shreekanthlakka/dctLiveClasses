const express = require("express");
const mongoose = require("mongoose");
const { checkSchema, validationResult } = require("express-validator");
const app = express();
const port = 3068;

app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/exp-app-dec23")
    .then(() => {
        console.log("Database is successfully running on ", port);
    })
    .catch((err) => {
        console.log("error to connection to db", err);
    });

const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Category = model("Category", categorySchema);

//validation schema

const categoryValidationSchema = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name cannot be empty",
        },
        trim: true,
    },
};

app.get("/all-categories", (req, res) => {
    Category.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.post(
    "/create-category",
    checkSchema(categoryValidationSchema),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const body = req.body;
        const categoryObj = new Category();
        categoryObj.name = body.name;
        categoryObj
            .save()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
            });
    }
);

//create a expenseSchema expenseDate: Date, amount: Number, description: String
const expenseSchema = new Schema(
    {
        expenseDate: Date,
        amount: Number,
        description: String,
    },
    { timestamps: true }
);

//create a expenseModel
const Expense = model("Expense", expenseSchema);

const expenceValidationSchema = {
    expanceDate: {
        in: ["body"],
        exists: {
            errorMessage: "expence date is required",
        },
        notEmpty: {
            errorMessage: "expence date cannot be empty",
        },
        isDate: {
            //yyyy-mm-dd format
            errorMessage: "Expense Date must be a valid date.",
        },
        custom: {
            options: function (value) {
                if (new Date(value) > new Date()) {
                    throw new Error(
                        "expance date cannot be greater than today"
                    );
                }
                return true;
            },
        },
    },
    amount: {
        in: ["body"],
        exists: {
            errorMessage: "amount  is required",
        },
        notEmpty: {
            errorMessage: "amount  cannot be empty",
        },
        isInt: {
            errorMessage: "Amount should be a numeric",
            options: { min: 1 },
        },
        custom: {
            options: function (value) {
                if (value <= 0)
                    throw new Error("amount should be greater than 0");
                return true;
            },
        },
    },
};

const idValidationSchema = {
    id: {
        in: ["params"],
        isMongoId: {
            errorMessage: "Invalid MongoID",
        },
    },
};

//create a request handler to return /all-expenses
app.get("/all-expenses", (req, res) => {
    Expense.find()
        .then((expenses) => {
            res.json(expenses);
        })
        .catch((err) => {
            res.json(err);
        });
});

//define request handler to create /new-expenses

app.post("/new-expenses", checkSchema(expenceValidationSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    const body = req.body;
    const expenseObj = new Expense(body); //we can write "body" instead of the below there line
    // expenseObj.expenseDate = body.expenseDate
    // expenseObj.amount = body.amount
    // expenseObj.description = body.description

    expenseObj
        .save()
        .then((expenses) => {
            res.json(expenses);
        })
        .catch((err) => {
            res.json(err);
        });
});

//find category by using its id

app.get("/single-category/:id", checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: error.array() });
    }
    const id = req.params.id;
    Category.findById(id)
        .then((category) => {
            if (!category) {
                return res.status(404).json({});
            }
            res.json(category);
        })

        .catch((err) => {
            res.json(err);
        });
});

//find the id and update it

app.put(
    "/update-category/:id",
    checkSchema(idValidationSchema),
    checkSchema(categoryValidationSchema),
    (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const id = req.params.id;
        const body = req.body;
        Category.findByIdAndUpdate(id, body, { new: true })
            .then((category) => {
                if (!category) {
                    return res.status(404).json({});
                }
                res.json(category);
            })

            .catch((err) => {
                res.status(500).json({ error: "Internal server error" });
            });
    }
);

//deleting record

app.delete(
    "/removing-category/:id",
    checkSchema(idValidationSchema),
    (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const id = req.params.id;
        Category.findByIdAndDelete(id)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({});
                }
                res.json(category);
            })
            .catch((error) => {
                res.status(500).json({ error: "internal server error" });
            });
    }
);
