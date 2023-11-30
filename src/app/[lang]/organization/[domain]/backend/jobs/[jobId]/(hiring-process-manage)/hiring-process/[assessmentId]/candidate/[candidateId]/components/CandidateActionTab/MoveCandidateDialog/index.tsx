"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ChevronDown } from "@/icons";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { useAppSelector } from "@/redux/reduxHooks";
import { AssessmentTypes } from "@/interfaces/assessment.interface";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

import styles from "./styles.module.scss";

const MoveCandidateDialog = () => {
    const { assessmentId, candidateId, jobId, lang } = useParams();
    const router = useRouter();

    const dialogRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDialog(false)
    );
    const queryClient = useQueryClient();
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);

    const [showDialog, setShowDialog] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleMoveCandidate = async (stageId: string, profileId: string) => {
        setLoading(true);
        try {
            await toast.promise(
                applicantAssessmentDetailServices.moveCandidateToAssessment(
                    profileId,
                    stageId
                ),
                {
                    pending: "Moving candidate",
                    success: "Move candidate successfully!",
                }
            );

            await queryClient.invalidateQueries({
                queryKey: ["job-profiles", jobId],
            });
            router.push(
                `/${lang}/backend/jobs/${jobId}/hiring-process/${assessmentId}`
            );
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
        setLoading(false);
        setShowDialog(false);
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
            {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
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
                                    assessmentId === assessment.id || loading
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
