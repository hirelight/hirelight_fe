"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useUserInfo } from "@/hooks/useUserInfo";
import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";
import { IUserInfo } from "@/interfaces/user.interface";

import ApplicationCard from "./ApplicationCard";

const ApplicantList = () => {
    const userData = useUserInfo<IUserInfo>();
    const { data: queryRes } = useQuery({
        queryKey: ["my-applications"],
        queryFn: () =>
            applicantProfileServices.getMyApplicantProfiles(userData!!.userId),
    });

    return (
        <ul className="space-y-6">
            {queryRes?.data?.map(applicant => (
                <li key={applicant.id}>
                    <ApplicationCard data={applicant} />
                </li>
            ))}
        </ul>
    );
};

export default ApplicantList;
