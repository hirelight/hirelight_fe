import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    ApplicationFormJSON,
    IJobPostAppAssDetailDto,
    IJobPostProfileDto,
} from "@/services";

import { getProfileById } from "../thunks/applicant-profile.thunk";
import { getAppDetailByProfileId } from "../thunks/applicant-assessment-detail.slice.thunk";

interface IApplicantProfileState {
    data: IJobPostAppAssDetailDto | null;
    loading: boolean;
}

const initialState: IApplicantProfileState = {
    data: null,
    loading: false,
};

const applicantAssessmentDetailSlice = createSlice({
    name: "applicantProfile",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAppDetailByProfileId.pending, state => {
                state.loading = true;
            })
            .addCase(getAppDetailByProfileId.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.data = data;
                toast.success(message, {
                    position: "bottom-right",
                    autoClose: 1000,
                });
                state.loading = false;
            })
            .addCase(getAppDetailByProfileId.rejected, (state, action) => {
                console.error(action.error);
                state.loading = false;
                toast.error("Fetch profile failure", {
                    position: "bottom-right",
                    autoClose: 1000,
                });
            });
    },
});

export const {} = applicantAssessmentDetailSlice.actions;

export default applicantAssessmentDetailSlice.reducer;
