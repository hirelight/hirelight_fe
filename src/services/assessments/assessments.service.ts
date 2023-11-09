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

const editAsyncVideoInterview = async (
    editDto: IEditAsyncVideoInterviewDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put(
            endpoints.ASSESSMENTS + `/async-video-interview/${editDto.id}`,
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
    editAsyncVideoInterview,
};

export default assessmentsServices;
