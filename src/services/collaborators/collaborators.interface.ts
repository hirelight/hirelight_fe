export interface ISendCollabInvitationDto {
    jobPostId: number;
    employerId: number;
    permissions: {
        permissionId: number;
        assessmentId?: number;
        permissionName: string;
    }[];
}
