import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";
import { IAssessmentFlow } from "..";

import {
    IAddAssessmentDto,
    IAssessmentDto,
    IEditAsyncVideoInterviewDto,
    ThirdPartyAssessment,
} from "./assessments.interface";

const getById = async (id: string): Promise<IResponse<IAssessmentDto>> => {
    try {
        const res = await interceptor.get(endpoints.ASSESSMENTS + `/${id}`);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const editAsync = async (
    editDto: IEditAsyncVideoInterviewDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put(
            endpoints.ASSESSMENTS + `/${editDto.id}`,
            editDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const addAssessment = async (
    addDto: IAddAssessmentDto
): Promise<IResponse<IAssessmentFlow>> => {
    try {
        const res = await interceptor.post<IResponse<IAssessmentFlow>>(
            endpoints.ASSESSMENTS,
            addDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteById = async (
    id: string,
    jobPostId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete(endpoints.ASSESSMENTS + `/${id}`, {
            params: {
                jobPostId,
            },
        });

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListIntegrationAssessments = async (
    service?: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.get(
            endpoints.ASSESSMENTS + `/integration`,
            {
                params: {
                    service,
                },
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListThirdParty = async (
    service: string
): Promise<IResponse<ThirdPartyAssessment[]>> => {
    try {
        const res = await interceptor.get<IResponse<ThirdPartyAssessment[]>>(
            endpoints.ASSESSMENTS + `/integration`,
            {
                params: {
                    service,
                },
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const assessmentsServices = {
    getById,
    editAsync,
    getListIntegrationAssessments,
    getListThirdParty,
    deleteById,
    addAssessment,
};

export default assessmentsServices;
