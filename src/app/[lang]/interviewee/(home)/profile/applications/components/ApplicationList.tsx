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
    const {
        data: queryRes,
        isLoading,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["my-applications"],
        queryFn: userData
            ? () =>
                  applicantProfileServices.getMyApplicantProfiles(
                      userData.userId
                  )
            : undefined,
    });

    const [selected, setSelected] = useState("");

    if (isLoading) return <ApplicantListSkeleton />;

    if (isError) return <div>Fetching applications failure</div>;

    return (
        <>
            <ul
                className={`space-y-6`}
                aria-live="polite"
                aria-busy={isLoading || isFetching}
            >
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

const ApplicantListSkeleton = () => {
    return (
        <ul className="space-y-4">
            {new Array(3).fill("").map((_, index) => (
                <li
                    key={index}
                    className="flex gap-4 p-4 sm:p-6 bg-white border border-gray-200 rounded-md"
                >
                    <div className="hidden md:block rounded-full w-20 h-20 bg-slate-200"></div>

                    <div className="flex-1">
                        <div className="animate-pulse">
                            <h4 className="h-6 w-36 bg-slate-200 mb-2"></h4>
                            <h3 className="h-8 w-80 bg-slate-300 mb-4"></h3>
                        </div>

                        <div className="animate-pulse flex gap-2">
                            <div className="h-5 w-20 rounded bg-slate-200"></div>
                            <div className="h-5 w-20 rounded bg-slate-200"></div>
                            <div className="h-5 w-20 rounded bg-slate-200"></div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
