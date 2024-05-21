import Category from "../models/categories.model.js";

const categoryValidationSchema = {
    categoryname: {
        in: ["body"],
        exists: {
            errorMessage: "categoryname field is required",
        },
        trim: true,
        notEmpty: {
            errorMessage: "categoryname cannot be empty",
        },
        custom: {
            options: async function (val) {
                const catName = await Category.findOne({ categoryname: val });
                if (catName) {
                    throw new Error("Category already exist");
                }
                return true;
            },
        },
        // custom: {
        //     options: function (val) {
        //         return Category.findOne({ categoryname: val }).then((obj) => {
        //             if (!obj) {
        //                 return true;
        //             }
        //             throw new Error("This category name is taken");
        //         });
        //     },
        // },
    },
};

export { categoryValidationSchema };
