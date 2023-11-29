"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

import {
    IParsedAsyncAssess,
    ICandidateAssessmentDetailDto,
    asyncAssessmentServices,
    IQuestionAnswerDto,
    IAsyncAnswer,
} from "@/services";
import { QuestionAnswerContentJson } from "@/interfaces/questions.interface";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { VideoWrapper } from "@/components";
import { videoJsOptions } from "@/components/VideoWrapper";

import VideoRecorder from "./VideoRecorder";
import styles from "./AsyncVideoAssessment.module.scss";
import ChatSection from "./ChatSection";
import Sidebar from "./Sidebar";
import ReviewPage from "./ReviewPage";

type AsyncErr = {
    deviceErr: {
        camErr: string;
        micErr: string;
    };
};

export type AnswerState = {
    answerPos: number;
    outTime?: Date;
    startQuestionTime?: Date;
    startRecordTime?: Date;
    isThinkEnd?: boolean;
};

type AsyncVideoAssessmentState = {
    applicantDetail: ICandidateAssessmentDetailDto;

    devices: MediaDeviceInfo[];

    stream: MediaStream | null;
    setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;

    assessmentData: IParsedAsyncAssess | null;
    setAssessmentData: React.Dispatch<
        React.SetStateAction<IParsedAsyncAssess | null>
    >;
    answers: IAsyncAnswer[];
    setAnswers: React.Dispatch<React.SetStateAction<IAsyncAnswer[]>>;

    permission: boolean;
    setPermission: React.Dispatch<React.SetStateAction<boolean>>;

    setupLoading: boolean;

    curPos: number;
    setCurPos: React.Dispatch<React.SetStateAction<number>>;

    asyncError: AsyncErr;
    setAsyncError: React.Dispatch<React.SetStateAction<AsyncErr>>;

    assessmentLoading: boolean;

    handleJoinTest: () => Promise<void>;
    handleTrackTest: (updatedAnswer: IAsyncAnswer) => Promise<void>;
    handleSubmitTest: () => Promise<void>;
};

const AsyncVideoAssessmentContext =
    createContext<AsyncVideoAssessmentState | null>(null);

