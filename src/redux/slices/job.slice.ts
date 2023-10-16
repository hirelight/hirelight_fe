import {
    IJobDetail,
    IJobDetailError,
    INewJobDto,
} from "@/services/job/job.interface";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IJobSliceInitialState {
    data: IJobDetail;
    loading: boolean;
    error: {
        status: boolean;
        content: IJobDetailError;
    };
}

const initialState: IJobSliceInitialState = {
    data: {
        title: "",
        location: "",
        content: {
            description: "",
            requirements: "",
            benefits: "",
        },
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
        setJob: (state, action: PayloadAction<INewJobDto>) => {
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
});

export const { setJob, resetJobError, setJobError } = jobSlice.actions;
export default jobSlice.reducer;
