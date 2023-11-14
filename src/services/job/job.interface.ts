export interface ICreateJobDto {
    title: string;
    content: string;
    applicationForm: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    startTime: Date;
    endTime: Date;
    area: string;
    experience: string;
    workModality: string;
}

export interface JobContentJson {
    description: string;
    requirements: string;
    benefits: string;
}

export interface IJobDto extends ICreateJobDto {
    id: string;
    creatorId: string;
    assessmentFlowId: string | null;
    organizationId: string;
    employmentType: string;
    keywords: string;
    createdTime: Date;
    updatedTime: Date;
    status: string;
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

export interface IEditJobDto {
    id: string;
    title: string;
    content: string;
    applicationForm: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    startTime: Date;
    endTime: Date;
    area: string;
    experience: string;
    workModality: string;
}
