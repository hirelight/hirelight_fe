"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { flushSync } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";

import {
    ICandidateMCContentJson,
    ICandidateMCDto,
} from "@/interfaces/questions.interface";
import {
    ICandidateAssessmentDetailDto,
    IMCAppliAssessmentDto,
    mcAssessmentServices,
} from "@/services";
import { ButtonOutline, CountdownTimer } from "@/components";
import { SpinLoading } from "@/icons";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import useTrackAssessment from "@/hooks/useTrackAssessment";

import styles from "./MultipleChoiceAssessment.module.scss";

import logo from "/public/images/logo.svg";

import QuestionList from "./QuestionList";

type MultipleChoiceAssessmentState = {
    isLoading: boolean;

    assesmentData: IMCAppliAssessmentDto | null;
    setAssessmentData: React.Dispatch<
        React.SetStateAction<IMCAppliAssessmentDto | null>
    >;
    answers: ICandidateMCDto[];
    setAnswers: React.Dispatch<React.SetStateAction<ICandidateMCDto[]>>;
    handleSubmitTest: () => void;
    stopAutoTask: () => void;
};

const MultipleChoiceAssessmentContext =
    createContext<MultipleChoiceAssessmentState | null>(null);

export const useMultipleChoiceAssessment =
    (): MultipleChoiceAssessmentState => {
        const context = React.useContext(MultipleChoiceAssessmentContext);

        if (!context)
            throw new Error(
                "Please use MultipleChoiceAssessmentProvider in your parent component!"
            );

        return context;
    };

type MultipleChoiceAssessmentProps = {
    data: ICandidateAssessmentDetailDto;
};

const MultipleChoiceAssessment: React.FC<MultipleChoiceAssessmentProps> = ({
    data,
}) => {
    const queryClient = useQueryClient();

    const [answers, setAnswers] = useState<ICandidateMCDto[]>([]);
    const [assesmentData, setAssessmentData] =
        useState<IMCAppliAssessmentDto | null>(null);
    const [displayTest, setDisplayTest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [startAutoTask, stopAutoTask] = useTrackAssessment(
        handleTrackTest,
        30
    );

    const handleJoinTest = async () => {
        setIsLoading(true);
        try {
            const res = await mcAssessmentServices.joinMCAssessment(data.id);

            toast.success(res.message);
            setAssessmentData(res.data);
            setDisplayTest(true);
            setAnswers(
                JSON.parse(res.data.questionAnswerSet!!) as ICandidateMCDto[]
            );

            setIsLoading(false);
            queryClient.invalidateQueries({
                queryKey: [`my-assessment`, data.id],
            });
        } catch (error: any) {
            console.error("Joib", error);
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
            setIsLoading(false);
        }
    };

    const handleSubmitTest = useCallback(async () => {
        setIsLoading(true);

        try {
            const res = await mcAssessmentServices.submitMCAssessment({
                applicantAssessmentDetailId: data.id,
                answers: answers,
            });
            toast.success(res.message);
            stopAutoTask();
            // router.push(`/${lang}/profile/applications`);
            setIsLoading(false);
            queryClient.invalidateQueries({
                queryKey: [`my-assessment`, assesmentData!!.id],
            });
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
            setIsLoading(false);
        }
    }, [answers, assesmentData, data.id, queryClient, stopAutoTask]);

    async function handleTrackTest() {
        try {
            const res = await mcAssessmentServices.trackMCAssessment({
                applicantAssessmentDetailId: data.id,
                answers: answers,
            });

            toast.success(res.message);
        } catch (error: any) {
            console.error("Track", error);

            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    }

    useEffect(() => {
        if (
            assesmentData &&
            answers.length &&
            [
                ApplicantAssessmentDetailStatus.INVITED,
                ApplicantAssessmentDetailStatus.IN_PROGRESS,
            ].includes(assesmentData.status)
        ) {
            startAutoTask();
        }
    }, [assesmentData, answers, startAutoTask, stopAutoTask]);

    useEffect(() => {
        if (
            [
                ApplicantAssessmentDetailStatus.EVALUATED,
                ApplicantAssessmentDetailStatus.PENDING_EVALUATION,
            ].includes(data.status)
        ) {
            setDisplayTest(true);
            setAnswers(JSON.parse(data.questionAnswerSet as string));
            setAssessmentData(data as IMCAppliAssessmentDto);
        }
    }, [data]);

    return (
        <div>
            <div className={styles.banner}>
                <div className="w-40 aspect-square p-6 rounded-full bg-white overflow-hidden drop-shadow-lg">
                    <Image
                        src={logo}
                        alt="Company logo"
                        width={180}
                        height={180}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
            <MultipleChoiceAssessmentContext.Provider
                value={{
                    isLoading,
                    answers,
                    setAnswers,
                    assesmentData,
                    setAssessmentData,
                    handleSubmitTest,
                    stopAutoTask,
                }}
            >
                <main className="max-w-screen-xl mx-auto p-4 xl:px-6">
                    <div className="mb-4 flex flex-col items-center">
                        <h3 className="text-2xl text-center font-semibold">
                            Assessment {data.assessment.name}
                        </h3>
                        <p className="text-center text-base text-gray-500 font-medium mb-6">
                            {data.applicantProfile.jobPost.title}
                        </p>
                        {!displayTest && data.assessment.description && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.assessment.description,
                                }}
                                className="max-w-[40%]"
                            ></div>
                        )}
                    </div>

                    {!displayTest && (
                        <div className="flex justify-center items-center mt-4">
                            {data.status ===
                            ApplicantAssessmentDetailStatus.IN_PROGRESS ? (
                                <ButtonOutline
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                    onClick={handleJoinTest}
                                >
                                    Re-join assessment
                                </ButtonOutline>
                            ) : (
                                <ButtonOutline
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                    onClick={handleJoinTest}
                                >
                                    Take assessment
                                </ButtonOutline>
                            )}
                        </div>
                    )}

                    {assesmentData && (
                        <div className={``}>
                            <QuestionList />
                        </div>
                    )}
                    {displayTest && (
                        <div className="flex justify-center items-center">
                            <ButtonOutline
                                isLoading={isLoading}
                                disabled={
                                    isLoading ||
                                    ![
                                        ApplicantAssessmentDetailStatus.IN_PROGRESS,
                                        ApplicantAssessmentDetailStatus.INVITED,
                                    ].includes(data.status)
                                }
                                onClick={handleSubmitTest}
                            >
                                {isLoading && <SpinLoading className="mr-2" />}
                                Submit
                            </ButtonOutline>
                        </div>
                    )}
                </main>
            </MultipleChoiceAssessmentContext.Provider>
        </div>
    );
};

export default MultipleChoiceAssessment;
