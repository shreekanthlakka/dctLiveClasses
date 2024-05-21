import { useState } from "react";
import { useUser } from "../context/userContext";
import styled from "styled-components";
import { createProfile, updateProfile } from "../services/userService";
import toast from "react-hot-toast";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";

const initialState = {
    companyName: "",
    email: "",
    website: "",
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

function ProfileFormRecruiter({ editProfile, setEditProfile }) {
    const { userAccount, profile, dispatch } = useUser();
    const [formData, setFormData] = useState(
        profile ? { ...profile } : { ...initialState }
    );
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};

    function runValidations() {
        if (formData.companyName.trim().length === 0) {
            errors.companyName = "company name is required";
        }
        if (formData.email.trim().length === 0) {
            errors.email = " email is required";
        } else if (!isEmail(formData.email)) {
            errors.email = "invalid email format";
        }
        if (formData.website.trim().length === 0) {
            errors.website = " website is required";
        } else if (!isURL(formData.website)) {
            errors.website = "Invalid URL Format";
        }
        if (formData.address.trim().length === 0) {
            errors.address = "Address is required";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        console.log("Form Data ==> ", formData);
        if (Object.keys(errors).length === 0) {
            //api call

            if (profile && editProfile) {
                const res = await updateProfile(userAccount.role, formData);
                console.log("-------UPDATE -----", res);
                if (res.success) {
                    dispatch({ type: "SET_PROFILE", payload: res.data });
                    toast.success(res.message);
                }
            } else {
                // if (!profile && !editProfile) {
                const res = await createProfile(userAccount.role, formData);
                console.log("----------RESPONCE ==== > ", res);
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
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        name="companyName"
                        onBlur={handleValidations}
                    />
                </div>
                {clientErrors.companyName && (
                    <span>{clientErrors.companyName}</span>
                )}
                <div>
                    <input
                        type="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        onBlur={handleValidations}
                    />
                </div>
                {clientErrors.email && <span>{clientErrors.email}</span>}
                <div>
                    <input
                        type="text"
                        placeholder="website"
                        value={formData.website}
                        onChange={handleChange}
                        name="website"
                        onBlur={handleValidations}
                    />
                </div>
                {clientErrors.website && <span>{clientErrors.website}</span>}
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
                <button onClick={() => setEditProfile((e) => !e)}>
                    Cancle
                </button>
            </Form>
        </div>
    );
}

export default ProfileFormRecruiter;
