import { CustomError } from "./CustomError.js";

const sendCookies = async (user, res) => {
    try {
        const accessToken = await user.generateAccessToken();
        user.accessToken = accessToken;
        user.loggedAt = [...user.loggedAt, new Date().toLocaleString()];
        await user.save({ validateBeforeSave: false });
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                message: "Logged in successfully",
                data: user,
                statusCode: 200,
                session: accessToken,
            });
    } catch (error) {
        user.accessToken = null;
        await user.save({ validateBeforeSave: false });
        res.status(error.statusCode || 400).json(
            new CustomError(
                error.statusCode || 400,
                error.message || "something went wrong",
                error
            )
        );
    }
};

export { sendCookies };
