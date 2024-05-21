import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../context/jobsContext";

function JobDetails() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const {
        isLoading,
        getSelectedJob,
        selectedJob,
        getAppliedCandidates,
        appliedCandidates,
    } = useJobs();
    useEffect(() => {
        (async () => {
            // await getSelectedJob(jobId);
            await Promise.all([
                getSelectedJob(jobId),
                getAppliedCandidates(jobId),
            ]);
        })();
    }, []);
    console.log("APPLIED ==> ", appliedCandidates);
    if (isLoading) <h1>Loading ... </h1>;
    return (
        <div>
            {Object.keys(selectedJob).length > 0 && (
                <>
                    <h3>
                        Applied candidates for <i>{selectedJob.title}</i>
                    </h3>
                    <ul>
                        {appliedCandidates.map((candidate) => (
                            <li key={candidate._id}>
                                {" "}
                                Name : {candidate.candidate?.username} Email:
                                <strong>
                                    <Link to={`candidates/${candidate._id}`}>
                                        {candidate.candidate?.email}
                                    </Link>
                                </strong>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/account/jobs/${jobId}/candidates/${candidate._id}`
                                        )
                                    }
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default JobDetails;
