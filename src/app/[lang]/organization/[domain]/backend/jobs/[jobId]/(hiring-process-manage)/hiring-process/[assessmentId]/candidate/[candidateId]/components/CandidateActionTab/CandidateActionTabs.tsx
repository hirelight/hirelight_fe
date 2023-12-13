"use client";

import React, { useMemo, useRef, useState } from "react";
import {
    EllipsisHorizontalIcon,
    EnvelopeIcon,
    HandRaisedIcon,
    ChatBubbleOvalLeftIcon,
    PencilSquareIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import {
    CalendarDaysIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { useAppSelector } from "@/redux/reduxHooks";
import meetingServices from "@/services/meeting/meeting.service";
import { handleError } from "@/helpers";
import { DeleteModal, Portal, WarningModal } from "@/components";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import MoveCandidateDialog from "./MoveCandidateDialog";
import styles from "./CandidateActionTabs.module.scss";
import ActionDrawer from "./ActionDrawer";

const Tooltip = dynamic(
    () => import("flowbite-react").then(mod => mod.Tooltip),
    {
        ssr: false,
        loading: () => (
            <div className="w-8 h-8 rounded-md animate-pulse bg-slate-200"></div>
        ),
    }
);
const CandidateActionTabs = () => {
    const { assessmentId, jobId, lang, candidateId } = useParams();
    const router = useRouter();

    const queryClient = useQueryClient();

    const [showDrawer, setShowDrawer] = React.useState(false);

    const [sendLoading, setSendLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDisqualify, setShowDisqualify] = useState(false);
    const [moveWarning, setMoveWarning] = useState(false);
    const assessments = useAppSelector(
        state => state.assessmentFlow.data.assessments
    );
    const nextAssesment = useMemo(
        () =>
            assessments[
                assessments.findIndex(val => val.id === assessmentId) ===
                assessments.length - 1
                    ? assessments.findIndex(val => val.id === assessmentId)
                    : assessments.findIndex(val => val.id === assessmentId) + 1
            ],
        [assessmentId, assessments]
    );
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );
    const isDisqualified = useMemo(
        () =>
            applicantAssessmentDetail.applicantProfile.status ===
            "DISQUALIFIED",
        [applicantAssessmentDetail]
    );

    const disqualifyMutate = useMutation({
        mutationKey: [
            "disqualify",
            applicantAssessmentDetail.applicantProfileId,
        ],
        mutationFn: (id: string) =>
            applicantAssessmentDetailServices.disqualifyCandidate(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["job-profiles", jobId],
            });
            router.push(
                `/${lang}/backend/jobs/${jobId}/hiring-process/${assessmentId}`
            );
        },
        onError: err => {
            toast.error(err.message);
        },
    });

    const handleSendAssessment = async () => {
        if (
            applicantAssessmentDetail.status ===
            ApplicantAssessmentDetailStatus.INVITED
        )
            return toast.info("Assessment has already sent!");
        setSendLoading(true);
        try {
            await toast.promise(
                applicantAssessmentDetailServices.sendAssessment(
                    applicantAssessmentDetail.id
                ),
                {
                    pending: "Sending assessment to candidate",
                    success: "Send assessment successfully!",
                }
            );
        } catch (error: any) {
            handleError(error);
        }
        setSendLoading(false);
    };

    const handleMoveCandidate = async () => {
        if (
            applicantAssessmentDetail.status ===
            ApplicantAssessmentDetailStatus.IN_PROGRESS
        )
            return toast.error("Candidate is taking the assessment");
        setLoading(true);
        try {
            await toast.promise(
                applicantAssessmentDetailServices.moveCandidateToAssessment(
                    candidateId as string,
                    nextAssesment.id
                ),
                {
                    pending: `Moving candidate ${nextAssesment.name}`,
                    success: {
                        render({ data }) {
                            return `${data?.message}`;
                        },
                    },
                }
            );

            await queryClient.invalidateQueries({
                queryKey: ["job-profiles", jobId],
            });
            router.push(
                `/${lang}/backend/jobs/${jobId}/hiring-process/${assessmentId}`
            );
        } catch (error: any) {
            handleError(error);
        }
        setLoading(false);
    };

    const handleDisqualifyCandidate = async () => {
        try {
            await toast.promise(
                disqualifyMutate.mutateAsync(
                    applicantAssessmentDetail.applicantProfileId
                ),
                {
                    pending: "Disqualifying candidate",
                    success: "Disqualify candidate success!",
                }
            );
        } catch (error) {
            handleError(error);
        }
    };

    const handleRestoreCandidate = () => {};

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Disqualify candidate"
                    description="Are you sure you want to disqualify this candidate? This action cannot be undone."
                    onConfirm={handleDisqualifyCandidate}
                    loading={disqualifyMutate.isPending}
                    show={showDisqualify}
                    onClose={() => setShowDisqualify(false)}
                />
            </Portal>
            <WarningModal
                isOpen={moveWarning}
                isLoading={loading}
                closeModal={() => setMoveWarning(false)}
                onConfirm={handleMoveCandidate}
                content="You have invited candidate to take assessment but there is no submission yet! Do you want to continue moving this candidate?"
                title="Move candidate"
            />
            <ActionDrawer
                show={showDrawer}
                onClose={() => setShowDrawer(false)}
            />
            <div className="sticky -top-4 z-10">
                <div className="bg-white absolute top-6 right-3 py-2 px-4 flex items-center gap-4 rounded-md shadow-md text-neutral-600">
                    {applicantAssessmentDetail.assessment.assessmentTypeName ===
                        "LIVE_VIDEO_INTERVIEW_ASSESSMENT" && (
                        <Tooltip content="Create event">
                            <button
                                type="button"
                                className={
                                    styles.candidate__action__btn +
                                    " disabled:cursor-not-allowed disabled:opacity-80"
                                }
                                onClick={() => setShowDrawer(true)}
                                disabled={isDisqualified}
                            >
                                <CalendarDaysIcon className="w-6 h-6" />
                            </button>
                        </Tooltip>
                    )}
                    <Tooltip content="Send assessment">
                        <button
                            type="button"
                            className={
                                styles.candidate__action__btn +
                                " disabled:cursor-not-allowed disabled:opacity-80"
                            }
                            disabled={sendLoading || isDisqualified}
                            onClick={handleSendAssessment}
                        >
                            <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                    <div className="w-[1px] h-8 bg-gray-300"></div>
                    {!isDisqualified ? (
                        <Tooltip content="Disqualified candidate">
                            <button
                                type="button"
                                className={
                                    styles.candidate__action__btn +
                                    " disabled:cursor-not-allowed disabled:opacity-80"
                                }
                                onClick={() => setShowDisqualify(true)}
                            >
                                <HandRaisedIcon className="w-6 h-6 text-red-600" />
                            </button>
                        </Tooltip>
                    ) : (
                        <Tooltip content="Restore candidate">
                            <button
                                type="button"
                                className={
                                    styles.candidate__action__btn +
                                    " disabled:cursor-not-allowed disabled:opacity-80"
                                }
                                disabled={disqualifyMutate.isPending}
                                onClick={handleRestoreCandidate}
                            >
                                <ArrowPathIcon className="w-6 h-6 text-green-500" />
                            </button>
                        </Tooltip>
                    )}
                    {!isDisqualified && (
                        <div className="flex items-center ">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-auto px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-tl-md rounded-bl-md border-r border-blue-800 transition-all duration-300 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={loading}
                                onClick={
                                    applicantAssessmentDetail.status ===
                                    ApplicantAssessmentDetailStatus.INVITED
                                        ? () => setMoveWarning(true)
                                        : handleMoveCandidate
                                }
                            >
                                Move to {nextAssesment.name}
                            </button>
                            <MoveCandidateDialog />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CandidateActionTabs;
