import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    IAppFormTemplateDto,
    ICreateAppFormTemplateDto,
    IEditAppFormTemplateDto,
} from "./app-form-template.interface";

const baseEndpoint = "/applicationformtemplates";

const getListAsync = async (): Promise<IResponse<IAppFormTemplateDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IAppFormTemplateDto[]>>(
            baseEndpoint + "/search",
            {
                params: {
                    name: "Default",
                },
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (
    id: number
): Promise<IResponse<IAppFormTemplateDto>> => {
    try {
        const res = await interceptor.get<IResponse<IAppFormTemplateDto>>(
            baseEndpoint + `/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const createAsync = async (createDto: ICreateAppFormTemplateDto) => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            baseEndpoint,
            createDto
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
            baseEndpoint + `/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const editAsync = async (
    editDto: IEditAppFormTemplateDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            baseEndpoint,
            editDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const appFormTemplateServices = {
    getByIdAsync,
    getListAsync,
    editAsync,
    deleteByIdAsync,
    createAsync,
};

export default appFormTemplateServices;
