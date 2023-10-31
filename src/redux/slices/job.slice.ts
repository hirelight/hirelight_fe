import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    IJobDetailError,
    IJobDto,
    JobContentJson,
} from "@/services/job/job.interface";

export interface IJobSliceInitialState {
    data: Omit<IJobDto, "content"> & { content: JobContentJson };
    loading: boolean;
    error: {
        status: boolean;
        content: IJobDetailError;
    };
}

const initialState: IJobSliceInitialState = {
    data: {
        id: 0,
        creatorId: 0,
        assessmentFlowId: 0,
        organizationId: 0,
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
        employmentType: "",
        keywords: "",
        createdTime: new Date(),
        updatedTime: new Date(),
        status: "",
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
});

export const { setJob, resetJobError, setJobError } = jobSlice.actions;
export default jobSlice.reducer;
