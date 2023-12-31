import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import {
    ICreateEvaluationDto,
    IEditEvaluationDto,
    IEvaluationDto,
    IProfileEvaluationDto,
} from "./evaluation.interface";

const createEvaluation = async (
    createDto: ICreateEvaluationDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            endpoints.ASSESSMENT_EVALUATION,
            createDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const editEvaluation = async (
    editDto: IEditEvaluationDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.ASSESSMENT_EVALUATION + `/${editDto.id}`,
            editDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getById = async (
    evaluationId: string
): Promise<IResponse<IEvaluationDto>> => {
    try {
        const res = await interceptor.get<IResponse<IEvaluationDto>>(
            endpoints.ASSESSMENT_EVALUATION + `/${evaluationId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByProfileId = async (
    profileId: string
): Promise<IResponse<IProfileEvaluationDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IProfileEvaluationDto[]>>(
            endpoints.ASSESSMENT_EVALUATION + `/applicant-profiles/${profileId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByApplicantAssessmentDetailId = async (
    applicantAssessmentDetailId: string
): Promise<IResponse<IEvaluationDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IEvaluationDto[]>>(
            endpoints.ASSESSMENT_EVALUATION +
                `/applicant-assessment-details/${applicantAssessmentDetailId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListByCollaboratorId = async (
    collaboratorId: string
): Promise<IResponse<IEvaluationDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IEvaluationDto[]>>(
            endpoints.ASSESSMENT_EVALUATION +
                `/applicant-assessment-details/${collaboratorId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteById = async (evaluationId: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            endpoints.ASSESSMENT_EVALUATION + `/${evaluationId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const evaluationServices = {
    createEvaluation,
    getById,
    getListByApplicantAssessmentDetailId,
    getListByCollaboratorId,
    editEvaluation,
    getListByProfileId,
    deleteById,
};

export default evaluationServices;
