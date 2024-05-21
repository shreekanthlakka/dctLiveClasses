import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { currentLoggedInUserDetails, userProfile } from "../redux/authSlice";
import { allJobs } from "../redux/jobSlice";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const Container = styled.div`
    height: 100vh;
`;
const Main = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
    /* align-items: center; */
    height: 80vh;
    background-color: #f1edec;
`;

function AppLayout() {
    // const { userAccount, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const res = await dispatch(currentLoggedInUserDetails());
            console.log("res ==>", res);
            if (res.payload.isAuthenticated) {
                dispatch(userProfile(res.payload.user.role))
                    .then(unwrapResult)
                    .then(() => toast.success("set profile sucessfully"))
                    .catch(() => toast.error("profile not set"));
            }
            await dispatch(allJobs());
        })();
    }, []);
    return (
        <div>
            <Container>
                <Header />
                <Main>
                    <Outlet />
                </Main>
            </Container>
        </div>
    );
}

export default AppLayout;
