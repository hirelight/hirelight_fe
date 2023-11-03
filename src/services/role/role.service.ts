import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import { IRoleDto } from "./role.interface";

const baseEndpoint = "/roles";

const getListAsync = async (): Promise<IResponse<IRoleDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IRoleDto[]>>(baseEndpoint);

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (id: number): Promise<IResponse<IRoleDto>> => {
    try {
        const res = await interceptor.get<IResponse<IRoleDto>>(
            baseEndpoint + `/${id}`
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const roleServices = {
    getListAsync,
    getByIdAsync,
};

export default roleServices;
