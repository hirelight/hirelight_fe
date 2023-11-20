"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { flushSync } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import {
    ICandidateMCContentJson,
    ICandidateMCDto,
} from "@/interfaces/questions.interface";
import {
    ICandidateAssessmentDetailDto,
    IMCAppliAssessmentDto,
    mcAssessmentServices,
} from "@/services";
import { ButtonOutline } from "@/components";
import { SpinLoading } from "@/icons";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import styles from "./MultipleChoiceAssessment.module.scss";

import logo from "/public/images/logo.svg";

import QuestionList from "./QuestionList";

type MultipleChoiceAssessmentState = {
    assesmentData: IMCAppliAssessmentDto | null;
    setAssessmentData: React.Dispatch<
        React.SetStateAction<IMCAppliAssessmentDto | null>
    >;
    answers: ICandidateMCDto[];
    setAnswers: React.Dispatch<React.SetStateAction<ICandidateMCDto[]>>;
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

let timerId: NodeJS.Timer;

const MultipleChoiceAssessment: React.FC<MultipleChoiceAssessmentProps> = ({
    data,
}) => {
    const { lang } = useParams();
    const router = useRouter();

    const [answers, setAnswers] = useState<ICandidateMCDto[]>([]);
    const [assesmentData, setAssessmentData] =
        useState<IMCAppliAssessmentDto | null>(null);
    const [displayTest, setDisplayTest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleJoinTest = async () => {
        setIsLoading(true);
        try {
            const res = await mcAssessmentServices.joinMCAssessment(data.id);
            console.log(res);
            toast.success(res.message);
            setAssessmentData(res.data);
            setDisplayTest(true);
            setAnswers(
                JSON.parse(res.data.questionAnswerSet!!) as ICandidateMCDto[]
            );
            setIsLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
            setIsLoading(false);
        }
    };

    const handleSubmitTest = async () => {
        setIsLoading(true);
        try {
            const res = await mcAssessmentServices.submitMCAssessment({
                applicantAssessmentDetailId: data.id,
                answers: answers,
            });
            console.log(res);
            if (timerId) clearInterval(timerId);
            toast.success(res.message);
            router.push(`/${lang}/profile/applications`);
            setIsLoading(false);
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleTrackTest = async (duetime: number) => {
            try {
                timerId = setInterval(async () => {
                    if (answers.length === 0) return;

                    console.log("Send track", answers);
                    const res = await mcAssessmentServices.trackMCAssessment({
                        applicantAssessmentDetailId: data.id,
                        answers: answers,
                    });

                    toast.success(res.message);
                }, 5000);

                // if (
                //     moment(assesmentData!!.startTime).add(duetime).toDate() >
                //         new Date() &&
                //     timerId
                // ) {
                //     clearInterval(timerId);
                // }

                // if (duetime)
                //     setTimeout(() => {
                //         if (timerId) clearInterval(timerId);
                //     }, duetime);
            } catch (error: any) {
                console.error(error);
                if (
                    error.statusCode &&
                    error.statusCode === 400 &&
                    error.message &&
                    error.message ===
                        "Assessment id not valid or assessment not available for tracking." &&
                    timerId
                )
                    clearInterval(timerId);
                toast.error(
                    error.message ? error.message : "Some thing went wrong"
                );
            }
        };
        if (answers.length > 0 && assesmentData) {
            if (timerId) clearInterval(timerId);
            handleTrackTest(assesmentData.assessment.duration!!);
        }
    }, [answers, assesmentData, data.id]);

    useEffect(() => {
        // Clear tracking task on leaving page
        return () => {
            console.log("Clear timeout");
            if (timerId) clearInterval(timerId!! as NodeJS.Timer);
        };
    }, []);

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
                    answers,
                    setAnswers,
                    assesmentData,
                    setAssessmentData,
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
                        <div
                            className={`${
                                submitted ? "pointer-events-none" : ""
                            }`}
                        >
                            <QuestionList />
                        </div>
                    )}
                    {displayTest && data.status === "IN_PROGRESS" && (
                        <div className="flex justify-center items-center">
                            <ButtonOutline onClick={handleSubmitTest}>
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
