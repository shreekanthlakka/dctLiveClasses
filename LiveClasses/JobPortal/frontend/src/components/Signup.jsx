import { useState } from "react";
import styled from "styled-components";
import { registerApi } from "../services/userApiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 80vh;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const Row = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    & > label {
        font-weight: bold;
        font-size: large;
    }
    & > input {
        height: 20px;
        width: 200px;
        border: 2px solid black;
    }
`;

const initialState = {
    username: "",
    email: "",
    password: "",
    role: "",
};

function Signup() {
    const [formData, setFormDate] = useState(initialState);
    const [errors, setErrors] = useState();
    const [clientErrors, setClientErrors] = useState({});
    const cliErrors = {};
    const navigate = useNavigate();

    function handleChange(e) {
        if (e.target.name === "") return;
        setFormDate({ ...formData, [e.target.name]: e.target.value });
        setErrors([]);
    }

    const runValidations = () => {
        if (formData.username.trim().length === 0) {
            cliErrors.username = "Username is required";
        }
        if (formData.email.trim().length === 0) {
            cliErrors.email = "email is required";
        } else if (!validator.isEmail(formData.email)) {
            cliErrors.email = "invalid email format";
        }
        if (formData.password.trim().length === 0) {
            cliErrors.password = "password is required";
        } else if (
            formData.password.trim().length <= 5 ||
            formData.password.trim().length >= 128
        ) {
            cliErrors.password = "password should be 5-128 charactors";
        }
        if (formData.role.trim().length === 0) {
            cliErrors.role = "role is required";
        }
    };

    const apicall = () => {
        registerApi(
            formData.username,
            formData.email,
            formData.password,
            formData.role
        )
            .then((res) => {
                if (res.success) {
                    toast.success("user created sucessfully");
                    navigate("/login");
                    setErrors([]);
                } else if (res.success === false) {
                    if (typeof res.errors === String) {
                        setErrors([res.errors]);
                    } else {
                        setErrors(res.errors);
                    }
                }
            })
            .catch((err) => {
                console.log("errors => ", err);
                if (typeof err === "string") setErrors(err.message);
                toast.error(err.message);
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(cliErrors).length === 0) {
            apicall();
        } else {
            setClientErrors(cliErrors);
        }
    }

    const errorMessages = (field) => {
        const err = errors?.find((ele) => ele.path === field);
        if (!err) {
            return null;
        }
        return <span style={{ color: "red", fontWeight: 600 }}>{err.msg}</span>;
    };

    function handleEmailTaken() {
        console.log("=====ONBLUR");
        if (validator.isEmail(formData.email)) {
            fetch(
                `http://localhost:5000/api/v1/users/checkEmail?email=${formData.email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
                .then((res) => res.json())
                .then((data) =>
                    data.isEmailRegistered
                        ? null
                        : (cliErrors.email = "email alteady taken")
                );
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Row>
                {errorMessages("username")}
                {clientErrors.username && <span>{clientErrors.username}</span>}
                <Row>
                    <label htmlFor="email">email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleEmailTaken}
                    />
                </Row>
                {errorMessages("email")}
                {clientErrors.email && <span>{clientErrors.email}</span>}

                <Row>
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errorMessages("password")}
                    {clientErrors.password && (
                        <span>{clientErrors.password}</span>
                    )}
                </Row>
                <Row>
                    <label htmlFor="role">role:</label>
                    <select
                        value={formData.role}
                        onChange={(e) =>
                            setFormDate({ ...formData, role: e.target.value })
                        }
                    >
                        <option value="">Select Role</option>
                        <option value="candidate">Candiate</option>
                        <option value="recruiter">Recuiter</option>
                    </select>
                    {errorMessages("role")}
                    {clientErrors.role && <span>{clientErrors.role}</span>}
                </Row>
                <button type="submit">Register</button>
            </Form>
        </div>
    );
}

export default Signup;
