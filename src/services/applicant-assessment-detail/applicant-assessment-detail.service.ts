import { IResponse } from "@/interfaces/service.interface";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";
import {
    ICandidateAssessmentDetailDto,
    IMCAppliAssessmentDto,
    ISubmitMCAnswerDto,
    IJobPostAppAssDetailDto,
    ITrackAsyncAssessmentDto,
    ISubmitAsyncAssessmentDto,
    IAsyncAssessDto,
} from "..";

const moveCandidateToAssessment = async (
    applicantProfileId: string,
    assessmentId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS + "/move/canidate",
            {
                applicantProfileId,
                assessmentId,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const employeeGetApplicantAssessDetailsList = async (
    candidateId: string | null,
    jobpostId?: string
): Promise<IResponse<IJobPostAppAssDetailDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IJobPostAppAssDetailDto[]>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS + "/employee/search",
            {
                params: {
                    candidateId,
                    jobpostId,
                },
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const employeeGetJobPostProfile = async (
    jobPostId: string,
    includeMovedStatus: boolean = false
): Promise<IResponse<IJobPostAppAssDetailDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IJobPostAppAssDetailDto[]>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS + "/employee/jobpost",
            {
                params: {
                    jobPostId,
                    includeMovedStatus,
                },
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const employeeGetByDetailId = async (
    applicantAssessmentId: string
): Promise<IResponse<IJobPostAppAssDetailDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IJobPostAppAssDetailDto[]>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/employee/${applicantAssessmentId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const employeeApplicantDetailByAssessmentId = async (
    assessmentId: string,
    includeMovedStatus: boolean = false
): Promise<IResponse<IJobPostAppAssDetailDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IJobPostAppAssDetailDto[]>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS + "/employee/assessment",
            {
                params: {
                    assessmentId,
                    includeMovedStatus,
                },
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getAppAssDetailByProfileId = async (
    applicantProfileId: string
): Promise<IResponse<IJobPostAppAssDetailDto>> => {
    try {
        const res = await interceptor.get<IResponse<IJobPostAppAssDetailDto>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/employee/applicant-profile/${applicantProfileId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getMyInvitedAssessmentById = async (
    applicantAssessmentDetailId: string
): Promise<IResponse<ICandidateAssessmentDetailDto>> => {
    try {
        const res = await interceptor.get<
            IResponse<ICandidateAssessmentDetailDto>
        >(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/canidate/${applicantAssessmentDetailId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getMyInvitedAssessments = async (): Promise<
    IResponse<ICandidateAssessmentDetailDto[]>
> => {
    try {
        const res = await interceptor.get<
            IResponse<ICandidateAssessmentDetailDto[]>
        >(endpoints.APPLICANT_ASSESSMENT_DETAILS + "/candidate/me");

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const sendAssessment = async (
    applicantAssessmentDetailId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/invite/${applicantAssessmentDetailId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

// ******************MC Assment************************
const joinMCAssessment = async (
    applicantAsessmentDetailId: string
): Promise<IResponse<IMCAppliAssessmentDto>> => {
    try {
        const res = await interceptor.put<IResponse<IMCAppliAssessmentDto>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/multiple-choice-question-assessment/join/${applicantAsessmentDetailId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const trackMCAssessment = async (
    trackDto: ISubmitMCAnswerDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<
            IResponse<ICandidateAssessmentDetailDto>
        >(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/multiple-choice-question-assessment/track/${trackDto.applicantAssessmentDetailId}`,
            trackDto.answers
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const submitMCAssessment = async (
    submitDto: ISubmitMCAnswerDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<
            IResponse<ICandidateAssessmentDetailDto>
        >(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/multiple-choice-question-assessment/submit/${submitDto.applicantAssessmentDetailId}`,
            submitDto.answers
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

// ******************MC Assment************************
const joinAsyncAssessment = async (
    applicantAsessmentDetailId: string
): Promise<IResponse<IAsyncAssessDto>> => {
    try {
        const res = await interceptor.put<IResponse<IAsyncAssessDto>>(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/async-video-interview-assessment/join/${applicantAsessmentDetailId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const trackAsyncAssessment = async (
    trackDto: ITrackAsyncAssessmentDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<
            IResponse<ICandidateAssessmentDetailDto>
        >(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/async-video-interview-assessment/track/${trackDto.applicantAssessmentDetailId}`,
            {
                assessmentSubmissions: trackDto.assessmentSubmissions,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const submitAsyncAssessment = async (
    submitDto: ISubmitAsyncAssessmentDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<
            IResponse<ICandidateAssessmentDetailDto>
        >(
            endpoints.APPLICANT_ASSESSMENT_DETAILS +
                `/async-video-interview-assessment/submit/${submitDto.applicantAssessmentDetailId}`,
            {
                assessmentSubmissions: submitDto.assessmentSubmissions,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const applicantAssessmentDetailServices = {
    moveCandidateToAssessment,
    sendAssessment,
    employeeGetApplicantAssessDetailsList,
    getMyInvitedAssessments,
    getMyInvitedAssessmentById,
    employeeGetJobPostProfile,
    employeeApplicantDetailByAssessmentId,
    employeeGetByDetailId,
    getAppAssDetailByProfileId,
};

export const mcAssessmentServices = {
    joinMCAssessment,
    trackMCAssessment,
    submitMCAssessment,
};

export const asyncAssessmentServices = {
    joinAsyncAssessment,
    submitAsyncAssessment,
    trackAsyncAssessment,
};

export default applicantAssessmentDetailServices;
