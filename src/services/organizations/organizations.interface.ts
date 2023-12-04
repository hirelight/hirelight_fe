export interface ICreateOrgDto {
    name: string;
    subdomain: string;
}

export interface IOrganizationDto {
    id: string;
    name: string;
    subdomain: string;
    logoUrl: string | null;
    description: string | null;
    introduction: string | null;
    industry: string | null;
    numberOfEmployees: number | null;
    nationality: string | null;
    address: string | null;
    location: string | null;
    ownerId: string;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: string;
}

export interface IEditOrganizationDto {
    id: string;
    name: string;
    subdomain: string;
    logoUrl: string;
    description: string;
    introduction: string;
    industry: string;
    numberOfEmployees: number;
    nationality: string;
    address: string;
    location: string;
}
