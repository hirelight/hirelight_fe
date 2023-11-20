import { IResponse } from "@/interfaces/service.interface";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";
import { IIntegrationDto } from "..";

const getList = async (): Promise<IResponse<IIntegrationDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IIntegrationDto[]>>(
            endpoints.THIRDPARTY_TOKENS
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getById = async (id: string): Promise<IResponse<IIntegrationDto>> => {
    try {
        const res = await interceptor.get<IResponse<IIntegrationDto>>(
            endpoints.THIRDPARTY_TOKENS + `/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const createNew = async (createDto: any): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            endpoints.THIRDPARTY_TOKENS,
            createDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const edit = async (editDto: any): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.THIRDPARTY_TOKENS + `/${editDto.id}`,
            editDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteById = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            endpoints.THIRDPARTY_TOKENS + `/${id}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const integrationServices = {
    getList,
    getById,
    edit,
    createNew,
    deleteById,
};

export default integrationServices;
