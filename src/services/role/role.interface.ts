enum Roles {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    ASSESSOR = "ASSESSOR",
    RECRUITER = "RECRUITER",
    ORGANIZATION_ADMIN = "ORGANIZATION_ADMIN",
}

export interface IRoleDto {
    id: number;
    name: string;
    permissions: IRolePermissionDto[];
}

export interface IRolePermissionDto {
    id: number;
    name: string;
}
