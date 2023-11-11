import { IResponse } from "@/interfaces/service.interface";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import interceptor from "../interceptor";

import {
    IApplyJobDto,
    IJobPostProfileDto,
} from "./applicant-profile.interface";

const applyJob = async (applyDto: IApplyJobDto): Promise<IResponse<number>> => {
    try {
        const res = await interceptor.post(
            endpoints.APPLICANT_PROFILES,
            applyDto
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getJobPostProfiles = async (
    jobpostId: string
): Promise<IResponse<IJobPostProfileDto[]>> => {
    try {
        const res = await interceptor.get(
            endpoints.APPLICANT_PROFILES + `/search/jobpost/${jobpostId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const getJobPostProfileById = async (
    candidateId: string
): Promise<IResponse<IJobPostProfileDto[]>> => {
    try {
        const res = await interceptor.get(
            endpoints.APPLICANT_PROFILES + `/search/candidate/${candidateId}`
        );

        checkResErr(res.data);

        return res.data;
    } catch (error) {
        throw error;
    }
};

const applicantProfileServices = {
    applyJob,
    getJobPostProfiles,
    getJobPostProfileById,
};

export default applicantProfileServices;
