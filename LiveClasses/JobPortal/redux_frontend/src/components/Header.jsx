import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../redux/authSlice";
import { useEffect } from "react";

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
    & button {
        margin-right: 10px;
        height: 40px;
        width: 100px;
        cursor: pointer;
    }
`;

function Header() {
    const { userAccount, isLoading, isLoggedIn } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = [
        { path: "home", name: "Home" },
        { path: "profile", name: "Profile" },
    ];
    if (userAccount?.role === "recruiter") {
        links.push({ path: "addjobs", name: "AddJob" });
    }

    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            navigate("/login");
            console.log("navigate");
        }
    }, [userAccount, isLoggedIn, isLoading]);

    return (
        <Container>
            <Logo />
            <div>
                {links.map((ele) => (
                    <Link key={ele.path} to={ele.path}>
                        {ele.name}
                    </Link>
                ))}
                <button
                    disabled={isLoading}
                    onClick={() => dispatch(userLogout())}
                >
                    {isLoading ? "Logging out ..." : "Logout"}
                </button>
            </div>
        </Container>
    );
}

export default Header;
