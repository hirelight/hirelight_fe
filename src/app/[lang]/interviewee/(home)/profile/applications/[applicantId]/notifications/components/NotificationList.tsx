"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

import NotificationCard from "./NotificationCard";

const NotificationList = () => {
    const { applicantId } = useParams();

    const { data: myAssessments } = useQuery({
        queryKey: [`my-assessments-${applicantId}`],
        queryFn: applicantAssessmentDetailServices.getMyInvitedAssessments,
    });

    console.log(myAssessments);

    return (
        <ul className="space-y-4">
            {myAssessments?.data
                ?.filter(
                    item =>
                        item.status === "INVITED" &&
                        item.applicantProfile.jobPostId === applicantId
                )
                .map((item, index) => (
                    <li key={item.id}>
                        <NotificationCard data={item} />
                    </li>
                ))}
        </ul>
    );
};

export default NotificationList;
