import { checkResErr } from "@/helpers";
import CustomError, { IResponse } from "@/interfaces/service.interface";

import { Roles } from "..";
import interceptor from "../interceptor";

import { IAccountDto } from "./account.interface";

const getByEmail = async (): Promise<IResponse<IAccountDto[]>> => {
    try {
        const res =
            await interceptor.get<IResponse<IAccountDto[]>>(`/accounts`);

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const suspendAccount = async (
    role: Roles,
    id: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.get<IResponse<any>>(
            `/accounts/${role}/${id}/suspend`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error: any) {
        throw new CustomError(error);
    }
};

const reactivateAccount = async (
    role: Roles,
    id: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.get<IResponse<any>>(
            `/accounts/${role}/${id}/reactivate`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const accountServices = {
    getByEmail,
    suspendAccount,
    reactivateAccount,
};

export default accountServices;
