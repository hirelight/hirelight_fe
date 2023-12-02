import { Roles } from "..";

export interface IAccountDto {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    status: string;
    role: Roles;
}