export const useAsyncVideoAssessment = (): AsyncVideoAssessmentState => {
    const context = React.useContext(AsyncVideoAssessmentContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

type AsyncVideoAssessmentProps = {
    data: ICandidateAssessmentDetailDto;
};

const AsyncVideoAssessment: React.FC<AsyncVideoAssessmentProps> = ({
    data,
}) => {
    const queryClient = useQueryClient();

    const [setupLoading, setSetupLoading] = useState(true);
    const [permission, setPermission] = useState(true);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

    const [assessmentData, setAssessmentData] =
        useState<IParsedAsyncAssess | null>(null);
    const [assessmentLoading, setAssessmentLoading] = useState(false);
    const [answers, setAnswers] = useState<IAsyncAnswer[]>([]);
    const [curPos, setCurPos] = useState<number>(0);
    const [asyncError, setAsyncError] = useState({
        deviceErr: {
            camErr: "",
            micErr: "",
        },
    });

    const handleSetupOnJoin = (): number => {
        const curStateString = localStorage.getItem(data.id);
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString) as AnswerState;

            if (!parsedCurState.startQuestionTime) {
                localStorage.setItem(
                    data.id,
                    JSON.stringify({
                        ...parsedCurState,
                        startQuestionTime: new Date(),
                    })
                );
            }

            return parsedCurState.answerPos ?? 0;
        } else if (!curStateString) {
            localStorage.setItem(
                data.id,
                JSON.stringify({
                    answerPos: 0,
                    startQuestionTime: new Date(),
                })
            );
            return 0;
        } else return 0;
    };

    const handleJoinTest = async () => {
        try {
            setAssessmentLoading(true);
            const res = await asyncAssessmentServices.joinAsyncAssessment(
                data.id
            );
            toast.success(res.message);
            setAssessmentData({
                ...(res.data as any),
                questionAnswerSet: JSON.parse(
                    res.data.questionAnswerSet
                ) as (IQuestionAnswerDto & {
                    content: QuestionAnswerContentJson;
                })[],
            });

            setAnswers(
                JSON.parse(
                    res.data.questionAnswerSet
                ) as (IQuestionAnswerDto & {
                    content: QuestionAnswerContentJson;
                })[]
            );
            setCurPos(handleSetupOnJoin());
            setAssessmentLoading(false);
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
            setAssessmentLoading(false);
        }
    };

    const handleRemoveRecordTime = useCallback(() => {
        const curStateString = localStorage.getItem(data.id);
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString);
            if (parsedCurState.startRecordTime) {
                parsedCurState = {
                    ...parsedCurState,
                    startRecordTime: null,
                };
            }

            localStorage.setItem(data.id, JSON.stringify(parsedCurState));
        }
    }, [data.id]);

    const handleTrackTest = useCallback(
        async (updatedAnswer: IAsyncAnswer) => {
            if (!assessmentData) return;

            setAssessmentLoading(true);
            try {
                const updatedAnswers = answers.map(item => {
                    if (item.id === updatedAnswer.id)
                        return {
                            ...updatedAnswer,
                            content: updatedAnswer.content,
                        };

                    return item;
                });

                await asyncAssessmentServices.trackAsyncAssessment({
                    applicantAssessmentDetailId: assessmentData.id,
                    assessmentSubmissions: JSON.stringify(updatedAnswers),
                });
                handleRemoveRecordTime();
                await queryClient.invalidateQueries({
                    queryKey: [`my-assessment`, assessmentData.id],
                });

                setAnswers(updatedAnswers);
            } catch (error: any) {
                console.log(error);
            }
            setAssessmentLoading(false);
        },
        [answers, assessmentData, handleRemoveRecordTime, queryClient]
    );

    const handleSubmitTest = async () => {
        if (!assessmentData) return;

        setAssessmentLoading(true);
        try {
            const assessmentSubmissions = JSON.stringify(answers);

            const res = await asyncAssessmentServices.submitAsyncAssessment({
                applicantAssessmentDetailId: data.id,
                assessmentSubmissions,
            });

            await queryClient.invalidateQueries({
                queryKey: [`my-assessment`, assessmentData!!.id],
            });
            toast.success(res.message);
            localStorage.removeItem(data.id);
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
        setAssessmentLoading(false);
    };

    useEffect(() => {
        const getPermission = async () => {
            if ("MediaRecorder" in window) {
                try {
                    setSetupLoading(true);

                    const videoStream =
                        await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: true,
                        });

                    setPermission(true);
                    // //combine both audio and video streams
                    const combinedStream = new MediaStream([
                        ...videoStream.getVideoTracks(),
                        ...videoStream.getAudioTracks(),
                    ]);
                    setStream(combinedStream);
                    setSetupLoading(false);

                    // Check for any webcam and audio input permission allowed available
                    const devices =
                        await navigator.mediaDevices.enumerateDevices();

                    if (
                        devices.some(
                            device =>
                                ["videoinput", "audioinput"].includes(
                                    device.kind
                                ) && !device.label
                        )
                    ) {
                        if (
                            devices
                                .filter(device =>
                                    ["videoinput"].includes(device.kind)
                                )
                                .every(device => !device.label)
                        ) {
                            setAsyncError(prev =>
                                produce(prev, draft => {
                                    draft.deviceErr.camErr =
                                        "Camera device not found!";
                                })
                            );
                            setPermission(false);
                        }

                        if (
                            devices
                                .filter(device =>
                                    ["audioinput"].includes(device.kind)
                                )
                                .every(device => !device.label)
                        ) {
                            setAsyncError(prev =>
                                produce(prev, draft => {
                                    draft.deviceErr.micErr =
                                        "Audio input device not found!";
                                })
                            );
                            setPermission(false);
                        }
                    }
                    setDevices(devices);
                    // **********Initial AudioContext to keep track audio loudness************
                    const context = new AudioContext();
                    if (!audioContext) setAudioContext(context);
                } catch (error) {
                    console.error("Error nef", error);
                    setSetupLoading(false);
                }
            } else {
                alert(
                    "The MediaRecorder API is not supported in your browser."
                );
            }
        };

        getPermission();
    }, [audioContext]);

    // Tracking the question start time on question changes
    useEffect(() => {
        const handleSaveStateOnAnswerChange = () => {
            const curStateString = localStorage.getItem(data.id);
            if (curStateString) {
                let parsedCurState = JSON.parse(curStateString) as AnswerState;
                if (
                    parsedCurState.answerPos !== curPos ||
                    !parsedCurState.startQuestionTime
                )
                    parsedCurState = {
                        ...parsedCurState,
                        answerPos: curPos,
                        startQuestionTime: new Date(),
                    };

                localStorage.setItem(data.id, JSON.stringify(parsedCurState));
            } else {
                localStorage.setItem(
                    data.id,
                    JSON.stringify({
                        answerPos: curPos ?? undefined,
                        startQuestionTime: new Date(),
                    })
                );
            }
        };
        if (assessmentData) handleSaveStateOnAnswerChange();
    }, [assessmentData, curPos, data.id]);
    // console.log(window, "MediaRecorder" in window);
    if ("MediaRecorder" in window && !permission)
        return (
            <div className="fixed inset-0 z-50">
                <div className="h-screen w-screen bg-[#333e49] relative flex justify-center items-center">
                    <div className="absolute w-[1000px] h-[1000px] -top-[500px] -left-[250px] rounded-full bg-[#c4cfde] bg-opacity-40"></div>

                    <p className="text-center text-4xl text-white">
                        To perform the interview, we need access <br /> to your
                        microphone and camera.
                    </p>
                </div>
            </div>
        );

    return (
        <AsyncVideoAssessmentContext.Provider
            value={{
                devices,
                applicantDetail: data,
                asyncError,
                setAsyncError,
                stream,
                setStream,
                assessmentData,
                setAssessmentData,
                handleJoinTest,
                handleTrackTest,
                handleSubmitTest,
                answers,
                setAnswers,
                curPos,
                setCurPos,
                permission,
                setPermission,
                setupLoading,
                assessmentLoading,
            }}
        >
            <main className={styles.wrapper}>
                <div className="bg-white w-full max-w-screen-xl mx-auto rounded-md drop-shadow-lg flex">
                    <Sidebar />
                    <ChatSection />
                    <div className="min-w-[300px] p-6 border-l border-gray-300">
                        <div className="mb-4 h-full">
                            <VideoRecorder />
                        </div>
                    </div>
                </div>
            </main>
        </AsyncVideoAssessmentContext.Provider>
    );
};

export default AsyncVideoAssessment;
