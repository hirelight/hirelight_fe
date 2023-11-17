import { createAsyncThunk } from "@reduxjs/toolkit";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

export const getAppDetailByProfileId = createAsyncThunk(
    "applicant-assessment-detail/getById",
    async (profileId: string) => {
        const res =
            await applicantAssessmentDetailServices.getAppAssDetailByProfileId(
                profileId
            );

        return res;
    }
);

export const getAllAppDetailList = createAsyncThunk(
    "applicant-assessment-detail/getAll",
    async (jobpostId: string) => {
        const res =
            await applicantAssessmentDetailServices.employeeGetJobPostProfile(
                jobpostId
            );

        return res;
    }
);

export const getAssessmentAppAssessDetails = createAsyncThunk(
    "applicant-assessment-detail/get-all-byAssessment",
    async (assessmentId: string) => {
        const res =
            await applicantAssessmentDetailServices.employeeApplicantDetailByAssessmentId(
                assessmentId
            );

        return res;
    }
);
