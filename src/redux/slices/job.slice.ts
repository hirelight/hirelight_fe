import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IJobDetail, INewJobDto } from "@/services/job/job.interface";

export interface IJobSliceInitialState {
    data: IJobDetail;
    loading: boolean;
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
    },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;
