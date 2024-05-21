import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    background-color: #b6afae;
    color: black;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & a {
        text-decoration: none;
        margin-right: 30px;
    }
    & a:hover {
        font-size: large;
        font-style: italic;
    }
    & h2 {
        margin-left: 30px;
    }
    & button {
        height: 40px;
        width: 100px;
        font-weight: 500;
        margin-right: 10px;
    }
    & button:hover {
        font-size: large;
        font-weight: 700;
        cursor: pointer;
    }
`;

function DashBoardHeader() {
    const location = useLocation();
    const url = location.pathname;
    const { userAccount, logoutUser } = useUser();
    const links = [{ path: "/alljobs", name: "JobsList" }];
    const navigate = useNavigate();

    if (url === "/login") {
        links.push({ path: "/register", name: "Register" });
        console.log("LINKS ==> ", links);
    }
    if (url === "/register") {
        links.push({ path: "/login", name: "Login" });
    }

    if (userAccount.role === "candidate") {
        links.push(
            { path: "/", name: "Home" },
            { path: "profile", name: "Profile" },
            { path: "applyJob", name: "ApplyJobs" }
        );
    }
    if (userAccount.role === "recruiter") {
        links.push(
            { path: "/", name: "Home" },
            { path: "profile", name: "Profile" },
            { path: "addJob", name: "AddJobs" },
            { path: "jobs", name: "ListedJobs" }
        );
    }

    function handleLogout() {
        logoutUser()
            .then((res) => {
                if (res.success) {
                    toast.success("Successfully logged out!");
                    navigate("/");
                }
            })
            .catch((err) => console.log("Error in logging out the user!", err));
    }

    return (
        <Container>
            {userAccount.username ? (
                <h2>Welcome , {userAccount.username}</h2>
            ) : (
                <h2>Job Portal</h2>
            )}
            <div>
                {links.map((ele) => (
                    <Link key={ele.path} to={ele.path}>
                        {ele.name}
                    </Link>
                ))}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </Container>
    );
}

export default DashBoardHeader;

/**
 * 
 *  

  {url === "/login" ? (
                <Link to="/register">Register</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}

 * 
 */
