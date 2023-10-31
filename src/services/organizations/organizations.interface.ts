export interface ICreateOrgDto {
    name: string;
    domain: string;
}

export interface IOrganizationDto {
    id: number;
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
    ownerId: number;
}
