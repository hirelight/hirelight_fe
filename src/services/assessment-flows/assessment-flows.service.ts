import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    IAssessmentFlowDto,
    ICreateAssessmentFlowDto,
    IEditAssessmentFlowDto,
} from "./assessment-flows.interface";

interface IAssessmentFlowsServices {
    getListAsync: () => Promise<IResponse<any[]>>;
    getByIdAsync: (id: number) => Promise<IResponse<any>>;
    createAsync: (
        createDto: ICreateAssessmentFlowDto
    ) => Promise<IResponse<any>>;
    editAsync: (editDto: IEditAssessmentFlowDto) => Promise<IResponse<any>>;
    deleteByIdAsync: (id: number) => Promise<IResponse<any>>;
}

class AssessmentFlowsServices implements IAssessmentFlowsServices {
    createAsync = async (
        createEmailTemplatesDto: ICreateAssessmentFlowDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.post<IResponse<any>>(
                `${endpoints.ASSESSMENT_FLOWS}`,
                createEmailTemplatesDto
            );
            console.log(res);
            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getListAsync = async (): Promise<IResponse<IAssessmentFlowDto[]>> => {
        try {
            const res = await interceptor.get<IResponse<any[]>>(
                endpoints.ASSESSMENT_FLOWS
            );

            checkResErr(res.data);

            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getByIdAsync = async (
        id: number
    ): Promise<IResponse<IAssessmentFlowDto>> => {
        try {
            const res = await interceptor.get<IResponse<any>>(
                `${endpoints.ASSESSMENT_FLOWS}/${id}`
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    editAsync = async (
        editEmailTemplateDto: IEditAssessmentFlowDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.put<IResponse<any>>(
                `${endpoints.ASSESSMENT_FLOWS}/${editEmailTemplateDto.id}`,
                editEmailTemplateDto
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    deleteByIdAsync = async (id: number): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.delete<IResponse<any>>(
                `${endpoints.ASSESSMENT_FLOWS}/${id}`
            );

            checkResErr(res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}

const assessmentFlowsServices = new AssessmentFlowsServices();

export default assessmentFlowsServices;
