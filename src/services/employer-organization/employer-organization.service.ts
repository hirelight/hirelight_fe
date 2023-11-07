import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

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

        checkResErr(res.data);
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

        checkResErr(res.data);
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

        checkResErr(res.data);
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

        checkResErr(res.data);
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

        checkResErr(res.data);
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
