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

import VideoRecorder from "./VideoRecorder";
import styles from "./AsyncVideoAssessment.module.scss";
import ChatSection from "./ChatSection";
import Sidebar from "./Sidebar";

type AsyncErr = {
    deviceErr: {
        camErr: string;
        micErr: string;
    };
};

type AsyncVideoAssessmentState = {
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

    handleJoinTest: () => void;
    handleTrackTest: (updatedAnswer: IAsyncAnswer) => void;
    handleSubmitTest: () => void;
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
    const [answers, setAnswers] = useState<IAsyncAnswer[]>([]);
    const [curPos, setCurPos] = useState<number>(0);
    const [asyncError, setAsyncError] = useState({
        deviceErr: {
            camErr: "",
            micErr: "",
        },
    });

    const handleSaveCurrentState = (joinTime?: Date) => {
        const curStateString = localStorage.getItem("cur-state");
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString);
            parsedCurState = {
                ...parsedCurState,
                joinTime,
            };
            localStorage.setItem("cur-state", JSON.stringify(parsedCurState));
        } else {
            const currentState = {
                joinTime,
            };

            localStorage.setItem("cur-state", JSON.stringify(currentState));
        }
    };

    const handleJoinTest = async () => {
        try {
            setSetupLoading(true);
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
            handleSaveCurrentState(new Date(res.data.startTime));

            setAnswers(
                JSON.parse(
                    res.data.questionAnswerSet
                ) as (IQuestionAnswerDto & {
                    content: QuestionAnswerContentJson;
                })[]
            );
            setSetupLoading(false);
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
            setSetupLoading(false);
        }
    };

    const handleRemoveRecordTime = useCallback(() => {
        const curStateString = localStorage.getItem("cur-state");
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString);
            if (parsedCurState.startRecordTime) {
                parsedCurState = {
                    ...parsedCurState,
                    startRecordTime: null,
                };
            }

            localStorage.setItem("cur-state", JSON.stringify(parsedCurState));
        }
    }, []);

    const handleTrackTest = useCallback(
        async (updatedAnswer: IAsyncAnswer) => {
            if (!assessmentData) return;

            try {
                const updatedAnswers = answers.map(item => {
                    if (item.id === updatedAnswer.id)
                        return {
                            ...updatedAnswer,
                            content: updatedAnswer.content,
                        };

                    return item;
                });

                const res = await asyncAssessmentServices.trackAsyncAssessment({
                    applicantAssessmentDetailId: assessmentData.id,
                    assessmentSubmissions: JSON.stringify(updatedAnswers),
                });
                handleRemoveRecordTime();
                toast.success(res.message);
                setAnswers(updatedAnswers);
            } catch (error: any) {
                toast.error(
                    error.message ? error.message : "Some thing went wrong"
                );
            }
        },
        [answers, assessmentData, handleRemoveRecordTime]
    );

    const handleSubmitTest = async () => {
        if (!assessmentData) return;

        try {
            const assessmentSubmissions = JSON.stringify(answers);

            const res = await asyncAssessmentServices.submitAsyncAssessment({
                applicantAssessmentDetailId: data.id,
                assessmentSubmissions,
            });
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: [`my-assessment-${assessmentData!!.id}`],
            });
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    };

    useEffect(() => {
        const getPermission = async () => {
            if ("MediaRecorder" in window) {
                try {
                    setSetupLoading(true);
                    const devices =
                        await navigator.mediaDevices.enumerateDevices();

                    setDevices(devices);
                    console.log(devices);
                    // Check for any webcam and audio input permission allowed available
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
                        }

                        if (
                            devices
                                .filter(device =>
                                    ["audioinput"].includes(device.kind)
                                )
                                .every(device => !device.label)
                        )
                            setAsyncError(prev =>
                                produce(prev, draft => {
                                    draft.deviceErr.micErr =
                                        "Audio input device not found!";
                                })
                            );
                        setPermission(false);
                    }

                    const videoStream =
                        await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: true,
                        });
                    // //combine both audio and video streams
                    const combinedStream = new MediaStream([
                        ...videoStream.getVideoTracks(),
                        ...videoStream.getAudioTracks(),
                    ]);
                    setStream(combinedStream);
                    setSetupLoading(false);
                    // **********Initial AudioContext to keep track audio loudness************
                    const context = new AudioContext();
                    if (!audioContext) setAudioContext(context);
                } catch (error) {
                    console.error("Error nef", error);
                    setSetupLoading(false);
                }
            } else {
                setPermission(false);
            }
        };

        getPermission();
    }, [permission, audioContext]);

    useEffect(() => {
        const curStateString = localStorage.getItem("cur-state");
        if (curStateString && answers.length) {
            let parsedCurState = JSON.parse(curStateString);
            setCurPos(parsedCurState.answerPos ?? 0);
        }
    }, [answers]);

    useEffect(() => {
        const handleTrackQuestionTime = () => {
            const curStateString = localStorage.getItem("cur-state");
            if (curStateString) {
                let parsedCurState = JSON.parse(curStateString);
                if (!parsedCurState.startQuestionTime) {
                    parsedCurState = {
                        ...parsedCurState,
                        startQuestionTime: new Date(),
                    };
                } else {
                    if (parsedCurState.answerPos < curPos)
                        parsedCurState = {
                            ...parsedCurState,
                            startQuestionTime: new Date(),
                        };
                }

                localStorage.setItem(
                    "cur-state",
                    JSON.stringify(parsedCurState)
                );
            }
        };
        if (assessmentData) handleTrackQuestionTime();
    }, [assessmentData, curPos]);

    if (typeof window !== "undefined" && !("MediaRecorder" in window))
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
            }}
        >
            <main className={styles.wrapper}>
                <div className="bg-white w-full max-w-screen-xl mx-auto rounded-md drop-shadow-lg flex">
                    <Sidebar />
                    <ChatSection />
                    <div className="min-w-[300px] p-6 border-l border-gray-300">
                        <div className="mb-4">
                            <VideoRecorder devices={devices} stream={stream} />
                        </div>
                    </div>
                </div>
            </main>
        </AsyncVideoAssessmentContext.Provider>
    );
};

export default AsyncVideoAssessment;
