import endpoints from "@/utils/constants/service-endpoint";
import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    ICreateEmailTemplatesDto,
    IEditEmailTemplatesDto,
    IEmailTemplateTypeDto,
    IEmailTemplatesDto,
} from "./email-template.interface";

const createAsync = async (
    createEmailTemplatesDto: ICreateEmailTemplatesDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `${endpoints.EMAIL_TEMPLATE}`,
            createEmailTemplatesDto
        );
        console.log(res);
        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListAsync = async (): Promise<IResponse<IEmailTemplatesDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IEmailTemplatesDto[]>>(
            endpoints.EMAIL_TEMPLATE
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (
    id: number
): Promise<IResponse<IEmailTemplatesDto>> => {
    try {
        const res = await interceptor.get<IResponse<IEmailTemplatesDto>>(
            `${endpoints.EMAIL_TEMPLATE}/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editAsync = async (
    editEmailTemplateDto: IEditEmailTemplatesDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            `${endpoints.EMAIL_TEMPLATE}`,
            editEmailTemplateDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteByIdAsync = async (id: number): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            `${endpoints.EMAIL_TEMPLATE}/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getEmailTemplateTypesListAsync = async (): Promise<
    IResponse<IEmailTemplateTypeDto[]>
> => {
    try {
        const res = await interceptor.get<IResponse<IEmailTemplateTypeDto[]>>(
            `${endpoints.EMAIL_TEMPLATE_TYPES}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getEmailTemplateTypesByIdAsync = async (
    id: number
): Promise<IResponse<IEmailTemplateTypeDto>> => {
    try {
        const res = await interceptor.get<IResponse<IEmailTemplateTypeDto>>(
            `${endpoints.EMAIL_TEMPLATE_TYPES}/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const emailTemplateService = {
    createAsync,
    getListAsync,
    getByIdAsync,
    editAsync,
    deleteByIdAsync,
    getEmailTemplateTypesListAsync,
    getEmailTemplateTypesByIdAsync,
};

export default emailTemplateService;
