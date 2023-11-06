import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import {
    IAppFormTemplateDto,
    ICreateAppFormTemplateDto,
    IEditAppFormTemplateDto,
} from "./app-form-template.interface";

const baseEndpoint = "/applicationformtemplates";
class AppFormTemplateServices {
    getListAsync = async (): Promise<IResponse<IAppFormTemplateDto[]>> => {
        try {
            const res = await interceptor.get<IResponse<IAppFormTemplateDto[]>>(
                baseEndpoint + "/search",
                {
                    params: {
                        name: "Default",
                    },
                }
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);

            return res.data;
        } catch (error) {
            throw error;
        }
    };

    getByIdAsync = async (
        id: number
    ): Promise<IResponse<IAppFormTemplateDto>> => {
        try {
            const res = await interceptor.get<IResponse<IAppFormTemplateDto>>(
                baseEndpoint + `/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);

            return res.data;
        } catch (error) {
            throw error;
        }
    };

    createAsync = async (createDto: ICreateAppFormTemplateDto) => {
        try {
            const res = await interceptor.post<IResponse<any>>(
                baseEndpoint,
                createDto
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
                baseEndpoint + `/${id}`
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);

            return res.data;
        } catch (error) {
            throw error;
        }
    };

    editAsync = async (
        editDto: IEditAppFormTemplateDto
    ): Promise<IResponse<any>> => {
        try {
            const res = await interceptor.put<IResponse<any>>(
                baseEndpoint,
                editDto
            );

            if (res.data.statusCode >= 400) throw new Error(res.data.message);

            return res.data;
        } catch (error) {
            throw error;
        }
    };
}

const appFormTemplateServices = new AppFormTemplateServices();

export default appFormTemplateServices;
