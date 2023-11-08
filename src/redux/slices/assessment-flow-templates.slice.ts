import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { fetchAssessmentFlowTemplates } from "../thunks/assessment-flow-templates.thunk";

interface ICandidatesSlice {
    datas: any[];
    loading: boolean;
}

const initialState: ICandidatesSlice = {
    datas: [],
    loading: false,
};

const assessmentFlowTemplatesSlice = createSlice({
    name: "assessment-flow-templates",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAssessmentFlowTemplates.pending, state => {
                state.loading = true;
            })
            .addCase(
                fetchAssessmentFlowTemplates.fulfilled,
                (state, action) => {
                    const { data, message } = action.payload;
                    state.datas = data;
                    state.loading = false;
                    toast.success(message);
                }
            )
            .addCase(fetchAssessmentFlowTemplates.rejected, (state, action) => {
                toast.error("Fetch flows failure");
                state.loading = false;
            });
    },
});

export const {} = assessmentFlowTemplatesSlice.actions;
export default assessmentFlowTemplatesSlice.reducer;
