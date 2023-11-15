import { createAsyncThunk } from "@reduxjs/toolkit";

import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";

export const getProfileById = createAsyncThunk(
    "applicant-profile/getById",
    async (profileId: string) => {
        const res = await applicantProfileServices.getProfileById(profileId);

        return { ...res, data: res.data[1] };
    }
);
