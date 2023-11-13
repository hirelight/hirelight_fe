import { createAsyncThunk } from "@reduxjs/toolkit";

import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";

export const getProfileById = createAsyncThunk(
    "applicant-profile/getById",
    async (candidateId: string) => {
        const res =
            await applicantProfileServices.getJobPostProfileById(candidateId);

        return { ...res, data: res.data[1] };
    }
);
