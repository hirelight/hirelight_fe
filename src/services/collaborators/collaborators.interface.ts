export interface ISendCollabInvitationDto {
    employerId: number;
    permissions: [
        {
            permissionId: number;
            assessmentId: number;
            permissionName: string;
        },
    ];
}
