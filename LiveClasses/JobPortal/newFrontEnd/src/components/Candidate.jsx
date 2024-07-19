import { useParams } from "react-router-dom";
import { useJobs } from "../context/jobsContext";
import { useEffect } from "react";

function Candidate() {
    const { jobId, appId } = useParams();

    const { isLoading, getSingleApplication, selectedApplication } = useJobs();

    useEffect(() => {
        (async () => {
            const res = await getSingleApplication(jobId, appId);
            console.log("RESPONSE  ====> ", res);
        })();
    }, []);

    return (
        <div>
            <h1>Candidate</h1>
        </div>
    );
}

export default Candidate;
