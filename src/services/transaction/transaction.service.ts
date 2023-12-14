import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import {
    ICreatePaymentDto,
    IPaymentResponse,
    IPlanDto,
    ITracsactionDto,
} from "..";
import interceptor from "../interceptor";

const createPayment = async (
    createPaymentDto: ICreatePaymentDto
): Promise<IResponse<IPaymentResponse>> => {
    try {
        const res = await interceptor.post<IResponse<IPaymentResponse>>(
            "transactiondetail/createPayment",
            createPaymentDto
        );

        console.log(res);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getPlans = async (): Promise<IResponse<IPlanDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IPlanDto[]>>(
            "transactiondetail/all/plans"
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getLatestTransaction = async (
    orgId: string
): Promise<IResponse<ITracsactionDto>> => {
    try {
        const res = await interceptor.get<IResponse<ITracsactionDto>>(
            `transactiondetail/latest/organization/${orgId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getById = async (id: string): Promise<IResponse<ITracsactionDto>> => {
    try {
        const res = await interceptor.get<IResponse<ITracsactionDto>>(
            `transactiondetail/${id}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListTransactionByOrgId = async (
    orgId: string
): Promise<IResponse<ITracsactionDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<ITracsactionDto[]>>(
            `transactiondetail/search/organization/${orgId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListTransaction = async (): Promise<IResponse<ITracsactionDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<ITracsactionDto[]>>(
            `transactiondetail/all`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const transactionServices = {
    createPayment,
    getLatestTransaction,
    getPlans,
    getById,
    getListTransactionByOrgId,
    getListTransaction,
};

export default transactionServices;
