import { useState } from "react";
import styled from "styled-components";
import { isMobilePhone } from "validator";
import { createProfile, updateProfile } from "../services/userService";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const initialState = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
};

const Form = styled.form`
    margin-top: 20px;
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
        font-size: small;
        margin-bottom: 10px;
        align-self: center;
    }
`;

function ProfileForm({ setEditProfile, editProfile }) {
    const { userAccount, profile, dispatch } = useUser();
    const [formData, setFormData] = useState(
        profile ? { ...profile } : { ...initialState }
    );
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};

    function runValidations() {
        if (formData.firstName.trim().length === 0) {
            errors.firstName = "First name is required";
        }
        if (formData.lastName.trim().length === 0) {
            errors.lastName = "Last name is required";
        }
        if (formData.mobileNumber.trim().length === 0) {
            errors.mobileNumber = "Mobile number is required";
        } else if (!isMobilePhone(formData.mobileNumber)) {
            errors.mobileNumber = "Invalid Mobile Number";
        }
        if (formData.address.trim().length === 0) {
            errors.address = "Address is required";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(errors).length === 0) {
            //api call

            if (profile && editProfile) {
                const res = await updateProfile(userAccount.role, formData);
                if (res.success) {
                    dispatch({ type: "SET_PROFILE", payload: res.data });
                    toast.success(res.message);
                }
            } else {
                // if (!profile && !editProfile) {
                const res = await createProfile(userAccount.role, formData);
                console.log("RESPONCE ==== > ", res);
                if (res.success) {
                    dispatch({ type: "SET_PROFILE", payload: res.data });
                    toast.success(res.message);
                }
            }
            setClientErrors({});
            setEditProfile((e) => !e);
        }
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        }
    }
    function handleValidations() {
        runValidations();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else return;
    }

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="firstname"
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                    onBlur={handleValidations}
                />
            </div>
            {clientErrors.firstName && <span>{clientErrors.firstName}</span>}
            <div>
                <input
                    type="text"
                    placeholder="lastname"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    onBlur={handleValidations}
                />
            </div>
            {clientErrors.lastName && <span>{clientErrors.lastName}</span>}
            <div>
                <input
                    type="text"
                    placeholder="phonenumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    name="mobileNumber"
                    onBlur={handleValidations}
                />
            </div>
            {clientErrors.mobileNumber && (
                <span>{clientErrors.mobileNumber}</span>
            )}
            <div>
                <input
                    type="text"
                    placeholder="address"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                    onBlur={handleValidations}
                />
            </div>
            {clientErrors.address && <span>{clientErrors.address}</span>}

            <button type="submit">Save</button>
            <button onClick={() => setEditProfile((e) => !e)}>Cancle</button>
        </Form>
    );
}

export default ProfileForm;
