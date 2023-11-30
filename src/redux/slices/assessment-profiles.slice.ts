import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { IAppFormSection } from "@/interfaces";
import {
    ApplicationFormJSON,
    IAssessmentDto,
    IJobPostProfileDto,
} from "@/services";

import { getProfileById } from "../thunks/applicant-profile.thunk";

interface IApplicantProfileState {
    data: {
        assessment: IAssessmentDto;
        applicantProfiles: IJobPostProfileDto[];
        selectedProfiles: string[];
    };
    loading: boolean;
}

const initialState: IApplicantProfileState = {
    data: {
        assessment: {
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
        applicantProfiles: [],
        selectedProfiles: [],
    },
    loading: false,
};

const assessmentProfilesSlice = createSlice({
    name: "applicantProfile",
    initialState: initialState,
    reducers: {
        setAssessmentProfiles: (state, action) => {
            state.data.applicantProfiles = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getProfileById.pending, state => {
                state.loading = true;
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                const { data, message } = action.payload;
            })
            .addCase(getProfileById.rejected, (state, action) => {});
    },
});

export const { setAssessmentProfiles } = assessmentProfilesSlice.actions;

export default assessmentProfilesSlice.reducer;
