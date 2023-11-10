export interface ISendCollabInvitationDto {
    jobPostId: number;
    employerId: number;
    permissions: {
        permissionId: number;
        assessmentId?: number;
        permissionName: string;
    }[];
}

export interface ICollabPermission {
    permissionId: number;
    assessmentId?: number;
    permissionName: string;
}
export interface IEditCollaboratorDto {
    jobPostId: number;
    employerId: number;
    permissions: ICollabPermission[];
}

export interface ICollaboratorDto {
    id: number;
    employerDto: {
        id: number;
        email: string;
        username: string | null;
        firstName: string;
        lastName: string | null;
        status: string;
    };
    jobPostId: number;
    status: string;
    permissions: ICollabPermission[];
}
