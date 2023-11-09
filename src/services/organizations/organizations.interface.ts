export interface ICreateOrgDto {
    name: string;
    subdomain: string;
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

export interface IOrgEmployerDto {
    id: number;
    employerDto: {
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        status: string;
    };
    organizationId: number;
    role: {
        id: number;
        name: string;
        permissions: [
            {
                id: number;
                name: string;
            },
        ];
    };
    createdTime: Date;
    updatedTime: Date;
    status: string;
}
