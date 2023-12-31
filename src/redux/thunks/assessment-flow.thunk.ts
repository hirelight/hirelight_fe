import { createAsyncThunk } from "@reduxjs/toolkit";

import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";

export const fetchAssessmentFlowById = createAsyncThunk(
    "assessment-flow/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await assessmentFlowsServices.getByIdAsync(id);

            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
