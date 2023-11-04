import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    ICreateJobDto,
    IJobDetailError,
    IJobDto,
    JobContentJson,
} from "@/services/job/job.interface";

import { createNewJobPost } from "../thunks/job.thunk";

export interface IJobSliceInitialState {
    data: Omit<ICreateJobDto, "content"> & { content: JobContentJson };
    loading: boolean;
    error: {
        status: boolean;
        content: IJobDetailError;
    };
}

const initialState: IJobSliceInitialState = {
    data: {
        title: "",
        content: {
            description: "",
            requirements: "",
            benefits: "",
        },
        applicationForm: "",
        minSalary: 0,
        maxSalary: 0,
        currency: "",
        startTime: new Date(),
        endTime: new Date(),
        area: "",
        experience: "",
        workModality: "",
    },
    error: {
        status: false,
        content: {
            titleErr: "",
            locationErr: "",
            contentErr: {
                descriptionErr: "",
                requirementsErr: "",
                benefitsErr: "",
            },
        },
    },
    loading: false,
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setJob: (state, action: PayloadAction<typeof initialState.data>) => {
            state.data = action.payload;
        },
        deleteJob: (state, action) => {},
        setJobError: (state, action) => {
            state.error = action.payload;
        },
        resetJobError: (state, action) => {
            state.error = {
                status: false,
                content: {
                    titleErr: "",
                    locationErr: "",
                    contentErr: {
                        descriptionErr: "",
                        requirementsErr: "",
                        benefitsErr: "",
                    },
                },
            };
        },
    },

    extraReducers: builder => {
        builder
            .addCase(createNewJobPost.pending, () => {})
            .addCase(createNewJobPost.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(createNewJobPost.rejected, (state, action) => {});
    },
});

export const { setJob, resetJobError, setJobError } = jobSlice.actions;
export default jobSlice.reducer;
