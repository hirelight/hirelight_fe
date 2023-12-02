import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import { ICreateFeedbackDto, IFeedbackDto } from "./feedback.interface";

const getListByJobPost = async (
    jobPostId: string
): Promise<IResponse<IFeedbackDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IFeedbackDto[]>>(
            `/feedback/search/jobpost/${jobPostId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByCandidateId = async (
    candidateId: string
): Promise<IResponse<IFeedbackDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IFeedbackDto[]>>(
            `/feedback/search/candidate/${candidateId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByOrgId = async (
    orgId: string
): Promise<IResponse<IFeedbackDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IFeedbackDto[]>>(
            `/feedback/search/org/${orgId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getById = async (id: string): Promise<IResponse<IFeedbackDto>> => {
    try {
        const res = await interceptor.get<IResponse<IFeedbackDto>>(
            `/feedback/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const createReport = async (
    createDto: ICreateFeedbackDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `/feedback`,
            createDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteById = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(`/feedback/${id}`);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const feedbackServices = {
    getListByCandidateId,
    getListByJobPost,
    getById,
    createReport,
    deleteById,
    getListByOrgId,
};

export default feedbackServices;
