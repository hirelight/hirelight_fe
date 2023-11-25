"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import NotificationCard from "./NotificationCard";

const NotificationList = () => {
    const { applicantId } = useParams();

    const { data: myAssessments } = useQuery({
        queryKey: [`my-assessments`, applicantId],
        queryFn: applicantAssessmentDetailServices.getMyInvitedAssessments,
    });

    return (
        <ul className="space-y-4">
            {myAssessments?.data
                ?.filter(
                    item =>
                        (!["MOVED", "IDLE"].includes(item.status) ||
                            (item.status === "MOVED" && item.result)) &&
                        item.applicantProfile.jobPostId === applicantId
                )
                .map(item => (
                    <li key={item.id}>
                        <NotificationCard data={item} />
                    </li>
                ))}
        </ul>
    );
};

export default NotificationList;
