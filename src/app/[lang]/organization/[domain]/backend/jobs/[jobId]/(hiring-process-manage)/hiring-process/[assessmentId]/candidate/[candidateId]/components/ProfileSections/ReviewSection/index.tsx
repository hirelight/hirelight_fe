"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
    BookmarkSlashIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import moment from "moment";

import evaluationServices from "@/services/evaluation/evaluation.service";
import { Button } from "@/components";
import { ICreateEvaluationDto } from "@/services/evaluation/evaluation.interface";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./styles.module.scss";
import AddEvaluationSection from "./AddEvaluationSection";

const ReviewSection = () => {
    const { candidateId } = useParams();
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );
    const { data: querRes } = useQuery({
        queryKey: ["evaluations", candidateId],
        queryFn: () =>
            evaluationServices.getListByApplicantAssessmentDetailId(
                applicantAssessmentDetail.id as string
            ),
    });
    const [showAdd, setShowAdd] = useState(false);

    const getRating = (value: number) => {
        switch (value) {
            case 0:
                return <HandThumbDownIcon className="w-5 h-5 text-red-500" />;
            case 5:
                return <StarIcon className="w-5 h-5 text-amber-400" />;
            case 10:
                return <HandThumbUpIcon className="w-5 h-5 text-green-400" />;
            default:
                return null;
        }
    };

    return (
        <div>
            {querRes?.data.length === 0 ? (
                <div className="flex justify-center items-center p-6">
                    <BookmarkSlashIcon className="w-16 h-16 text-neutral-700" />
                    <div className="ml-6 p-2">
                        <h3 className="mb-2 text-lg font-semibold">
                            You don’t have any evaluations yet
                        </h3>
                        <p className="mb-6 text-sm">
                            Evaluations you or other team members add will
                            appear here.
                        </p>
                        <Button onClick={() => setShowAdd(true)}>
                            Add evaluation
                        </Button>
                    </div>
                </div>
            ) : (
                <ul>
                    {querRes?.data.map(evaluation => (
                        <li
                            key={evaluation.id}
                            className="py-6 border-b border-t border-gray-300 text-sm"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src={
                                        process.env
                                            .NEXT_PUBLIC_AVATAR_URL as string
                                    }
                                    alt="Collaborator avatar"
                                    width={30}
                                    height={30}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        Nguyen Kien{" "}
                                        <span>
                                            {getRating(evaluation.rating)}
                                        </span>
                                    </h3>
                                    <p className="text-gray-500">
                                        {moment(
                                            evaluation.updatedTime
                                        ).fromNow()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-neutral-700">
                                    <button
                                        type="button"
                                        className="block p-1 hover:bg-slate-200 bg-opacity-70 rounded"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        className="block p-1 hover:bg-slate-200 bg-opacity-70 rounded"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p>{evaluation.evaluation}</p>
                        </li>
                    ))}
                </ul>
            )}

            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {showAdd && (
                        <AddEvaluationSection close={() => setShowAdd(false)} />
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
};

export default ReviewSection;
