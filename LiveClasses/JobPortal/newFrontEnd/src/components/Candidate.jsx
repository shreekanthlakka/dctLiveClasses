import { useParams } from "react-router-dom";
import { useJobs } from "../context/jobsContext";

function Candidate() {
    const { id } = useParams();
    return (
        <div>
            <h1>Candidate</h1>
        </div>
    );
}

export default Candidate;
