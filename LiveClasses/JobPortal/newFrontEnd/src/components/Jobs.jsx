import { useEffect } from "react";
import { useJobs } from "../context/jobsContext";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const StyledTable = styled.table`
    border: 1px solid black;
    & th,
    td {
        border: 1px solid black;
        padding: 10px;
        text-align: center;
    }
`;

function Jobs() {
    const { jobs, isLoading, getAllJobs } = useJobs();
    useEffect(() => {
        (async () => {
            await getAllJobs();
        })();
    }, []);
    // console.log("jobs==> ", jobs);
    if (isLoading) <h1>Loading ... </h1>;
    return (
        <div>
            <h1>Jobs</h1>
            {jobs.length > 0 && <Table jobs={jobs} />}
        </div>
    );
}

function Table({ jobs }) {
    const navigate = useNavigate();
    const { deleteJob, isLoading } = useJobs();
    async function handleDeleteJob(id) {
        const res = await deleteJob(id);
        if (res.success) {
            toast.success("task deleted sucessfully");
        }
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
                            <Link to={`${ele._id}`}>{ele.title}</Link>
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
                                    navigate(`${ele._id}`);
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

export default Jobs;

/**
 * 
 * <tr key={job._id}>
                        <td>{job.title}</td>
                        <td>{job.location?.map((ele) => ele)}</td>
                        <td>{job.recruiterId}</td>
                        <td>{job.openings}</td>
                        <td>{job.jobType}</td>
                        <td>{job.deadline}</td>
                        <td>{job.skills?.map((skill) => skill)}</td>
 */
