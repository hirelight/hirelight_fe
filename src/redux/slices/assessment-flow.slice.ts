import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IAssessmentFlowDto } from "@/services";

import { fetchAssessmentFlowById } from "../thunks/assessment-flow.thunk";

export interface IAssessmentFlowState {
    data: Omit<IAssessmentFlowDto, "id"> & { id?: string };
    loading: boolean;
}

const initialState: IAssessmentFlowState = {
    data: {
        name: "",
        assessments: [],
        startTime: "",
        endTime: "",
        creatorId: "",
        createdTime: "",
        updatedTime: "",
    },
    loading: false,
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
            })
            .addCase(fetchAssessmentFlowById.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.data = {
                    ...data,
                    startTime: data.startTime,
                    endTime: data.endTime,
                };
                state.loading = false;
            })
            .addCase(fetchAssessmentFlowById.rejected, (state, action) => {
                toast.error(action.error.message);
                state.loading = true;
            });
    },
});

export const { setAssessmentFlow } = assessmentFlowSlice.actions;
export default assessmentFlowSlice.reducer;
