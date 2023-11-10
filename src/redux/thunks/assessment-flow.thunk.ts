import { createAsyncThunk } from "@reduxjs/toolkit";

import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";

export const fetchAssessmentFlowById = createAsyncThunk(
    "assessment-flow/fetchById",
    async (id: number) => {
        const res = await assessmentFlowsServices.getByIdAsync(id);

        return res;
    }
);
