export interface ISendCollabInvitationDto {
    jobPostId: string;
    employerId: string;
    permissions: {
        permissionId: string;
        assessmentId?: string;
        permissionName: string;
    }[];
}

export interface ICollabPermission {
    permissionId: string;
    assessmentId?: string;
    permissionName: string;
}
export interface IEditCollaboratorDto {
    jobPostId: string;
    employerId: string;
    permissions: ICollabPermission[];
}

export interface ICollaboratorDto {
    id: string;
    employerDto: {
        id: string;
        email: string;
        firstName: string;
        lastName: string | null;
        status: string;
        avatarUrl: string;
    };
    jobPostId: string;
    status: string;
    permissions: ICollabPermission[];
}
