export enum Roles {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    ASSESSOR = "ASSESSOR",
    RECRUITER = "RECRUITER",
    ORGANIZATION_ADMIN = "ORGANIZATION_ADMIN",
}

export interface IRoleDto {
    id: string;
    name: string;
    permissions: IRolePermissionDto[];
}

export interface IRolePermissionDto {
    id: string;
    name: string;
}
