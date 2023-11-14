import { createAsyncThunk } from "@reduxjs/toolkit";

import assessmentsServices from "@/services/assessments/assessments.service";

export const fetchAssessmentById = createAsyncThunk(
    "assessment/fetchById",
    async (id: string) => {
        const res = await assessmentsServices.getById(id);

        return res;
    }
);
