"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ChevronDown } from "@/icons";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { useAppSelector } from "@/redux/reduxHooks";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { handleError } from "@/helpers";

import styles from "./styles.module.scss";

const MoveCandidateDialog = () => {
    const { assessmentId, candidateId, jobId, lang } = useParams();
    const router = useRouter();

    const dialogRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDialog(false)
    );
    const queryClient = useQueryClient();
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );

    const [showDialog, setShowDialog] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const moveCandidateMutation = useMutation({
        mutationFn: ({
            profileId,
            assessmentId,
        }: {
            profileId: string;
            assessmentId: string;
        }) =>
            applicantAssessmentDetailServices.moveCandidateToAssessment(
                profileId,
                assessmentId
            ),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["job-profiles", jobId],
            });
            setShowDialog(false);
            router.push(
                `/${lang}/backend/jobs/${jobId}/hiring-process/${assessmentId}`
            );
        },
        onError: () => {
            setShowDialog(false);
        },
    });

    const handleMoveCandidate = async (stageId: string, profileId: string) => {
        if (
            applicantAssessmentDetail.status ===
            ApplicantAssessmentDetailStatus.IN_PROGRESS
        )
            return toast.error("Candidate is taking the assessment");

        toast.promise(
            moveCandidateMutation.mutateAsync({
                profileId: profileId,
                assessmentId: stageId,
            }),
            {
                pending: "Moving candidate",
                success: "Move candidate success",
                error: {
                    render({ data }: any) {
                        return data.message
                            ? data.message
                            : "Move candidate failure";
                    },
                },
            }
        );
    };

    return (
        <div className="relative" ref={dialogRef}>
            <button
                type="button"
                className="p-2 bg-blue-700 hover:bg-blue-800 group transition-all duration-300 rounded-tr-md rounded-br-md"
                onClick={() => setShowDialog(!showDialog)}
            >
                <ChevronDown
                    strokeWidth={2}
                    className={`w-4 h-4 text-white transition-all duration-200 ${
                        showDialog ? "rotate-180" : ""
                    }`}
                />
            </button>

            <div
                role="dialog"
                className={`${styles.move__candidate__dialog} ${
                    showDialog ? styles.entering : ""
                }`}
            >
                <ul className="max-h-56 overflow-y-auto">
                    {assessmentFlow.assessments.map(assessment => (
                        <li key={assessment.id}>
                            <button
                                type="button"
                                className={`group w-full text-left text-sm disabled:cursor-not-allowed`}
                                disabled={
                                    assessmentId === assessment.id ||
                                    moveCandidateMutation.isPending
                                }
                                onClick={handleMoveCandidate.bind(
                                    null,
                                    assessment.id,
                                    candidateId as string
                                )}
                            >
                                <span
                                    className={`block py-2 pl-6 pr-2 group-hover:bg-blue_primary_100 whitespace-nowrap ${
                                        assessmentId === assessment.id
                                            ? "opacity-40 group-hover:bg-none"
                                            : ""
                                    }`}
                                >
                                    {assessment.name}{" "}
                                    {assessmentId === assessment.id &&
                                        "(current stage)"}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MoveCandidateDialog;
