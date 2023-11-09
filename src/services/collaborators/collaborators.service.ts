import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";

import { ISendCollabInvitationDto } from "./collaborators.interface";

const baseEndpoint = "/job-posts";

const sendInvitation = async (
    invitation: ISendCollabInvitationDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.post(
            baseEndpoint + `/${invitation.jobPostId}/collaborators/invitation`,
            invitation
        );

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
