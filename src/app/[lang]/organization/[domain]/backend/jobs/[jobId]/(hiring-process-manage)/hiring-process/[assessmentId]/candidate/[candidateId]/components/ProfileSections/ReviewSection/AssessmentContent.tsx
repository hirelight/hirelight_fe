import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { IJobPostAppAssDetailDto } from "@/services";
import { defaultAsessment } from "@/interfaces/assessment.interface";

import ResultPreview from "./ResultPreview";

const AssessmentContent = () => {
    const { candidateId, assessmentId, jobId } = useParams();

    const applicantDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );
    const assessment = useAppSelector(
        state =>
            state.assessmentFlow.data.assessments.find(
                assessment => assessment.id === assessmentId
            )!!
    );

    const { data: profileResults } = useQuery({
        queryKey: ["profile-results", candidateId],
        queryFn: () =>
            applicantAssessmentDetailServices.employeeGetApplicantAssessDetailsList(
                applicantDetail.applicantProfile.candidateId,
                jobId as string
            ),
    });

    return (
        <div className="mt-8 space-y-4">
            {profileResults?.data
                ?.filter(
                    detail =>
                        !defaultAsessment.includes(
                            detail.assessment.assessmentTypeName
                        )
                )
                .map(detail => (
                    <div key={detail.id}>
                        <AssessmentCard data={detail} />
                    </div>
                ))}
        </div>
    );
};

export default AssessmentContent;

const AssessmentCard = ({ data }: { data: IJobPostAppAssDetailDto }) => {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <>
            <ResultPreview
                data={data}
                isOpen={showPreview}
                close={() => setShowPreview(false)}
            />

            <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4 relative">
                <h4 className="text-base font-semibold">
                    {data.assessment.name}
                </h4>
                <button type="button" onClick={() => setShowPreview(true)}>
                    <EyeIcon className="text-neutral-700 w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2" />
                </button>
            </div>
        </>
    );
};
