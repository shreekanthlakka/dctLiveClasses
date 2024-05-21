import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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

function Login() {
    const navigate = useNavigate();
    const { login, isLoading, errors } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [clientErrors, setClientErrors] = useState({});
    const cliErrors = {};

    const runClientValidations = () => {
        if (formData.email.trim().length === 0) {
            cliErrors.email = "email is required";
        } else if (validator.isEmail(formData.email) === false) {
            cliErrors.email = "Invalid email format";
        }

        if (formData.password.trim().length === 0) {
            cliErrors.password = "password is required";
        } else if (
            formData.password.trim().length < 5 ||
            formData.password.trim().length > 128
        ) {
            cliErrors.password = "password should be 5-128 charactors";
        }
    };

    const apicall = () => {
        login(formData.email, formData.password)
            .then((data) => {
                if (data.success) {
                    toast.success("Logged in sucessfully");
                    localStorage.setItem("token", data.session.accessToken);
                    navigate("/dashboard");
                }
            })
            .catch((err) => {
                console.log(err);
                localStorage.setItem("token", "");
                setClientErrors({});
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        runClientValidations();
        if (Object.keys(cliErrors).length === 0) {
            apicall();
        } else {
            setClientErrors(cliErrors);
        }
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <label htmlFor="email">email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    {clientErrors.email && <span>{clientErrors.email}</span>}
                </Row>
                <Row>
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    {clientErrors.password && (
                        <span>{clientErrors.password}</span>
                    )}
                </Row>
                <button type="submit">Login</button>
            </Form>
        </div>
    );
}

export default Login;
