export interface IJobDetail extends INewJobDto {
    id?: string;
}

export interface INewJobDto {
    title: string;
    location: string;
    content: {
        description?: string;
        requirements?: string;
        benefits?: string;
    };
    workModality?: string;
    area?: string;
    experience?: string;
    status?: string;
    createdTime?: Date;
    updatedTime?: Date;
}

export interface IUpdateJobDto {
    id: string;
    title: string;
    location: string;
    content: {
        description?: string;
        requirements?: string;
        benefits?: string;
    };
    workModality?: string;
    area?: string;
    experience?: string;
    status?: string;
    createdTime?: Date;
    updatedTime?: Date;
}
