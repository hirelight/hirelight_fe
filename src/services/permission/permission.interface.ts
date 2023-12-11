export interface IPermissionDto {
    id: string;
    name: string;
    assessmentId: string;
}

export const AllowedPermissions = [
    "UPDATE_JOB_POST",
    "CREATE_UPDATE_ASSESSMENT_FLOW",
    "UPDATE_ASSESSMENT",
    "UPDATE_APPLICANT_STATUS",
];
