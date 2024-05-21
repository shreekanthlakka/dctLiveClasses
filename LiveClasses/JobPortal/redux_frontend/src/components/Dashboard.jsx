import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteJob } from "../redux/jobSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const StyledTable = styled.table`
    border: 1px solid black;
    & th,
    td {
        border: 1px solid black;
        padding: 10px;
        text-align: center;
    }
`;

function Dashboard() {
    const { jobs, isLoading, error } = useSelector((state) => state.jobs);
    if (isLoading) <h1>Loading ... </h1>;
    return (
        <div>
            <h2>Jobs List - {jobs?.length}</h2>
            {jobs.length > 0 && !error && <Table jobs={jobs} />}
        </div>
    );
}

function Table({ jobs }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.jobs);
    async function handleDeleteJob(id) {
        dispatch(deleteJob(id))
            .then(unwrapResult)
            .then((res) => {
                if (res.success) {
                    toast.success("Job deletated sucessfully");
                }
            })
            .catch((err) => {
                if (err.message) {
                    toast.error("Something went wrong");
                }
            });
    }
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Recruiter</th>
                    <th>Openings</th>
                    <th>Job type</th>
                    <th>Deadline</th>
                    <th>Skills</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((ele) => (
                    <tr key={ele._id}>
                        {/* <Link to={`${ele._id}`}>
                            <td>{ele.title}</td>
                        </Link> */}
                        <td>
                            <Link to={`/jobs/${ele._id}`}>{ele.title}</Link>
                        </td>
                        <td>{ele.location?.map((ele) => ele)}</td>
                        <td>{ele.recruiterId}</td>
                        <td>{ele.openings}</td>
                        <td>{ele.jobType}</td>
                        <td>{ele.deadline}</td>
                        <td>
                            {ele.skills?.map((skill) => (
                                <span key={skill}>{skill},</span>
                            ))}
                        </td>
                        <td>
                            <button>edit</button>
                            <button
                                disabled={isLoading}
                                onClick={() => handleDeleteJob(ele._id)}
                            >
                                {isLoading ? "deleating ... " : "delete"}
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/jobs/${ele._id}`);
                                }}
                            >
                                view details
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
}

export default Dashboard;
