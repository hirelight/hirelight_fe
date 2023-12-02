import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { IJobPostAppAssDetailDto } from "@/services";
import {
    ApplicantAssessmentDetailStatus,
    defaultAsessment,
} from "@/interfaces/assessment.interface";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";

import ResultPreview from "./ResultPreview";

const AssessmentContent = () => {
    const { candidateId, jobId } = useParams();

    const applicantDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );

    const { data: profileResults, isLoading } = useQuery({
        queryKey: ["profile-results", candidateId],
        queryFn: () =>
            applicantAssessmentDetailServices.employeeGetApplicantAssessDetailsList(
                applicantDetail.applicantProfile.candidateId,
                jobId as string
            ),
    });

    if (isLoading) return <AssessmentSkeleton />;

    return (
        <div className="mt-8 space-y-4">
            {profileResults?.data
                ?.filter(
                    detail =>
                        !defaultAsessment.includes(
                            detail.assessment.assessmentTypeName
                        ) &&
                        detail.questionAnswerSet &&
                        ![
                            ApplicantAssessmentDetailStatus.INVITED,
                            ApplicantAssessmentDetailStatus.IN_PROGRESS,
                        ].includes(detail.status)
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

            <div className="py-4 border-b border-gray-300 flex gap-4 relative">
                <div className="w-6 h-6">
                    {getIconBaseOnAssessmentType(
                        data.assessment.assessmentTypeName
                    )}
                </div>
                <h4 className="text-base font-semibold">
                    {data.assessment.name}
                </h4>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    {data.assessment.assessmentTypeName !==
                    "THIRD_PARTY_ASSESSMENT" ? (
                        <button
                            type="button"
                            onClick={() => setShowPreview(true)}
                        >
                            <EyeIcon className="text-neutral-700 w-6 h-6" />
                        </button>
                    ) : (
                        <Link
                            target="_blank"
                            href={
                                JSON.parse(data.questionAnswerSet)
                                    .assessmentReport ?? "#"
                            }
                            title="Integration result"
                            className="text-sm font-semibold text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                        >
                            Report
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

const AssessmentSkeleton = () => {
    return (
        <div className="mt-8 space-y-4">
            {new Array(3).fill("").map((_, index) => (
                <div
                    key={index}
                    className="py-4 animate-pulse flex justify-between"
                >
                    <h4 className="h-8 w-80 bg-slate-300"></h4>
                    <div className="h-6 w-16 bg-slate-200"></div>
                </div>
            ))}
        </div>
    );
};
