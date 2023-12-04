export interface IActivityLogDto {
    id: string;
    jobPostId: string;
    assessmentId: string;
    activityCategoryId: string;
    activityCategoryName: string;
    collaboratorId: 0;
    collaborator: {
        id: string;
        employerDto: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            status: string;
        };
        jobPostId: 0;
        permissions: [
            {
                permissionId: string;
                assessmentId: string;
                permissionName: string;
            },
        ];
        status: string;
    };
    title: string;
    content: string;
    url: string;
    createdTime: Date;
}
