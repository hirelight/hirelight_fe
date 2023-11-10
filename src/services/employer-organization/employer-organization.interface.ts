import { IRoleDto } from "../role/role.interface";

export interface INewEmployerDto {
    employerEmail: string;
    roleId: number;
}

export interface IOrgEmployerDto {
    id: number;
    employerDto: {
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        status: string;
    };
    organizationId: number;
    role: {
        id: number;
        name: string;
        permissions: [
            {
                id: number;
                name: string;
            },
        ];
    };
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export interface IEditEmployerDto {
    employerEmail: string;
    roleId: number;
}

export interface IEmployerInvitationDto {
    id: number;
    senderId: number;
    organizationId: number;
    organizationName: string;
    organizationSubdomain: string;
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
