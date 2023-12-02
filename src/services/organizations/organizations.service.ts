import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";
import endpoints from "@/utils/constants/service-endpoint";

import interceptor from "../interceptor";

import {
    ICreateOrgDto,
    IEditOrganizationDto,
    IOrganizationDto,
} from "./organizations.interface";

const getByIdAsync = async (
    orgId: string
): Promise<IResponse<IOrganizationDto>> => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto>>(
            endpoints.ORGANIZATIONS + `/${orgId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const createNewOrganization = async (createNewOrgDto: ICreateOrgDto) => {
    try {
        const res = await interceptor.post(
            endpoints.ORGANIZATIONS,
            createNewOrgDto
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const editOrgProfile = async (editDto: IEditOrganizationDto) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.ORGANIZATIONS + `/${editDto.id}`,
            editDto
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const suspendOrg = async (id: string) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.ORGANIZATIONS + `/${id}/suspend`
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const reactivateOrg = async (id: string) => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            endpoints.ORGANIZATIONS + `/${id}/reactivate`
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListOrganizations = async (): Promise<
    IResponse<IOrganizationDto[]>
> => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto[]>>(
            endpoints.ORGANIZATIONS
        );

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getJoinedOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto[]>>(
            endpoints.ORGANIZATIONS + `/joined`
        );
        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getOwnedOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto[]>>(
            endpoints.ORGANIZATIONS + `/owned`
        );
        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getOwnedJoinedOrganizations = async (): Promise<
    IResponse<IOrganizationDto[]>
> => {
    try {
        const [ownedOrgRes, joinedOrgRes] = await Promise.all([
            getOwnedOrganizations(),
            getJoinedOrganizations(),
        ]);

        const orgMap = new Map<string, IOrganizationDto>();

        ownedOrgRes.data?.forEach(org => {
            if (!orgMap.has(org.id)) orgMap.set(org.id, org);
        });

        joinedOrgRes.data?.forEach(org => {
            if (!orgMap.has(org.id)) orgMap.set(org.id, org);
        });

        return {
            title: "Nothing",
            data: Array.from(orgMap.values()),
            message: "Get joined & owned orgs success",
            statusCode: 200,
            status: 200,
        };
    } catch (error) {
        throw error;
    }
};

const organizationsServices = {
    createNewOrganization,
    getListOrganizations,
    getJoinedOrganizations,
    getOwnedOrganizations,
    getByIdAsync,
    getOwnedJoinedOrganizations,
    editOrgProfile,
    suspendOrg,
    reactivateOrg,
};

export default organizationsServices;
