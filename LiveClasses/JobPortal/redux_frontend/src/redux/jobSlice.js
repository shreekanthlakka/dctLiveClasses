import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createJobApi,
    deleteJobApi,
    getAllJobDetailsApi,
} from "../services/jobService";

const initialState = {
    jobs: [],
    isLoading: false,
    error: "",
    success: false,
};
const jobSlice = createSlice({
    name: "job",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addJob.pending, (state) => {
                state.isLoading = true;
                state.error = "";
                state.success = false;
            })
            .addCase(addJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.jobs = [...state.jobs, action.payload.data];
            })
            .addCase(addJob.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteJob.pending, (state) => {
                state.isLoading = true;
                state.error = "";
                state.success = false;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.jobs = state.jobs.filter(
                    (job) => job._id !== action.payload.data._id
                );
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(allJobs.pending, (state) => {
                state.isLoading = true;
                state.error = "";
                state.success = false;
            })
            .addCase(allJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.jobs = action.payload;
            })
            .addCase(allJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const addJob = createAsyncThunk(
    "job/addJob",
    async (job, { rejectWithValue }) => {
        try {
            const res = await createJobApi(job);
            if (!res.success) {
                throw new Error("failed to create the job");
            } else {
                return res;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteJob = createAsyncThunk(
    "job/deleteJob",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteJobApi(id);
            if (!res.success) {
                throw new Error("failed to delete the job");
            } else {
                return res;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const allJobs = createAsyncThunk(
    "job/allJobs",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllJobDetailsApi();
            if (!res.success) {
                throw new Error("failed to get all jobs");
            } else {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const getSingleJob = (id) => (state) =>
    state.jobs.jobs.find((ele) => ele._id === id);

export { getSingleJob };
export default jobSlice.reducer;
