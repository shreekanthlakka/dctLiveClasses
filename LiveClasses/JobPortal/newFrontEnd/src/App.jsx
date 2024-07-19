import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import DashBoardLayout from "./components/DashBoardLayout";
import Candidate from "./components/Candidate";
import Unauthorized from "./components/Unauthorized";
import Recuiter from "./components/Recuiter";
import AddJob from "./components/AddJob";
import ApplyJob from "./components/ApplyJob";
import Profile from "./components/Profile";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
import AllJobs from "./components/AllJobs";
import AllJobDetails from "./components/AllJobDetails";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="allJobs" element={<AllJobs />} />
                        <Route
                            path="allJobs/:jobId"
                            element={<AllJobDetails />}
                        />
                    </Route>
                    <Route path="/account" element={<DashBoardLayout />}>
                        <Route path="jobs" element={<Jobs />} />
                        <Route path="jobs/:jobId" element={<JobDetails />} />
                        <Route
                            path="jobs/:jobId/candidates/:appId"
                            element={<Candidate />}
                        />
                        <Route path="recuiter" element={<Recuiter />} />
                        <Route path="addJob" element={<AddJob />} />
                        <Route path="applyJob" element={<ApplyJob />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                    },
                    error: {
                        duration: 2500,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "gray",
                    },
                }}
            />
        </>
    );
}

export default App;
