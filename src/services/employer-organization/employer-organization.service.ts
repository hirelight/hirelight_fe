import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import {
    IEditEmployerDto,
    IEmployerDto,
    INewEmployerDto,
} from "./employer-organization.interface";

const baseEndpoint = "/organizations/employers";

const getListAsync = async (): Promise<IResponse<IEmployerDto[]>> => {
    try {
        const res =
            await interceptor.get<IResponse<IEmployerDto[]>>(baseEndpoint);

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (id: number) => {
    try {
        const res = await interceptor.get<IResponse<IEmployerDto>>(
            baseEndpoint + `/${id}`
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteByIdAsync = async (id: number) => {
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

const inviteEmployerAsync = async (newEmployerDto: INewEmployerDto) => {
    try {
        const res = await interceptor.post<IResponse<any>>(
            baseEndpoint + "/invitation",
            newEmployerDto
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const editEmployerAsync = async (editEmployerDto: IEditEmployerDto) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            baseEndpoint,
            editEmployerDto
        );

        if (res.data.statusCode >= 400) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const employerOrgServices = {
    getListAsync,
    inviteEmployerAsync,
    getByIdAsync,
    deleteByIdAsync,
    editEmployerAsync,
};

export default employerOrgServices;
