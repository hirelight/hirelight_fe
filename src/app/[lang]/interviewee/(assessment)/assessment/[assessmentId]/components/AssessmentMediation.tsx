"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import LoadingIndicator from "@/components/LoadingIndicator";

import AsyncVideoAssessment from "../(async-interview)/components/AsyncVideoAssessment";
import MultipleChoiceAssessment from "../(multiple-choice)/components/MultipleChoiceAssessment";

const AssessmentMediation = () => {
    const { assessmentId } = useParams();
    const { data: assessmentRes, isLoading } = useQuery({
        queryKey: [`my-assessment-${assessmentId}`],
        queryFn: () =>
            applicantAssessmentDetailServices.getMyInvitedAssessmentById(
                assessmentId as string
            ),
    });

    console.log(assessmentRes);

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
                <AsyncVideoAssessment />
            )}
        </div>
    );
};

export default AssessmentMediation;
