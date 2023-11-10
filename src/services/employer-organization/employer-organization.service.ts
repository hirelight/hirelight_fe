import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";
import endpoints from "@/utils/constants/service-endpoint";

import interceptor from "../interceptor";

import {
    IEditEmployerDto,
    IEmployerInvitationDto,
    INewEmployerDto,
    IOrgEmployerDto,
} from "./employer-organization.interface";

const getListAsync = async (): Promise<IResponse<IOrgEmployerDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IOrgEmployerDto[]>>(
            endpoints.ORGANIZATIONS_EMPLOYER
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getByIdAsync = async (id: number) => {
    try {
        const res = await interceptor.get<IResponse<IOrgEmployerDto>>(
            endpoints.ORGANIZATIONS_EMPLOYER + `/${id}`
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
            endpoints.ORGANIZATIONS_EMPLOYER + `/${id}`
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
            endpoints.ORGANIZATIONS_EMPLOYER + "/invitation",
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
            endpoints.ORGANIZATIONS_EMPLOYER,
            editEmployerDto
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getInternalInvitationsList = async (): Promise<
    IResponse<IEmployerInvitationDto[]>
> => {
    try {
        const res = await interceptor.get<IResponse<IEmployerInvitationDto[]>>(
            endpoints.ORGANIZATIONS_EMPLOYER + "/invitation"
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getEmployerInvitationListAsync = async (): Promise<
    IResponse<IEmployerInvitationDto[]>
> => {
    try {
        const res = await interceptor.get<IResponse<IEmployerInvitationDto[]>>(
            endpoints.ORGANIZATIONS_EMPLOYER + "/user-invitation"
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const acceptEmployerInvitationListAsync = async (
    orgId: number
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.ORGANIZATIONS_EMPLOYER + "/invitation/" + orgId
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
    getEmployerInvitationListAsync,
    acceptEmployerInvitationListAsync,
    getInternalInvitationsList,
};

export default employerOrgServices;
