import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IResponse } from "@/interfaces/service.interface";

import interceptor from "../interceptor";
import { IEmployerInvitationDto } from "..";

import {
    IAssignAssessorDto,
    ICollaboratorDto,
    IEditCollaboratorDto,
    ISendCollabInvitationDto,
    IUnassignAssessorDto,
} from "./collaborators.interface";

const baseEndpoint = "/job-posts";

const getCollaboratorList = async (
    jobPostId: string
): Promise<IResponse<ICollaboratorDto[]>> => {
    try {
        const res = await interceptor.get<IResponse<ICollaboratorDto[]>>(
            baseEndpoint + `/${jobPostId}/collaborators`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getCollaboratorById = async (
    jobPostId: string,
    memberId: string
): Promise<IResponse<ICollaboratorDto>> => {
    try {
        const res = await interceptor.get<IResponse<ICollaboratorDto>>(
            baseEndpoint + `/${jobPostId}/collaborators/${memberId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const editCollaborator = async (
    editDto: IEditCollaboratorDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            baseEndpoint + `/${editDto.jobPostId}/collaborators`,
            editDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const deleteCollaborator = async (
    jobPostId: string,
    memberId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.delete<IResponse<any>>(
            baseEndpoint + `/${jobPostId}/collaborators/${memberId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const acceptJobCollabInvitation = async (
    jobPostId: string
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            baseEndpoint + `/${jobPostId}/collaborators/invitation`
        );

        checkResErr(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const getCollabInvitations = async (): Promise<
    IResponse<IEmployerInvitationDto[]>
> => {
    try {
        const res = await interceptor.get<IResponse<IEmployerInvitationDto[]>>(
            baseEndpoint + `/1/collaborators/user-invitation`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

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

const getPermissionById = async (id: string): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.get(endpoints.PERMISSION + `/${id}`);

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const assignAssessor = async (
    assignDto: IAssignAssessorDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            baseEndpoint + `/${assignDto.jobPostId}/collaborators/assign`,
            {
                assessmentId: assignDto.assessmentId,
                employerIds: assignDto.employerIds,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const unAssignAssessor = async (
    unassignDto: IUnassignAssessorDto
): Promise<IResponse<any>> => {
    try {
        const res = await interceptor.put<IResponse<any>>(
            baseEndpoint + `/${unassignDto.jobPostId}/collaborators/unassign`,
            {
                assessmentId: unassignDto.assessmentId,
                employerIds: unassignDto.employerIds,
            }
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const collaboratorsServices = {
    getCollaboratorList,
    getCollaboratorById,
    editCollaborator,
    deleteCollaborator,
    acceptJobCollabInvitation,
    sendInvitation,
    getPermissionById,
    getCollabInvitations,
    assignAssessor,
    unAssignAssessor,
};

export default collaboratorsServices;
