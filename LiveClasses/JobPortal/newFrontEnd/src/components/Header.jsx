import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/userContext";

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
    & h2 {
        margin-left: 30px;
    }
`;

function Header() {
    const location = useLocation();
    const url = location.pathname;
    const { isLoggedIn } = useUser();

    return (
        <Container>
            <h2>Job Portal</h2>
            <div>
                <Link to={"/alljobs"}>JobList</Link>
                {url === "/login" ? (
                    <Link to="/register">Register</Link>
                ) : !isLoggedIn ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <Link to="/account">Dashboard</Link>
                )}
            </div>
        </Container>
    );
}

export default Header;

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
