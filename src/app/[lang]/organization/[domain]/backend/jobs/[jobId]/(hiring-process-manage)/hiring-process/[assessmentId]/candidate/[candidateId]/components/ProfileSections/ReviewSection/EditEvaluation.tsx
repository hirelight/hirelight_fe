import {
    HandThumbDownIcon,
    HandThumbUpIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { m } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components";
import {
    ICreateEvaluationDto,
    IEvaluationDto,
} from "@/services/evaluation/evaluation.interface";
import evaluationServices from "@/services/evaluation/evaluation.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { isInvalidForm } from "@/helpers";

import styles from "./AddEvaluation.module.scss";

type EditEvaluationProps = {
    data: IEvaluationDto;
    close: () => void;
};

const EditEvaluation: React.FC<EditEvaluationProps> = ({ close, data }) => {
    const queryClient = useQueryClient();

    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data
    );

    const [loading, setLoading] = useState(false);
    const [editState, setEditState] = useState<IEvaluationDto>(data);
    const [editErr, setEditErr] = useState({
        evaluationErr: "",
        ratingErr: "",
    });

    const inValidAddInput = (): boolean => {
        const errors = { ...editErr };
        if (!editState.evaluation)
            errors.evaluationErr = "Evaluation comment required!";
        if (editState.rating < 0)
            errors.ratingErr = "Please select at least one rating!";

        if (isInvalidForm(errors)) {
            toast.error("Invalid input");
            setEditErr(errors);
            return true;
        }

        return false;
    };

    const handleEditEvaluation = async () => {
        if (inValidAddInput()) return;

        setLoading(true);
        try {
            const res = await evaluationServices.editEvaluation(editState);
            await queryClient.invalidateQueries({
                queryKey: [
                    "assessment-evaluations",
                    applicantAssessmentDetail?.id,
                ],
            });
            toast.success(res.message);
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Something went wrong!"
            );
        }
        setLoading(false);
        close();
    };

    const handleRating = (value: number) => {
        if (value === editState.rating)
            setEditState({ ...editState, rating: -1 });
        else setEditState({ ...editState, rating: value });

        setEditErr({
            ...editErr,
            ratingErr: "",
        });
    };

    useEffect(() => {
        if (data) setEditState(data);
    }, [data]);

    return (
        <m.div
            initial={{
                opacity: 0,
                height: 80,
            }}
            animate={{
                opacity: 1,
                height: "auto",
            }}
            exit={{
                opacity: 0,
                height: 80,
            }}
            className={styles.add_wrapper}
        >
            <section className="p-6">
                <h4 className="text-neutral-700 font-semibold mb-3">
                    Should this candidate proceed to next assessment?
                </h4>
                <div className="flex flex-col border border-gray-300 rounded-md focus-within:border-gray-500 transition-all p-2 min-h-[100px] relative">
                    <textarea
                        placeholder="Add note"
                        className="w-full text-sm placeholder:text-sm outline-none border-none focus:border-none focus:outline-none focus:ring-0 resize-none"
                        value={editState.evaluation}
                        onChange={e => {
                            e.currentTarget.style.height = 0 + "px";
                            e.currentTarget.style.height =
                                e.currentTarget.scrollHeight + "px";

                            setEditState({
                                ...editState,
                                evaluation: e.currentTarget.value,
                            });

                            setEditErr({
                                ...editErr,
                                evaluationErr: "",
                            });
                        }}
                    />

                    <div className="flex self-end border border-gray-300 rounded-md overflow-hidden">
                        <button
                            type="button"
                            className={`${styles.rate_btn} ${
                                editState.rating === 10 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 10)}
                        >
                            <StarIcon />
                        </button>
                        <button
                            type="button"
                            className={`${styles.rate_btn} ${
                                editState.rating === 5 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 5)}
                        >
                            <HandThumbUpIcon />
                        </button>
                        <button
                            type="button"
                            className={`${styles.rate_btn} ${
                                editState.rating === 1 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 1)}
                        >
                            <HandThumbDownIcon />
                        </button>
                    </div>
                </div>
                {(editErr.ratingErr || editErr.evaluationErr) && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500 space-y-1">
                        <p className="font-medium">{editErr.evaluationErr} </p>
                        <p className="font-medium">{editErr.ratingErr} </p>
                    </p>
                )}
            </section>
            <div className="border-t border-gray-300 py-4 px-6 flex justify-end">
                <button
                    type="button"
                    className="text-neutral-600 font-semibold text-sm mr-4 hover:underline"
                    onClick={close}
                >
                    Cancel
                </button>
                <Button
                    disabled={loading}
                    isLoading={loading}
                    onClick={handleEditEvaluation}
                >
                    Save evaluation
                </Button>
            </div>
        </m.div>
    );
};

export default EditEvaluation;
