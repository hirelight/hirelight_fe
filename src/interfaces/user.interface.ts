import { Roles } from "@/services";

export interface IUserInfo {
    sid: string;
    emailAddress: string;
    userId: string;
    role: Roles;
    firstName: string;
    lastName: string;
    organizationId?: string;
    organizationSubdomain?: string;
    exp: number;
}
