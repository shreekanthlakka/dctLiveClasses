import { useState } from "react";
// import { createJobApi } from "../services/jobService";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/jobSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    & input {
        height: 20px;
        margin-bottom: 15px;
        width: 300px;
        border-radius: 10px;
        border: 1px solid black;
        font-size: medium;
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
    title: "",
    description: "",
    openings: "",
    location: "",
    jobType: "",
    minExp: "",
    maxExp: "",
    deadline: "",
    skills: "",
    minSalary: "",
    maxSalary: "",
};

function AddJob() {
    const [formData, setFormData] = useState(initialState);
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { isLoading, error, success } = useSelector((state) => state.jobs);

    function runValidations() {
        if (formData.title.trim().length === 0) {
            errors.title = "title cannot be blank";
        }
        if (formData.description.trim().length === 0) {
            errors.description = "description cannot be blank";
        }
        if (formData.openings.trim().length === 0) {
            errors.openings = "openings cannot be blank";
        } else if (+formData.openings <= 0) {
            errors.openings = "openings should be more than one";
        }
        if (formData.location.trim().length === 0) {
            errors.location = "location cannot be blank";
        }
        if (formData.jobType.trim() === 0) {
            errors.jobType = "jobType cannot be blank";
        }
        if (formData.minExp.trim().length === 0) {
            errors.minExp = "minExp cannot be blank";
        } else if (+formData.minExp < 1) {
            errors.minExp = "minExp should be more than one";
        }
        if (formData.maxExp.trim().length === 0) {
            errors.maxExp = "maxExp cannot be blank";
        } else if (+formData.maxExp > 10) {
            errors.maxExp = "maxExp should not be more than 10 years";
        }
        if (formData.deadline.trim().length === 0) {
            errors.deadline = "deadline cannot be blank";
        } else if (+formData.deadline < new Date()) {
            errors.deadline = "deadline should be greater than current date";
        }
        if (formData.skills.trim().length === 0) {
            errors.skills = "skills cannot be blank";
        }
        if (formData.minSalary.trim().length === 0) {
            errors.minSalary = "minSalary cannot be blank";
        } else if (formData.minSalary < 30000) {
            errors.minSalary = "minSalary should be more than 30000";
        }
        if (formData.maxSalary.trim().length === 0) {
            errors.maxSalary = "maxSalary cannot be blank";
        } else if (formData.maxSalary > 100000) {
            errors.maxSalary = "maxSalary should not be  more than 100000";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const outObj = {
            ...formData,
            experience: { minExp: formData.minExp, maxExp: formData.maxExp },
            salary: {
                minSalary: formData.minSalary,
                maxSalary: formData.maxSalary,
            },
            skills: formData.skills.split(","),
        };

        delete outObj.minExp;
        delete outObj.maxExp;
        delete outObj.minSalary;
        delete outObj.maxSalary;
        runValidations();
        if (Object.keys(errors).length === 0) {
            //api call
            // const res = await createJobApi(outObj);
            // if (res.status === 201 && res.success) {
            //     toast.success("job created sucessfully");
            //     navigate("/account/jobs");
            //     setClientErrors({});
            //     setFormData(initialState);
            // }
            dispatch(addJob(outObj))
                .then(unwrapResult)
                .then((res) => {
                    if (res.success) {
                        toast.success("job created sucessfully");
                        navigate("/dashboard");
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        } else {
            setClientErrors(errors);
        }

        console.log("output", outObj);
    }

    // useEffect(() => {
    //     if (success && !isLoading && !error) {
    //         toast.success("job created sucessfully");
    //         navigate("/home");
    //     }
    // }, [success, isLoading, error]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {clientErrors.title && <span>{clientErrors.title}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {clientErrors.description && (
                        <span>{clientErrors.description}</span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="openings"
                        name="openings"
                        value={formData.openings}
                        onChange={handleChange}
                    />
                    {clientErrors.openings && (
                        <span>{clientErrors.openings}</span>
                    )}
                </div>
                <div>
                    <select
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                jobType: e.target.value,
                            })
                        }
                    >
                        <option value="">select JobType</option>
                        <option value="wfh">Work from Home</option>
                        <option value="wfo">Work from Office</option>
                    </select>
                    {clientErrors.jobType && (
                        <span>{clientErrors.jobType}</span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="minimum Experience"
                        name="minExp"
                        value={formData.minExp}
                        onChange={handleChange}
                    />
                    {clientErrors.minExp && <span>{clientErrors.minExp}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="max Experience"
                        name="maxExp"
                        value={formData.maxExp}
                        onChange={handleChange}
                    />
                    {clientErrors.maxExp && <span>{clientErrors.maxExp}</span>}
                </div>
                <div>
                    <input
                        type="Date"
                        placeholder="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    />
                    {clientErrors.deadline && (
                        <span>{clientErrors.deadline}</span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="enter your skills saperated by commos"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                    {clientErrors.skills && <span>{clientErrors.skills}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="minimum salary"
                        name="minSalary"
                        value={formData.minSalary}
                        onChange={handleChange}
                    />
                    {clientErrors.minSalary && (
                        <span>{clientErrors.minSalary}</span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="maxSalary"
                        name="maxSalary"
                        value={formData.maxSalary}
                        onChange={handleChange}
                    />
                    {clientErrors.maxSalary && (
                        <span>{clientErrors.maxSalary}</span>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    {clientErrors.location && (
                        <span>{clientErrors.location}</span>
                    )}
                </div>
                <button type="submit">Submit</button>
            </Form>
        </>
    );
}

export default AddJob;
