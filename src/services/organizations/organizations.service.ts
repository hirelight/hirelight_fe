import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    ICreateOrgDto,
    IOrgEmployerDto,
    IOrganizationDto,
} from "./organizations.interface";

const getByIdAsync = async (
    orgId: number
): Promise<IResponse<IOrganizationDto>> => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto>>(
            "/organizations" + `/${orgId}`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const createNewOrganization = async (createNewOrgDto: ICreateOrgDto) => {
    try {
        const res = await interceptor.post(`/organizations`, createNewOrgDto);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getListOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse<any>>(`/organizations`);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getJoinedOrganizations = async () => {
    try {
        const res = await interceptor.get<IResponse<IOrganizationDto[]>>(
            `/organizations/joined`
        );
        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getOwnedOrganizations = async () => {
    try {
        const res =
            await interceptor.get<IResponse<IOrganizationDto[]>>(
                `/organizations/owned`
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

        const orgMap = new Map<number, IOrganizationDto>();

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

const getListEmloyers = async (): Promise<IResponse<IOrgEmployerDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<IOrgEmployerDto[]>>(
            `/organizations/employers`
        );

        return res.data;
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
    getListEmloyers,
};

export default organizationsServices;
