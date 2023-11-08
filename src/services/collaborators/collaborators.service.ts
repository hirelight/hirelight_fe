import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

const sendInvitation = async (): Promise<IResponse<any[]>> => {
    try {
        const res = await interceptor.get(endpoints.JOBPOSTS_PERMISSION);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getPermissionById = async (id: number): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.get(endpoints.PERMISSION + `/${id}`);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const collaboratorsServices = {
    sendInvitation,
    getPermissionById,
};

export default collaboratorsServices;
