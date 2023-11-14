import { IRoleDto } from "../role/role.interface";

export interface INewEmployerDto {
    employerEmail: string;
    roleId: string;
}

export interface IOrgEmployerDto {
    id: string;
    employerDto: {
        id: string;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        status: string;
    };
    organizationId: string;
    role: {
        id: string;
        name: string;
        permissions: [
            {
                id: string;
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
    roleId: string;
}

export interface IEmployerInvitationDto {
    id: string;
    senderId: string;
    organizationId: string;
    organizationName: string;
    organizationSubdomain: string;
    jobPostId: string;
    jobPostName: string;
    assessmentId: string;
    assessmentName: string;
    invitationTypeId: string;
    invitationTypeName: string;
    inviteeEmail: string;
    authority: string;
    createdTime: Date;
    expiredTime: Date;
}
