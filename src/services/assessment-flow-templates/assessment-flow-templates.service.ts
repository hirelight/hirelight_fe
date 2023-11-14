import { IResponse } from "@/interfaces/service.interface";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    IAssessmentFlTempDto,
    ICreateAssessmentFlTempDto,
    IEditAssessmentFlTempDto,
} from "./assessment-flow-templates.interface";

const getListAsync = async (): Promise<IResponse<IAssessmentFlTempDto[]>> => {
    try {
        const res = await interceptor.get(endpoints.ASSESSMENT_FLOW_TEMPLATES);
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (
    id: string
): Promise<IResponse<IAssessmentFlTempDto>> => {
    try {
        const res = await interceptor.get(
            endpoints.ASSESSMENT_FLOW_TEMPLATES + `/${id}`
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const createASync = async (
    createDto: ICreateAssessmentFlTempDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post(
            endpoints.ASSESSMENT_FLOW_TEMPLATES,
            createDto
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const editASync = async (
    editDto: IEditAssessmentFlTempDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put(
            endpoints.ASSESSMENT_FLOW_TEMPLATES + `/${editDto.id}`,
            editDto
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteByIdAsync = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete(
            endpoints.ASSESSMENT_FLOW_TEMPLATES + `/${id}`
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const assessmentFlowTemplatesServices = {
    getListAsync,
    getByIdAsync,
    createASync,
    editASync,
    deleteByIdAsync,
};

export default assessmentFlowTemplatesServices;
