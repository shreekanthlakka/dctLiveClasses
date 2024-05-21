import { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerApi } from "../services/userService";

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
    & input:nth-child(4) {
        height: auto;
        width: 0px;
        border: 1px solid black;
        text-align: left;
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
    username: "",
    email: "",
    password: "",
    role: "",
};

function SignUp() {
    const [formData, setFormDate] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState([]);
    let errors = {};
    const navigate = useNavigate();

    function runValidations() {
        if (formData.username.trim().length === 0) {
            errors.username = "name is requited";
        }
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
            errors.password = `invalid password length`;
        }

        if (formData.role.trim().length === 0) {
            errors.role = "select the role";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(errors).length === 0) {
            //Api call
            const res = await registerApi(formData);
            if (res?.success) {
                toast.success("user registered sucessfully");
                navigate("/login");
                setClientErrors({});
                setServerErrors([]);
            }
            if (!res?.success && res?.status == 400) {
                const errorsIn = res.errors?.reduce((acc, val) => {
                    return { ...acc, [val.path]: val.msg };
                }, {});
                setServerErrors(errorsIn);
            }
        } else {
            setClientErrors(errors);
        }
    }

    function handleEmailExists() {
        setClientErrors({ email: "" });
        fetch(
            `http://localhost:5000/api/v1/users/checkEmail?email=${formData.email}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.isEmailRegistered) {
                    setClientErrors({
                        email: "This email already exists",
                    });
                }
            });
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="name"
                        value={formData.username}
                        onChange={(e) =>
                            setFormDate({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                    />
                    {clientErrors.username && (
                        <span>{clientErrors.username}</span>
                    )}
                    {serverErrors.username && (
                        <span>{serverErrors.username}</span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormDate({ ...formData, email: e.target.value })
                        }
                        onBlur={handleEmailExists}
                    />
                    {clientErrors.email && <span>{clientErrors.email}</span>}
                    {serverErrors.email && <span>{serverErrors.email}</span>}
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
                    {serverErrors.password && (
                        <span>{serverErrors.password}</span>
                    )}
                </div>
                <div>
                    <label>Select Role</label>
                    <input
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                        type="radio"
                        id="candidate"
                        value="candidate"
                        checked={formData.role === "candidate"}
                        onChange={(e) =>
                            setFormDate({ ...formData, role: e.target.value })
                        }
                    />
                    <label htmlFor="candidate">Candidate</label>
                    <input
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                        type="radio"
                        id="recruiter"
                        value="recruiter"
                        checked={formData.role === "recruiter"}
                        onChange={(e) =>
                            setFormDate({ ...formData, role: e.target.value })
                        }
                    />
                    <label htmlFor="recruiter">Recruiter</label>
                </div>

                <button type="submit">Sign Up</button>
            </Form>
        </div>
    );
}

export default SignUp;
