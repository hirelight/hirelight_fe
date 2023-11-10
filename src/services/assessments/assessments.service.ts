import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import {
    IAssessmentDto,
    IEditAsyncVideoInterviewDto,
} from "./assessments.interface";

const getById = async (id: number): Promise<IResponse<IAssessmentDto>> => {
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

const assessmentsServices = {
    getById,
    editAsync,
};

export default assessmentsServices;
