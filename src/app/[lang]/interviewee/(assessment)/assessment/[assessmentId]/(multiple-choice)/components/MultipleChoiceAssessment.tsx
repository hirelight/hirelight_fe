"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ICandidateMCDto } from "@/interfaces/questions.interface";
import {
    ICandidateAssessmentDetailDto,
    IMCAppliAssessmentDto,
    mcAssessmentServices,
} from "@/services";
import { ButtonOutline } from "@/components";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { handleError } from "@/helpers";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";
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

let timer: NodeJS.Timer;

const MultipleChoiceAssessment: React.FC<MultipleChoiceAssessmentProps> = ({
    data,
}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { assessmentId } = useParams();

    const [answers, setAnswers] = useState<ICandidateMCDto[]>([]);
    const [assesmentData, setAssessmentData] =
        useState<IMCAppliAssessmentDto | null>(null);
    const [displayTest, setDisplayTest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [startAutoTask, stopAutoTask] = useTrackAssessment(
        () => handleTrackTest(),
        30
    );

    const handleTrackTest = useCallback(
        async function () {
            if (data.status !== ApplicantAssessmentDetailStatus.IN_PROGRESS)
                return;
            try {
                await mcAssessmentServices.trackMCAssessment({
                    applicantAssessmentDetailId: data.id,
                    answers: answers,
                });
            } catch (error: any) {
                console.error(error);
            }
        },
        [answers, data]
    );

    const handleJoinTest = async () => {
        setIsLoading(true);
        try {
            const res = await mcAssessmentServices.joinMCAssessment(data.id);

            await queryClient.invalidateQueries({
                queryKey: [`my-assessment`, assessmentId],
            });

            toast.success(res.message);
            setAssessmentData(res.data);
            setAnswers(
                JSON.parse(res.data.questionAnswerSet!!) as ICandidateMCDto[]
            );
            setDisplayTest(true);
            startAutoTask();
        } catch (error: any) {
            handleError(error);
        }
        setIsLoading(false);
    };

    const handleSubmitTest = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await mcAssessmentServices.submitMCAssessment({
                applicantAssessmentDetailId: data.id,
                answers: answers,
            });
            await queryClient.invalidateQueries({
                queryKey: [`my-assessment`, assesmentData?.id],
            });
            toast.success(res.message);

            router.push(`${data.id}/review`);
        } catch (error: any) {
            handleError(error);
        }
        setIsLoading(false);
    }, [answers, assesmentData, data.id, queryClient, router]);

    useEffect(() => {
        const trackBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            handleTrackTest();
        };
        if (displayTest)
            window.addEventListener("beforeunload", trackBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", trackBeforeUnload);
        };
    }, [displayTest, handleTrackTest]);

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
                                    __html: sanitizeHtml(
                                        data.assessment.description
                                    ),
                                }}
                                className="ql-editor !max-w-[40%]"
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
                    {displayTest &&
                        data.status ===
                            ApplicantAssessmentDetailStatus.IN_PROGRESS && (
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
