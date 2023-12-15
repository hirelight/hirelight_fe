"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import LoadingIndicator from "@/components/LoadingIndicator";

import MCQReviewPage from "./MSQReview";

const AsyncReviewPageNoSSR = dynamic(() => import("./AsyncReview"), {
    ssr: false,
});

const ReviewMediation = () => {
    const { assessmentId } = useParams();
    const { data: assessmentRes, isLoading } = useQuery({
        queryKey: [`my-assessment`, assessmentId],
        queryFn: () =>
            applicantAssessmentDetailServices.getMyInvitedAssessmentById(
                assessmentId as string
            ),
    });

    if (isLoading || !assessmentRes)
        return (
            <div className="p-14 flex justify-center">
                <LoadingIndicator />
            </div>
        );

    return (
        <div>
            {assessmentRes.data.assessment.assessmentTypeName ===
            "ASYNC_VIDEO_INTERVIEW_ASSESSMENT" ? (
                <AsyncReviewPageNoSSR data={assessmentRes.data as any} />
            ) : assessmentRes.data.assessment.assessmentTypeName ===
                  "MULTIPLE_CHOICE_QUESTION_ASSESSMENT" &&
              assessmentRes.data.result !== null ? (
                <MCQReviewPage data={assessmentRes.data} />
            ) : (
                <div>Review page</div>
            )}
        </div>
    );
};

export default ReviewMediation;
