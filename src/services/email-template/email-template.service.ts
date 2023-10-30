import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import {
    ICreateEmailTemplatesDto,
    IEditEmailTemplatesDto,
    IEmailTemplatesDto,
} from "./email-template.interface";

interface IEmailTemplateServices {
    getListAsync: () => Promise<IResponse<IEmailTemplatesDto[]>>;
    getByIdAsync: (id: number) => Promise<IResponse<IEmailTemplatesDto>>;
    createAsync: (
        createDto: ICreateEmailTemplatesDto
    ) => Promise<IResponse<any>>;
    editAsync: (editDto: IEditEmailTemplatesDto) => Promise<IResponse<any>>;
    deleteByIdAsync: (id: number) => Promise<IResponse<any>>;
}

class EmailTemplateServices implements IEmailTemplateServices {
    createAsync = async (
        createEmailTemplatesDto: ICreateEmailTemplatesDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.post<IResponse<any>>(
                `${endpoints.EMAIL_TEMPLATE}`,
                createEmailTemplatesDto
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getListAsync = async (): Promise<IResponse<IEmailTemplatesDto[]>> => {
        try {
            const res = await interceptor.get(endpoints.EMAIL_TEMPLATE);

            console.log(res);

            // if (res.data.statusCode >= 400) throw new Error(res.data.message);

            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getByIdAsync = async (
        id: number
    ): Promise<IResponse<IEmailTemplatesDto>> => {
        try {
            const res = await interceptor.get<IResponse<IEmailTemplatesDto>>(
                `${endpoints.EMAIL_TEMPLATE}/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    editAsync = async (
        editEmailTemplateDto: IEditEmailTemplatesDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.put<IResponse<any>>(
                `${endpoints.EMAIL_TEMPLATE}/${editEmailTemplateDto.templateId}`,
                editEmailTemplateDto
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    deleteByIdAsync = async (id: number): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.delete<IResponse<any>>(
                `${endpoints.EMAIL_TEMPLATE}/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);
            return res.data;
        } catch (error) {
            throw error;
        }
    };
}

const emailTemplateService = new EmailTemplateServices();

export default emailTemplateService;
