import { createContext, useContext, useReducer } from "react";
import {
    deleteJobApi,
    editJobApi,
    getAllJobDetailsApi,
    getApplicationsByJobId,
    getSingleJobDetailsApi,
} from "../services/jobService";

const jobContext = createContext();

const initialState = {
    jobs: [],
    isLoading: false,
    errors: null,
    selectedJob: {},
    appliedCandidates: [],
};

function jobReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, errors: null };
        case "ERROR":
            return { ...state, isLoading: false, errors: action.payload };
        case "ALL_JOBS":
            return {
                ...state,
                isLoading: false,
                jobs: action.payload,
            };
        case "DELETE_JOB":
            return {
                ...state,
                isLoading: false,
                jobs: state.jobs.filter(
                    (ele) => ele._id !== action.payload._id
                ),
            };
        case "UPDATE_JOB":
            return {
                ...state,
                isLoading: false,
                jobs: state.jobs.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        case "SELECTED_JOB":
            return { ...state, isLoading: false, selectedJob: action.payload };
        case "APPLIED_CANDIDATES":
            return {
                ...state,
                isLoading: false,
                appliedCandidates: action.payload,
            };
        case "default":
            return state;
    }
}

function JobContextProvider({ children }) {
    const [
        { jobs, isLoading, errors, selectedJob, appliedCandidates },
        dispatch,
    ] = useReducer(jobReducer, initialState);

    const getAllJobs = async () => {
        try {
            dispatch({ type: "START" });
            const res = await getAllJobDetailsApi();
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            }
            dispatch({ type: "ALL_JOBS", payload: res.data });
            return res;
        } catch (error) {
            dispatch({ type: "ERRORS", payload: error });
        }
    };

    const deleteJob = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await deleteJobApi(id);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            } else {
                dispatch({ type: "DELETE_JOB", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERRORS", payload: error });
        }
    };
    const updateJob = async (id, obj) => {
        try {
            dispatch({ type: "START" });
            const res = await editJobApi(id, obj);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            } else {
                dispatch({ type: "UPDATE_JOB", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERRORS", payload: error });
        }
    };

    const getSelectedJob = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await getSingleJobDetailsApi(id);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            }
            dispatch({ type: "SELECTED_JOB", payload: res.data });
            return res;
        } catch (error) {
            dispatch({ type: "ERRORS", payload: error });
        }
    };

    const getAppliedCandidates = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await getApplicationsByJobId(id);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            }
            dispatch({ type: "APPLIED_CANDIDATES", payload: res.data });
            return res;
        } catch (error) {
            dispatch({ type: "ERRORS", payload: error });
        }
    };

    const value = {
        jobs,
        isLoading,
        errors,
        getAllJobs,
        deleteJob,
        updateJob,
        getSelectedJob,
        selectedJob,
        appliedCandidates,
        getAppliedCandidates,
    };
    return <jobContext.Provider value={value}>{children}</jobContext.Provider>;
}

function useJobs() {
    const context = useContext(jobContext);
    if (!context) {
        throw new Error("useJobs must be used within a JobContextProvider");
    }
    return context;
}

export { JobContextProvider, useJobs };
