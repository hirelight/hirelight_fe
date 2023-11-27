"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import AsyncVideoAssessment from "../(async-interview)/components/AsyncVideoAssessment";
import MultipleChoiceAssessment from "../(multiple-choice)/components/MultipleChoiceAssessment";
import ReviewPage from "../(async-interview)/components/ReviewPage";

const AssessmentMediation = () => {
    const { assessmentId, lang } = useParams();
    const router = useRouter();
    const { data: assessmentRes, isLoading } = useQuery({
        queryKey: [`my-assessment`, assessmentId],
        queryFn: () =>
            applicantAssessmentDetailServices.getMyInvitedAssessmentById(
                assessmentId as string
            ),
    });

    useEffect(() => {
        if (
            assessmentRes &&
            [
                ApplicantAssessmentDetailStatus.PENDING_EVALUATION,
                ApplicantAssessmentDetailStatus.EVALUATED,
            ].includes(assessmentRes.data.status)
        ) {
            router.push(`${assessmentId}/review`);
        }
    }, [assessmentId, assessmentRes, router]);

    if (isLoading || !assessmentRes)
        return (
            <div className="p-14 flex justify-center">
                <LoadingIndicator />
            </div>
        );

    return (
        <div>
            {assessmentRes.data.assessment.assessmentTypeName ===
            "MULTIPLE_CHOICE_QUESTION_ASSESSMENT" ? (
                <MultipleChoiceAssessment data={assessmentRes.data} />
            ) : (
                <AsyncVideoAssessment data={assessmentRes.data} />
            )}
        </div>
    );
};

export default AssessmentMediation;
