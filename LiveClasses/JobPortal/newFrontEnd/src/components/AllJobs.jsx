import { useEffect, useState } from "react";
import { getAllJobDetailsOpenApi } from "../services/jobService";
import { Link } from "react-router-dom";

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllJobDetailsOpenApi()
            .then((res) => {
                setJobs(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }, []);
    if (isLoading) <h2>Loading ... </h2>;
    return (
        <div>
            <h1>Listing Jobs - {jobs.length}</h1>
            {jobs.map((ele) => (
                <Link to={`/allJobs/${ele._id}`} key={ele._id}>
                    <p>{ele.title}</p>
                </Link>
            ))}
        </div>
    );
}

export default AllJobs;
