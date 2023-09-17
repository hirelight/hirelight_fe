export interface IJobSlice {
    title: string;
    location: string;
    description: {
        description?: string;
        requirements?: string;
        benefits?: string;
    };
    industry?: string;
    jobFunction?: string;
    employment?: {
        type?: string;
        experience?: string;
        education?: string;
        keywords?: string;
    };
    annualSalary?: {
        from?: string;
        to?: string;
        currency?: string;
    };
}

export interface IJob extends IJobSlice {
    id: string;
}

export interface ISetJob {
    title: string;
    location: string;
    description: {
        description?: string;
        requirements?: string;
        benefits?: string;
    };
    industry?: string;
    jobFunction?: string;
    employment?: {
        type?: string;
        experience?: string;
        education?: string;
        keywords?: string;
    };
    annualSalary?: {
        from?: string;
        to?: string;
        currency?: string;
    };
}
