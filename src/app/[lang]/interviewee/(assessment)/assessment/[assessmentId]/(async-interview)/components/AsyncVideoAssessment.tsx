"use client";

import React, {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import fileServices from "@/services/file-service/file.service";
import {
    IParsedAsyncAssess,
    ICandidateAssessmentDetailDto,
    asyncAssessmentServices,
    IQuestionAnswerDto,
    IAsyncAnswer,
} from "@/services";
import { QuestionAnswerContentJson } from "@/interfaces/questions.interface";

import VideoRecorder from "./VideoRecorder";
import SoundIndicator from "./SoundIndicator";
import styles from "./AsyncVideoAssessment.module.scss";
import ChatSection from "./ChatSection";
import Sidebar from "./Sidebar";

type AsyncVideoAssessmentState = {
    stream: MediaStream | null;
    setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    recordedVideo: string[];
    setRecordedVideo: React.Dispatch<React.SetStateAction<string[]>>;
    assessmentData: IParsedAsyncAssess | null;
    setAssessmentData: React.Dispatch<
        React.SetStateAction<IParsedAsyncAssess | null>
    >;
    answers: IAsyncAnswer[];
    setAnswers: React.Dispatch<React.SetStateAction<IAsyncAnswer[]>>;

    curPos: number;
    setCurPos: React.Dispatch<React.SetStateAction<number>>;

    handleJoinTest: () => void;
    handleTrackTest: (pos: number) => void;
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

    const [assessmentData, setAssessmentData] =
        useState<IParsedAsyncAssess | null>(null);
    const [answers, setAnswers] = useState<IAsyncAnswer[]>([]);
    const [curPos, setCurPos] = useState<number>(0);

    const [permission, setPermission] = useState(true);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [recordedVideo, setRecordedVideo] = useState<string[]>([]);

    const handleJoinTest = async () => {
        try {
            const res = await asyncAssessmentServices.joinAsyncAssessment(
                data.id
            );
            console.log(res);
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
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    };

    const handleTrackTest = useCallback(
        async (pos: number) => {
            if (!assessmentData) return;

            try {
                const res = await asyncAssessmentServices.trackAsyncAssessment({
                    applicantAssessmentDetailId: assessmentData.id,
                    assessmentSubmissions: assessmentData.questionAnswerSet.map(
                        (item, index) => {
                            if (index === pos)
                                return {
                                    ...answers[pos],
                                    content: JSON.stringify(
                                        answers[pos].content
                                    ),
                                };

                            return {
                                ...item,
                                content: JSON.stringify(item.content),
                            };
                        }
                    ),
                });

                toast.success(res.message);
            } catch (error: any) {
                toast.error(
                    error.message ? error.message : "Some thing went wrong"
                );
            }
        },
        [assessmentData]
    );

    const handleSubmitTest = async () => {
        if (!assessmentData) return;

        try {
            const res = await asyncAssessmentServices.submitAsyncAssessment({
                applicantAssessmentDetailId: data.id,
                assessmentSubmissions: assessmentData.questionAnswerSet.map(
                    item => ({ ...item, content: JSON.stringify(item) })
                ),
            });
            toast.success(res.message);
            // router.push(`/${lang}/profile/applications`);
            queryClient.invalidateQueries({
                queryKey: [`my-assessment-${assessmentData!!.id}`],
            });
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    };

    // const toggleCamera = async () => {
    //     try {
    //         if (!stream) {
    //             const videoStream = await navigator.mediaDevices.getUserMedia({
    //                 video: true,
    //                 audio: true,
    //             });
    //             // //combine both audio and video streams
    //             const combinedStream = new MediaStream([
    //                 ...videoStream.getVideoTracks(),
    //                 ...videoStream.getAudioTracks(),
    //             ]);
    //             setStream(combinedStream);

    //             // **********Initial AudioContext to keep track audio loudness************
    //             const context = new AudioContext();
    //             if (!audioContext) setAudioContext(context);
    //         } else {
    //             console.log("Turn off camera");
    //             const tracks = stream.getTracks();

    //             // Stop each track
    //             tracks.forEach(track => {
    //                 track.stop();
    //             });
    //             setStream(null);
    //             setAudioContext(null);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleUploadVideo = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("formFile", file);
            const res = await fileServices.uploadFile(formData);
            setRecordedVideo([res.data]);
            toast.success(res.message);
        } catch (error) {
            toast.error("Upload error");
        }
    };

    useEffect(() => {
        if (curPos) {
            handleTrackTest(curPos);
        }
    }, [handleTrackTest, curPos]);

    useEffect(() => {
        const getPermission = async () => {
            if ("MediaRecorder" in window) {
                try {
                    const devices =
                        await navigator.mediaDevices.enumerateDevices();
                    setDevices(devices);
                    if (
                        devices.some(
                            device =>
                                ["videoinput", "audioinput"].includes(
                                    device.kind
                                ) && !device.label
                        )
                    )
                        setPermission(false);

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

                    // **********Initial AudioContext to keep track audio loudness************
                    const context = new AudioContext();
                    if (!audioContext) setAudioContext(context);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setPermission(false);
            }
        };

        getPermission();
    }, [permission, audioContext]);

    if (!permission)
        return (
            <div className="h-screen w-screen bg-[#333e49] relative flex justify-center items-center">
                <div className="absolute w-[1000px] h-[1000px] -top-[500px] -left-[250px] rounded-full bg-[#c4cfde] bg-opacity-40"></div>

                <p className="text-center text-4xl text-white">
                    To perform the interview, we need access <br /> to your
                    microphone and camera.
                </p>
            </div>
        );

    return (
        <AsyncVideoAssessmentContext.Provider
            value={{
                stream,
                setStream,
                recordedVideo,
                setRecordedVideo,
                assessmentData,
                setAssessmentData,
                handleJoinTest,
                handleTrackTest,
                answers,
                setAnswers,
                curPos,
                setCurPos,
            }}
        >
            <main className={styles.wrapper}>
                <div className="bg-white w-full max-w-screen-xl mx-auto rounded-md drop-shadow-lg flex">
                    <Sidebar />
                    <ChatSection />
                    <div className="min-w-[300px] p-6 border-l border-gray-300">
                        <div className="mb-4">
                            {stream && (
                                <VideoRecorder
                                    devices={devices}
                                    stream={stream}
                                />
                            )}
                            {/* <AudioRecorder /> */}
                            {/* {audioContext && stream && (
                                <SoundIndicator
                                    context={audioContext}
                                    stream={stream}
                                    devices={devices}
                                />
                            )} */}
                        </div>
                    </div>
                </div>
            </main>
        </AsyncVideoAssessmentContext.Provider>
    );
};

export default AsyncVideoAssessment;
