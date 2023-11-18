"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { flushSync } from "react-dom";

import {
    ICandidateMCContentJson,
    ICandidateMCDto,
} from "@/interfaces/questions.interface";
import {
    ICandidateAssessmentDetailDto,
    IMCAppliAssessmentDto,
} from "@/services";
import { ButtonOutline } from "@/components";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

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
    const [answers, setAnswers] = useState<ICandidateMCDto[]>([]);
    const [assesmentData, setAssessmentData] =
        useState<IMCAppliAssessmentDto | null>(null);

    const handleJoinTest = async () => {
        try {
            const res =
                await applicantAssessmentDetailServices.joinMCAssessment(
                    data.id
                );
            console.log(res);
            toast.success(res.message);
            setAssessmentData(res.data);

            flushSync(() =>
                setAnswers(
                    JSON.parse(
                        res.data.questionAnswerSet!!
                    ) as ICandidateMCDto[]
                )
            );
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    };

    const handleSubmitTest = async () => {
        try {
            const res =
                await applicantAssessmentDetailServices.submitMCAssessment({
                    applicantAssessmentDetailId: data.id,
                    answers: answers,
                });
            console.log(res);
            toast.success(res.message);
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    };

    useEffect(() => {
        const handleTrackTest = async (duetime: number) => {
            try {
                timerId = setInterval(async () => {
                    if (answers.length === 0) return;

                    console.log("Send track", answers);
                    const res =
                        await applicantAssessmentDetailServices.trackMCAssessment(
                            {
                                applicantAssessmentDetailId: data.id,
                                answers: answers,
                            }
                        );

                    toast.success(res.message);
                }, 5000);
                if (duetime)
                    setTimeout(() => {
                        if (timerId) clearInterval(timerId);
                    }, duetime);
            } catch (error: any) {
                console.error(error);
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
                    <div className="mb-8">
                        <h3 className="text-2xl text-center font-semibold">
                            Bài kiểm tra đánh giá {data.assessment.name}
                        </h3>
                        <p className="text-center text-base text-gray-500 font-medium">
                            {data.applicantProfile.jobPost.title}
                        </p>
                    </div>

                    <ButtonOutline onClick={handleJoinTest}>
                        Take test
                    </ButtonOutline>
                    {assesmentData && (
                        <div>
                            <QuestionList />
                        </div>
                    )}
                    <ButtonOutline onClick={handleSubmitTest}>
                        Submit
                    </ButtonOutline>
                </main>
            </MultipleChoiceAssessmentContext.Provider>
        </div>
    );
};

export default MultipleChoiceAssessment;
