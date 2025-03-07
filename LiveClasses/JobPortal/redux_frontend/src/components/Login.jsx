import { useEffect, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/authSlice";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    & input {
        height: 30px;
        margin-bottom: 15px;
        width: 300px;
        border-radius: 10px;
        border: 1px solid black;
        font-size: larger;
        text-align: center;
    }
    & button {
        height: 40px;
        width: 80%;
        align-self: center;
        background-color: #b4b0af;
        border-radius: 10px;
        font-weight: 600;
        font-size: larger;
    }
    & button:hover {
        background-color: #6b6766;
        color: white;
        cursor: pointer;
    }
    & span {
        color: red;
        z-index: 100;
    }
`;

const initialState = {
    email: "",
    password: "",
};

function Login() {
    const [formData, setFormDate] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const errors = {};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAccount, isLoading, isLoggedIn, error } = useSelector(
        (state) => state.user
    );

    function runValidations() {
        if (formData.email.trim().length === 0) {
            errors.email = "Email is required.";
        } else if (!validator.isEmail(formData.email)) {
            errors.email = "invalid email format";
        }

        if (formData.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        } else if (
            formData.password.trim().length < 5 ||
            formData.password.trim().length > 128
        ) {
            errors.password = `password should be in between 5 and 128 characters.`;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(errors).length === 0) {
            //some api call
            dispatch(userLogin(formData));
            setClientErrors({});
            setFormDate(initialState);
        } else {
            setClientErrors(errors);
        }
    }

    useEffect(() => {
        if (error && !isLoading) {
            toast.error(error);
        }
        if (userAccount && isLoggedIn && !isLoading) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [error, userAccount, navigate, isLoggedIn, isLoading]);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormDate({ ...formData, email: e.target.value })
                        }
                    />
                    {clientErrors.email && <span>{clientErrors.email}</span>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormDate({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    {clientErrors.password && (
                        <span>{clientErrors.password}</span>
                    )}
                </div>

                <button type="submit">Login</button>
            </Form>
        </div>
    );
}

export default Login;
