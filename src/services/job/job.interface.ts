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
    minSalary?: string;
    maxSalary?: string;
    currency?: string;
    status?: string;
    startTime?: Date;
    endTime?: Date;
    createdTime?: Date;
    updatedTime?: Date;
}

export interface IJobDetailError {
    titleErr: string;
    locationErr: string;
    contentErr: {
        descriptionErr?: string;
        requirementsErr?: string;
        benefitsErr?: string;
    };
    workModalityErr?: string;
    areaErr?: string;
    experienceErr?: string;
    minSalaryErr?: string;
    maxSalaryErr?: string;
    currencyErr?: string;
    statusErr?: string;
    startTimeErr?: Date;
    endTimeErr?: Date;
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
