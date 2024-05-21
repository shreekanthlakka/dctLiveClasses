import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useJobs } from "../context/jobsContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const Container = styled.div``;

function AllJobDetails() {
    const { jobId } = useParams();
    const { selectedJob, getSelectedJob, isLoading } = useJobs();
    const [isApplying, setIsApplying] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, userAccount } = useUser();
    const [isApplied, setIsApplied] = useState(false);

    async function handleApplyClick() {
        try {
            setIsApplying(true);
            const res = await fetch(
                `http://localhost:5000/api/v1/application`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ job: jobId }),
                }
            );
            const data = await res.json();
            if (data.success) {
                toast.success("applied for job sucessfully");
                setIsApplying(false);
            }
        } catch (error) {
            setIsApplying(false);
        } finally {
            setIsApplying(false);
        }
    }

    useEffect(() => {
        (async () => {
            await getSelectedJob(jobId);
            fetch(`http://localhost:5000/api/v1/application/check/${jobId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        data.isApplied
                            ? setIsApplied(true)
                            : setIsApplied(false);
                    }
                })
                .catch((err) => console.log("error", err));
        })();
    }, []);

    if (isLoading) <h1>Loading ...</h1>;

    return (
        <Container>
            {!isLoading && Object.keys(selectedJob).length > 0 && (
                <div>
                    <h2>{selectedJob.title}</h2>
                    <p>{selectedJob.description} </p>
                    <p>
                        <strong>Skills:</strong>{" "}
                        {selectedJob.skills?.join(", ")}
                    </p>
                    <p>
                        <strong>Location:</strong>:{" "}
                        {selectedJob.location?.join(", ")}{" "}
                    </p>
                    <p>
                        <strong>Jobtype:</strong>: {selectedJob.jobType}{" "}
                    </p>
                    <p>
                        <strong>Experience:</strong>:{" "}
                        {selectedJob.experience?.minExp} -{" "}
                        {selectedJob.experience?.maxExp}{" "}
                    </p>
                    <p>
                        <strong>Salary:</strong> :{" "}
                        {selectedJob.salary.minSalary} -{" "}
                        {selectedJob.salary.maxSalary}{" "}
                    </p>
                    <p>
                        <strong>Openings :</strong>: {selectedJob.openings}{" "}
                    </p>
                    <p>Last date to apply: {selectedJob.duedate} </p>
                    <p>
                        <strong>Recruiter:</strong> {selectedJob.recruiter}
                    </p>
                    <button onClick={() => navigate(-1)}>back</button>
                    {isLoggedIn &&
                        userAccount?.role === "candidate" &&
                        !isApplied && (
                            <button
                                disabled={isApplying}
                                onClick={handleApplyClick}
                            >
                                {isApplying ? "Applying..." : "Apply"}
                            </button>
                        )}
                    {!isLoggedIn && !isApplied && (
                        <Link to="/login">
                            <p>LoginIn to apply</p>
                        </Link>
                    )}
                    {isApplied && <p>you already applied for this job</p>}
                </div>
            )}
        </Container>
    );
}

export default AllJobDetails;
