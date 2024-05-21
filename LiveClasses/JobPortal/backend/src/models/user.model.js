import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            select: false,
        },
        role: {
            type: String,
            default: "user",
        },
        accessToken: {
            type: String,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.checkPassword = async function (inputPassword) {
    const salt = await bcrypt.genSalt(this.password);
    const hashdPass = await bcrypt.hash(inputPassword, salt);
    return hashdPass === this.password;
};

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        { _id: this._id, role: this.role },
        process.env.SECRET,
        { expiresIn: "1d" }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.SECRET, {
        expiresIn: "1h",
    });
};

const User = mongoose.model("User", userSchema);

export default User;
