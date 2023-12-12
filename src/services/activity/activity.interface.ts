export interface IActivityLogDto {
    id: string;
    jobPostId: string;
    assessmentId: string;
    activityCategoryId: string;
    activityCategoryName: string;
    collaboratorId: string;
    collaboratorDto: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        avatarUrl: string | null;
        status: string;
    };
    title: string;
    content: string;
    url: string;
    createdTime: Date;
}
