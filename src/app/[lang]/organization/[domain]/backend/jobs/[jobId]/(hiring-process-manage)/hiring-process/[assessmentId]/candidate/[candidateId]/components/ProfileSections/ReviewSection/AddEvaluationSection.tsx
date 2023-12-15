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
import { handleError, isInvalidForm } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AddEvaluation.module.scss";

type AddEvaluationSectionProps = {
    applicantAssessmentDetailId: string;
    close: () => void;
};

const AddEvaluationSection: React.FC<AddEvaluationSectionProps> = ({
    applicantAssessmentDetailId,
    close,
}) => {
    const { candidateId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data
    );

    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [addState, setAddState] = useState<ICreateEvaluationDto>({
        applicantAssessmentDetailId: applicantAssessmentDetailId,
        evaluation: "",
        rating: -1,
    });
    const [addErr, setAddErr] = useState({
        evaluationErr: "",
        ratingErr: "",
    });

    const inValidateAddInput = () => {
        const errors = { ...addErr };
        if (!addState.evaluation)
            errors.evaluationErr = t("evaluation_comment_required");
        if (addState.rating < 0)
            errors.ratingErr = t("select_at_least_one_rating");

        if (isInvalidForm(errors)) {
            toast.error(t("common:error.invalid_input"));
            setAddErr(errors);
            return true;
        }

        return false;
    };

    const handleAddEvaluation = async () => {
        if (inValidateAddInput()) return;

        setLoading(true);
        try {
            const res = await evaluationServices.createEvaluation(addState);

            await queryClient.invalidateQueries({
                queryKey: [
                    "assessment-evaluations",
                    applicantAssessmentDetail?.id,
                ],
            });
            toast.success(res.message);
        } catch (error: any) {
            handleError(error);
        }
        setLoading(false);
        close();
    };

    const handleRating = (value: number) => {
        if (value === addState.rating) setAddState({ ...addState, rating: -1 });
        else setAddState({ ...addState, rating: value });

        setAddErr({
            ...addErr,
            ratingErr: "",
        });
    };

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
                    {t("should_candidate_proceed_next")}
                </h4>
                <div className="flex flex-col border border-gray-300 rounded-md focus-within:border-gray-500 transition-all p-2 min-h-[100px] relative">
                    <textarea
                        placeholder={t("add_note")}
                        className="w-full text-sm placeholder:text-sm outline-none border-none focus:border-none focus:outline-none focus:ring-0 resize-none"
                        onChange={e => {
                            e.currentTarget.style.height = 0 + "px";
                            e.currentTarget.style.height =
                                e.currentTarget.scrollHeight + "px";

                            setAddState({
                                ...addState,
                                evaluation: e.currentTarget.value,
                            });
                            setAddErr({
                                ...addErr,
                                evaluationErr: "",
                            });
                        }}
                    />

                    <div className="flex self-end border border-gray-300 rounded-md overflow-hidden">
                        <button
                            type="button"
                            className={`${styles.rate_btn} ${
                                addState.rating === 10 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 10)}
                        >
                            <StarIcon />
                        </button>
                        <button
                            type="button"
                            className={`${styles.rate_btn} ${
                                addState.rating === 5 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 5)}
                        >
                            <HandThumbUpIcon />
                        </button>
                        <button
                            type="button"
                            className={`${styles.rate_btn} ${
                                addState.rating === 1 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 1)}
                        >
                            <HandThumbDownIcon />
                        </button>
                    </div>
                    {(addErr.ratingErr || addErr.evaluationErr) && (
                        <div className="mt-2 text-sm text-red-600 dark:text-red-500 space-y-1">
                            <p className="font-medium">
                                {addErr.evaluationErr}{" "}
                            </p>
                            <p className="font-medium">{addErr.ratingErr} </p>
                        </div>
                    )}
                </div>
            </section>
            <div className="border-t border-gray-300 py-4 px-6 flex justify-end">
                <button
                    type="button"
                    className="text-neutral-600 font-semibold text-sm mr-4 hover:underline disabled:cursor-not-allowed"
                    onClick={close}
                    disabled={loading}
                >
                    {t("common:cancel")}
                </button>
                <Button
                    disabled={loading}
                    isLoading={loading}
                    onClick={handleAddEvaluation}
                >
                    {t("common:save")}
                </Button>
            </div>
        </m.div>
    );
};

export default AddEvaluationSection;
