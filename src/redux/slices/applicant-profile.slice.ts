import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IAppFormSection } from "@/interfaces";
import { IJobPostProfileDto } from "@/services";

import { getProfileById } from "../thunks/applicant-profile.thunk";

interface IApplicantProfileState {
    data: Omit<IJobPostProfileDto, "content"> & { content: IAppFormSection[] };
    loading: boolean;
}

const initialState: IApplicantProfileState = {
    data: {
        id: "",
        candidateId: "",
        firstName: "",
        lastName: "",
        jobPostId: "",
        content: [],
        status: "",
    },
    loading: false,
};

const applicantProfileSlice = createSlice({
    name: "applicantProfile",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProfileById.pending, state => {
                state.loading = true;
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                const { data, message } = action.payload;
                state.data = {
                    ...data,
                    content: JSON.parse(data.content),
                };
                toast.success(message, {
                    position: "bottom-right",
                    autoClose: 1000,
                });
                state.loading = false;
            })
            .addCase(getProfileById.rejected, (state, action) => {
                console.error(action.error);
                state.loading = false;
                toast.error("Fetch profile failure", {
                    position: "bottom-right",
                    autoClose: 1000,
                });
            });
    },
});

export const {} = applicantProfileSlice.actions;

export default applicantProfileSlice.reducer;
