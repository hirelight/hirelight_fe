import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IAssessmentFlowDto } from "@/services";

import { fetchAssessmentFlowById } from "../thunks/assessment-flow.thunk";

export interface IAssessmentFlowState {
    data: Omit<IAssessmentFlowDto, "id"> & { id?: number };
    loading: boolean;
}

const initialState: IAssessmentFlowState = {
    data: {
        name: "",
        assessments: [],
        startTime: new Date(),
        endTime: new Date(),
        creatorId: 0,
        createdTime: new Date(),
        updatedTime: new Date(),
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
                console.log(data);
                state.data = {
                    ...data,
                    startTime: new Date(data.startTime),
                    endTime: new Date(data.endTime),
                };
                toast.success(message);
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
