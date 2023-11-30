import Image from "next/image";
import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    StarIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

import { IApplicantAssessmentDetailDto, IEvaluationDto } from "@/services";
import { useAppSelector } from "@/redux/reduxHooks";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { DeleteModal, Portal } from "@/components";
import evaluationServices from "@/services/evaluation/evaluation.service";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import AddEvaluationSection from "./AddEvaluationSection";
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
            toast.error(error.message ? error.message : "Something went wrong");
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
                    title="Delete evaluation"
                    show={showDelete}
                    description="Are you sure you want to delete
                    this evaluation? This action
                    cannot be undone."
                    onClose={() => setShowDelete(false)}
                    onConfirm={handleDeleteEvaluation}
                />
            </Portal>
            <div className="flex items-center gap-4 mb-4">
                {/* <Image
                    src={process.env.NEXT_PUBLIC_AVATAR_URL as string}
                    alt="Collaborator avatar"
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full object-cover"
                /> */}
                <div className="w-10 h-10 rounded-full text-neutral-600">
                    <UserCircleIcon />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        collaborator name <span>{getRating(data.rating)}</span>
                    </h3>
                    <p className="text-gray-500">
                        {moment(data.updatedTime).locale(lang).fromNow()}
                    </p>
                </div>

                {userInfo &&
                    userInfo.userId === collabRes?.data.employerDto.id &&
                    data.applicantAssessmentDetail.status !==
                        ApplicantAssessmentDetailStatus.MOVED && (
                        <div className="flex items-center gap-2 text-neutral-700">
                            {/* <button
                                type="button"
                                className="block p-1 hover:bg-slate-200 bg-opacity-70 rounded"
                                onClick={() => setShowDelete(true)}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button> */}
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
