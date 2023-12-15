"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";
import { IUserInfo } from "@/interfaces/user.interface";
import { useAppSelector } from "@/redux/reduxHooks";

import ApplicationCard from "./ApplicationCard";
import FeedbackModal from "./FeedbackModal";

const ApplicantList = () => {
    const userData = useAppSelector(state => state.auth.authUser);
    const { data: queryRes } = useQuery({
        queryKey: ["my-applications"],
        queryFn: userData
            ? () =>
                  applicantProfileServices.getMyApplicantProfiles(
                      userData.userId
                  )
            : undefined,
    });

    const [selected, setSelected] = useState("");

    return (
        <>
            <ul className="space-y-6">
                {queryRes?.data?.map(applicant => (
                    <li key={applicant.id}>
                        <ApplicationCard
                            data={applicant}
                            onSelect={applicantProfileId =>
                                setSelected(applicantProfileId)
                            }
                        />
                    </li>
                ))}
            </ul>
            <FeedbackModal
                isOpen={selected !== ""}
                closeModal={() => setSelected("")}
                applicantProfileId={selected}
            />
        </>
    );
};

export default ApplicantList;
