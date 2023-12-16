import { createSlice } from "@reduxjs/toolkit";

import { IAssessmentFlowDto } from "@/services";

import { fetchAssessmentFlowById } from "../thunks/assessment-flow.thunk";

export interface IAssessmentFlowState {
    data: Omit<IAssessmentFlowDto, "id"> & { id?: string };
    loading: boolean;
    error: string | null;
}

const initialState: IAssessmentFlowState = {
    data: {
        name: "",
        assessments: [],
        startTime: new Date(),
        endTime: new Date(),
        creatorId: "",
        createdTime: new Date(),
        updatedTime: new Date(),
    },
    loading: false,
    error: null,
};

const assessmentFlowSlice = createSlice({
    name: "assessmentFlow",
    initialState,
    reducers: {
        setAssessmentFlow: (state, action) => {
            state.data = action.payload;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(fetchAssessmentFlowById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssessmentFlowById.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.data = {
                    ...data,
                    startTime: data.startTime,
                    endTime: data.endTime,
                };
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchAssessmentFlowById.rejected, (state, action) => {
                // state.error = action.error.message
                state.loading = false;
            });
    },
});

export const { setAssessmentFlow } = assessmentFlowSlice.actions;
export default assessmentFlowSlice.reducer;
