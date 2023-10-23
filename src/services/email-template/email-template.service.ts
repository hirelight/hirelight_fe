import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import {
    ICreateEmailTemplatesDto,
    IEditEmailTemplatesDto,
    IEmailTemplatesDto,
} from "./email-template.interface";

const createEmailTemplate = async (
    createEmailTemplatesDto: ICreateEmailTemplatesDto
) => {
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

const getEmailTemplates = async () => {
    try {
        const res = await interceptor.get<IResponse<IEmailTemplatesDto[]>>(
            endpoints.EMAIL_TEMPLATE
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getEmailTemplatesById = async (id: string) => {
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

const editEmailTemplates = async (
    templateId: string,
    updateEmailTemplateDto: IEditEmailTemplatesDto
) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            `${endpoints.EMAIL_TEMPLATE}/${templateId}`,
            updateEmailTemplateDto
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteEmailTemplateById = async (id: string) => {
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

const emailTemplateService = {
    createEmailTemplate,
    getEmailTemplates,
    editEmailTemplates,
    deleteEmailTemplateById,
    getEmailTemplatesById,
};

export default emailTemplateService;
