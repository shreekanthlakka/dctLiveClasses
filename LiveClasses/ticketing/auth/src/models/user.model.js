import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            select: false,
        },
        phonenumber: {
            type: String,
            default: "0000000000",
            select: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "user",
        },
        accessToken: {
            type: String,
            select: false,
        },
        profilePic: {
            url: {
                type: String,
                default: "Picture Url",
            },
            secure_id: {
                type: String,
                default: "Secure_Id",
            },
        },
        loggedAt: {
            type: [Date],
        },
        forgotPasswordToken: {
            type: String,
            select: false,
        },
        forgotPasswordExpiry: {
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
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

userSchema.methods.getForgotPasswordToken = async function () {
    const token = await crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = await crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    this.forgotPasswordExpiry = new Date(Date.now() + 20 * 60 * 1000);
    return token;
};

const User = mongoose.model("User", userSchema);
export default User;
