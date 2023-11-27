import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IAssessmentDto, IAssessmentFlowDto } from "@/services";

import { fetchAssessmentFlowById } from "../thunks/assessment-flow.thunk";
import { fetchAssessmentById } from "../thunks/assessment.thunk";

export interface IAssessmentFlowState {
    data: IAssessmentDto;
    loading: boolean;
}

const initialState: IAssessmentFlowState = {
    data: {
        id: "",
        assessmentFlowId: "",
        assessmentTypeId: "",
        assessmentTypeName: "SOURCED_ASSESSMENT",
        assessmentQuestionAnswerSetId: null,
        assessmentQuestionAnswerSetContent: null,
        creatorId: "",
        name: "",
        description: null,
        content: null,
        query: null,
        duration: null,
        index: 0,
        createdTime: new Date(),
        updatedTime: new Date(),
        status: "ACTIVE",
    },
    loading: false,
};

const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {
        setAssessment: (state, action) => {
            state.data = action.payload;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(fetchAssessmentById.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAssessmentById.fulfilled, (state, action) => {
                const { data, message, statusCode } = action.payload;
                state.data = data;
                state.loading = false;
            })
            .addCase(fetchAssessmentById.rejected, (state, action) => {
                toast.error(action.error.message);
                state.loading = true;
            });
    },
});

export const { setAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
