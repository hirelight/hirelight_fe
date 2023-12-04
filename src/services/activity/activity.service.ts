import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import { IActivityLogDto } from "./activity.interface";

const getListByJobId = async (
    jobId: string
): Promise<IResponse<IActivityLogDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IActivityLogDto[]>>(
            `/activities/logs/job-posts/${jobId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByAssessmentId = async (
    assessmentId: string
): Promise<IResponse<IActivityLogDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IActivityLogDto[]>>(
            `/activities/logs/assessments/${assessmentId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByCollaboratorsId = async (
    collaboratorId: string
): Promise<IResponse<IActivityLogDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IActivityLogDto[]>>(
            `/activities/logs/collaborators/${collaboratorId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getById = async (id: string): Promise<IResponse<IActivityLogDto>> => {
    try {
        const res = await interceptor.get<IResponse<IActivityLogDto>>(
            `/activities/logs/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteById = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            `/activities/logs/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const activityServices = {
    getListByJobId,
    getListByAssessmentId,
    getListByCollaboratorsId,
    getById,
    deleteById,
};

export default activityServices;
