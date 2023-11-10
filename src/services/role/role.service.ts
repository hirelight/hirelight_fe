import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";
import endpoints from "@/utils/constants/service-endpoint";

import interceptor from "../interceptor";

import { IRoleDto } from "./role.interface";

const getListAsync = async (): Promise<IResponse<IRoleDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IRoleDto[]>>(
            endpoints.ROLES
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (id: number): Promise<IResponse<IRoleDto>> => {
    try {
        const res = await interceptor.get<IResponse<IRoleDto>>(
            endpoints.ROLES + `/${id}`
        );

        checkResErr(res.data);
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
