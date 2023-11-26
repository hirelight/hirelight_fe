import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import { ICreateMeetings, IEditMeetingDto, IMeetingDto } from "..";
import interceptor from "../interceptor";

const getListByAssessmentId = async (
    assessmentId: string
): Promise<IResponse<IMeetingDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IMeetingDto[]>>(
            endpoints.MEETINGS + `/search-by-assessment/${assessmentId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByEmployerId = async (
    employerId: string
): Promise<IResponse<IMeetingDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IMeetingDto[]>>(
            endpoints.MEETINGS + `/search-by-employer/${employerId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByCreatorId = async (
    creatorId: string
): Promise<IResponse<IMeetingDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IMeetingDto[]>>(
            endpoints.MEETINGS + `/search-by-creator/${creatorId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getMeetingById = async (
    meetingId: string
): Promise<IResponse<IMeetingDto>> => {
    try {
        const res = await interceptor.get<IResponse<IMeetingDto>>(
            endpoints.MEETINGS + `/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const createMeetings = async (
    createDtos: ICreateMeetings[]
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            endpoints.MEETINGS + "/create",
            createDtos
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editMeeting = async (
    editDto: IEditMeetingDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + "/update",
            editDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteMeeting = async (meetingId: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            endpoints.MEETINGS + `/delete/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const employerAcceptMeeting = async (
    meetingId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + `/accept-employer/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const employerDeclineMeeting = async (
    meetingId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + `/decline-employer/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const employerReScheduleMeeting = async (
    meetingId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + `/reschedule-employer/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const candidateAcceptMeeting = async (
    meetingId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + `/accept-candidate/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const candidateDeclineMeeting = async (
    meetingId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + `/decline-candidate/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const candidateReScheduleMeeting = async (
    meetingId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.MEETINGS + `/reschedule-candidate/${meetingId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const meetingServices = {
    getListByAssessmentId,
    getListByEmployerId,
    getListByCreatorId,
    createMeetings,
    editMeeting,
    employerAcceptMeeting,
    employerDeclineMeeting,
    employerReScheduleMeeting,
    candidateAcceptMeeting,
    candidateDeclineMeeting,
    deleteMeeting,
    candidateReScheduleMeeting,
    getMeetingById,
};

export default meetingServices;
