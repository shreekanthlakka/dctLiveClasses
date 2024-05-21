import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../redux/jobSlice";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    & p {
        height: 10px;
        width: 400px;
        align-content: center;
    }
    & span {
        font-weight: bold;
    }
`;

function Job() {
    const { jobId } = useParams();
    const job = useSelector(getSingleJob(jobId));
    console.log("JOB ID ===> ", job);

    return (
        <Wrapper>
            <Container>
                <h3>Job Details for - {job.title}</h3>
                <p>
                    Job Description - <span>{job.description}</span>
                </p>
                <p>
                    Minimum salary - <span>{job.salary.minSalary}</span>
                </p>
                <p>
                    Max salary - <span>{job.salary.maxSalary}</span>
                </p>
                <p>
                    Skills -
                    {job.skills.map((ele) => (
                        <span key={ele}>{ele}, </span>
                    ))}
                </p>
                <p>
                    Location - <span>{job.location.join(",")}</span>
                </p>
                <p>
                    MinExperience - <span>{job.experience.minExp}</span>
                </p>
                <p>
                    MaxExperience - <span>{job.experience.maxExp}</span>
                </p>
            </Container>
            <div>
                <h2>Applied Candidates</h2>
            </div>
        </Wrapper>
    );
}

export default Job;
