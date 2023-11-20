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

import styles from "./AddEvaluation.module.scss";

type EditEvaluationProps = {
    data: IEvaluationDto;
    close: () => void;
};

const EditEvaluation: React.FC<EditEvaluationProps> = ({ close, data }) => {
    const { candidateId } = useParams();

    const queryClient = useQueryClient();

    const [addState, setAddState] = useState<IEvaluationDto>(data);
    const [addErr, setAddErr] = useState({
        evaluationErr: "",
        ratingErr: 0,
    });

    const validateAddInput = () => {
        if (!addState.evaluation)
            setAddErr({
                ...addErr,
                evaluationErr: "Evaluation comment required!",
            });
    };

    const handleAddEvaluation = async () => {
        try {
            const res = await evaluationServices.createEvaluation(addState);
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["evaluations", candidateId],
            });
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.message ? error.message : "Something went wrong!"
            );
        }
        close();
    };

    const handleRating = (value: number) => {
        if (value === addState.rating) setAddState({ ...addState, rating: -1 });
        else setAddState({ ...addState, rating: value });
    };

    useEffect(() => {
        if (data) setAddState(data);
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
                        onChange={e => {
                            e.currentTarget.style.height = 0 + "px";
                            e.currentTarget.style.height =
                                e.currentTarget.scrollHeight + "px";

                            setAddState({
                                ...addState,
                                evaluation: e.currentTarget.value,
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
                                addState.rating === 0 ? styles.active : ""
                            }`}
                            onClick={handleRating.bind(null, 0)}
                        >
                            <HandThumbDownIcon />
                        </button>
                    </div>
                </div>
            </section>
            <div className="border-t border-gray-300 py-4 px-6 flex justify-end">
                <button
                    type="button"
                    className="text-neutral-600 font-semibold text-sm mr-4 hover:underline"
                    onClick={close}
                >
                    Cancel
                </button>
                <Button onClick={handleAddEvaluation}>Save evaluation</Button>
            </div>
        </m.div>
    );
};

export default EditEvaluation;
