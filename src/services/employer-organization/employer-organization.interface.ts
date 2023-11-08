import { IRoleDto } from "../role/role.interface";

export interface INewEmployerDto {
    employerEmail: string;
    roleId: number;
}

export interface IEditEmployerDto {
    employerEmail: string;
    roleId: number;
}

export interface IEmployerDto {
    id: number;
    employerId: number;
    organizationId: number;
    role: IRoleDto;
    createdTime: Date;
    updatedTime: Date;
    status: "ACTIVE";
}

export interface IEmployerInvitationDto {
    id: number;
    senderId: number;
    organizationId: number;
    organizationName: string;
    jobPostId: number;
    jobPostName: string;
    assessmentId: number;
    assessmentName: string;
    invitationTypeId: number;
    invitationTypeName: string;
    inviteeEmail: string;
    authority: string;
    createdTime: Date;
    expiredTime: Date;
}
