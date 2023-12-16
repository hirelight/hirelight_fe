"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import NotificationCard from "./NotificationCard";

const NotificationList = () => {
    const { applicantId } = useParams();

    const {
        data: myAssessments,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: [`my-assessments`, applicantId],
        queryFn: applicantAssessmentDetailServices.getMyInvitedAssessments,
        select(data) {
            return {
                ...data,
                data: data.data.filter(
                    item =>
                        (!["MOVED", "IDLE"].includes(item.status) ||
                            (item.status === "MOVED" && item.result)) &&
                        item.applicantProfile.jobPostId === applicantId &&
                        [
                            "ASYNC_VIDEO_INTERVIEW_ASSESSMENT",
                            "MULTIPLE_CHOICE_QUESTION_ASSESSMENT",
                        ].includes(item.assessment.assessmentTypeName)
                ),
            };
        },
    });

    if (isLoading) return <NotificationListSkeleton />;

    return (
        <ul
            className={`space-y-4`}
            aria-live="polite"
            aria-busy={isLoading || isFetching}
        >
            {myAssessments?.data.map(item => (
                <li key={item.id}>
                    <NotificationCard data={item} />
                </li>
            ))}
        </ul>
    );
};

export default NotificationList;

const NotificationListSkeleton = () => {
    return (
        <ul className="space-y-4">
            {new Array(3).fill("").map((_, index) => (
                <li
                    key={index}
                    className="p-6 bg-white rounded-md drop-shadow-lg "
                >
                    <div className="animate-pulse flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-slate-200"></div>
                        <div className="flex-1">
                            <div className="text-lg font-semibold mb-1">
                                <div className="inline-block h-6 w-28 rounded bg-slate-300"></div>
                                <div className="inline-block ml-4 w-10 h-5 rounded bg-slate-200"></div>
                            </div>
                            <p className="h-6 w-14 rounded bg-slate-200"></p>
                        </div>
                        <div className="w-12 h-8 rounded bg-slate-200"></div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
