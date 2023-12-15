"use client";

import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

import { IApplicantAssessmentDetailDto, IEvaluationDto } from "@/services";
import { useAppSelector } from "@/redux/reduxHooks";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { DeleteModal, Portal, UserAvatar } from "@/components";
import evaluationServices from "@/services/evaluation/evaluation.service";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import EditEvaluation from "./EditEvaluation";

export const getRating = (value: number, children?: React.ReactNode) => {
    switch (value) {
        case 1:
            return (
                <span className="flex gap-1 items-center text-red-500 text-sm font-medium">
                    {children ?? null}
                    <HandThumbDownIcon className="w-5 h-5" />
                </span>
            );
        case 5:
            return (
                <span className="flex gap-1 items-center text-green-400 text-sm font-medium">
                    {children ?? null}
                    <HandThumbUpIcon className="w-5 h-5" />
                </span>
            );
        case 10:
            return (
                <span className="flex gap-1 items-center text-amber-400 text-sm font-medium">
                    {children ?? null}
                    <StarIcon className="w-5 h-5" />
                </span>
            );

        default:
            return null;
    }
};

type EvaluationCardProps = {
    data: IEvaluationDto & {
        applicantAssessmentDetail: IApplicantAssessmentDetailDto;
    };
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ data }) => {
    const { jobId, candidateId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    const userInfo = useAppSelector(state => state.auth.authUser);

    const queryClient = useQueryClient();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { data: collabRes } = useQuery({
        queryKey: ["evaluation-employer", data.collaboratorId],
        queryFn: () =>
            collaboratorsServices.getCollaboratorById(
                jobId as string,
                data.collaboratorId
            ),
    });

    const handleDeleteEvaluation = async () => {
        try {
            const res = await evaluationServices.deleteById(data.id);

            await queryClient.invalidateQueries({
                queryKey: ["evaluations", candidateId],
            });
            toast.success(res.message);
        } catch (error: any) {
            handleError(error);
        }
    };

    if (showEdit)
        return (
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    <EditEvaluation
                        data={data}
                        close={() => setShowEdit(false)}
                    />
                </AnimatePresence>
            </LazyMotion>
        );

    return (
        <React.Fragment>
            <Portal>
                <DeleteModal
                    title={t("delete_evaluation")}
                    show={showDelete}
                    description={t("delete_evaluation_warning")}
                    onClose={() => setShowDelete(false)}
                    onConfirm={handleDeleteEvaluation}
                />
            </Portal>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full text-neutral-600">
                    <UserAvatar avatarUrl={data.collaboratorAvatarUrl} />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        {`${data.collaboratorFirstName ?? ""} ${
                            data.collaboratorLastName ?? ""
                        }`}{" "}
                        <span>{getRating(data.rating)}</span>
                    </h3>
                    <p className="text-gray-500">
                        {moment.utc(data.updatedTime).locale(lang).fromNow()}
                    </p>
                </div>

                {userInfo &&
                    userInfo.userId === collabRes?.data.employerDto.id &&
                    data.applicantAssessmentDetail.status !==
                        ApplicantAssessmentDetailStatus.MOVED && (
                        <div className="flex items-center gap-2 text-neutral-700">
                            <button
                                type="button"
                                className="block p-1 hover:bg-slate-200 bg-opacity-70 rounded"
                                onClick={() => setShowEdit(true)}
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
            </div>
            <p>{data.evaluation}</p>
        </React.Fragment>
    );
};

export default EvaluationCard;
