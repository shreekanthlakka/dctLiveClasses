import { useEffect } from "react";
import { useUser } from "../context/userContext";
import DashBoardHeader from "./DashBoardHeader";
import { getCurrentLoggedInUser, getProfile } from "../services/userService";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const Main = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

function DashBoardLayout() {
    const { dispatch } = useUser();

    useEffect(() => {
        async function getCurrentUser() {
            try {
                dispatch({ type: "START" });
                const res = await getCurrentLoggedInUser();
                if (!res.success) {
                    throw {
                        status: res.status,
                        message: res.message,
                    };
                }
                dispatch({
                    type: "SET_USER",
                    payload: res.data,
                    isAuthenticated: res.isAuthenticated,
                });
                if (res.success) {
                    getProfileData(res.data.role);
                }
            } catch (error) {
                dispatch({ type: "ERROR", payload: error });
            }
        }

        async function getProfileData(role) {
            try {
                dispatch({ type: "START" });
                const res = await getProfile(role);
                if (!res?.success) {
                    throw {
                        status: 500,
                        message: "Failed to fetch user profile data.",
                    };
                }
                if (res?.success) {
                    dispatch({ type: "SET_PROFILE", payload: res.data });
                    toast.success(res.message);
                }
            } catch (error) {
                dispatch({ type: "ERROR", payload: error });
            }
        }
        getCurrentUser();
    }, []);

    return (
        <div>
            {/* Header --Candidate ==>Home , Account , ApplyJobs , Logout* ----------*/}
            {/* Header --Reciter ===> Home Account , AddJobs , Logout--------- */}
            {/* SidePanal  */}
            {/* Content ==> Outlet */}

            <DashBoardHeader />
            <Main>
                <Outlet />
            </Main>
        </div>
    );
}

export default DashBoardLayout;
