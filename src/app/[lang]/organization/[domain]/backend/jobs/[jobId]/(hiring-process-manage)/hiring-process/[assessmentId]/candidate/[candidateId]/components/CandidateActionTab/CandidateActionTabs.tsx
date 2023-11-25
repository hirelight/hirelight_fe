"use client";

import React, { useMemo } from "react";
import {
    EllipsisHorizontalIcon,
    EnvelopeIcon,
    HandRaisedIcon,
    ChatBubbleOvalLeftIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";
import {
    CalendarDaysIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { useAppSelector } from "@/redux/reduxHooks";

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

    const queryClient = useQueryClient();
    const router = useRouter();
    const [showDrawer, setShowDrawer] = React.useState(false);
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

    const handleSendAssessment = async () => {
        try {
            const res = await applicantAssessmentDetailServices.sendAssessment(
                applicantAssessmentDetail.id
            );
            toast.success(res.message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMoveCandidate = async () => {
        try {
            const res =
                await applicantAssessmentDetailServices.moveCandidateToAssessment(
                    candidateId as string,
                    nextAssesment.id
                );

            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: [`job-profiles`, jobId, assessmentId],
            });
            queryClient.invalidateQueries({
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
    };

    return (
        <>
            <ActionDrawer
                show={showDrawer}
                onClose={() => setShowDrawer(false)}
            />
            <div className="sticky -top-4">
                <div className="bg-white absolute top-6 right-3 py-2 px-4 flex items-center gap-4 rounded-md shadow-md text-neutral-600">
                    {/* <button
                        type="button"
                        className={styles.candidate__action__btn}
                    >
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                    <div className="w-[1px] h-8 bg-gray-300"></div> */}
                    {/* <Tooltip content="Send email">
                        <button
                            type="button"
                            className={styles.candidate__action__btn}
                            onClick={() => setShowDrawer(true)}
                        >
                            <EnvelopeIcon className="w-5 h-5" />
                        </button>
                    </Tooltip> */}
                    <Tooltip content="Create event">
                        <button
                            type="button"
                            className={styles.candidate__action__btn}
                            onClick={() => setShowDrawer(true)}
                        >
                            <CalendarDaysIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                    <Tooltip content="Send assessment">
                        <button
                            type="button"
                            className={styles.candidate__action__btn}
                            onClick={handleSendAssessment}
                        >
                            <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                    {/* <Tooltip content="Add evaluation">
                        <button
                            type="button"
                            className={styles.candidate__action__btn}
                            onClick={() => setShowDrawer(true)}
                        >
                            <PencilSquareIcon className="w-6 h-6" />
                        </button>
                    </Tooltip> */}
                    <div className="w-[1px] h-8 bg-gray-300"></div>
                    <Tooltip content="Disqualified candidate">
                        <button
                            type="button"
                            className={styles.candidate__action__btn}
                        >
                            <HandRaisedIcon className="w-6 h-6 text-red-600" />
                        </button>
                    </Tooltip>
                    <div className="flex items-center ">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-auto px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-tl-md rounded-bl-md border-r border-blue-800 transition-all duration-300 whitespace-nowrap"
                            onClick={handleMoveCandidate}
                        >
                            Move to {nextAssesment.name}
                        </button>
                        <MoveCandidateDialog />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CandidateActionTabs;
