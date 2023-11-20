"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import fileServices from "@/services/file-service/file.service";

import VideoRecorder from "./VideoRecorder";
import SoundIndicator from "./SoundIndicator";
import styles from "./AsyncVideoAssessment.module.scss";

type AsyncVideoAssessmentState = {
    stream: MediaStream | null;
    setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    recordedVideo: string[];
    setRecordedVideo: React.Dispatch<React.SetStateAction<string[]>>;
    assessmentData: any | null;
    setAssessmentData: React.Dispatch<React.SetStateAction<any | null>>;
};

const AsyncVideoAssessmentContext =
    createContext<AsyncVideoAssessmentState | null>(null);

export const useAsyncVideoAssessment = (): AsyncVideoAssessmentState => {
    const context = React.useContext(AsyncVideoAssessmentContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

const AsyncVideoAssessment = () => {
    const [assessmentData, setAssessmentData] = useState(null);

    const [permission, setPermission] = useState(true);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [recordedVideo, setRecordedVideo] = useState<string[]>([]);

    const toggleCamera = async () => {
        try {
            if (!stream) {
                const videoStream = await navigator.mediaDevices.getUserMedia({
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
            } else {
                console.log("Turn off camera");
                const tracks = stream.getTracks();

                // Stop each track
                tracks.forEach(track => {
                    track.stop();
                });
                setStream(null);
                setAudioContext(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUploadVide = async (file: File) => {
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
            }}
        >
            <main className={styles.wrapper}>
                <div className="bg-white w-full max-w-screen-xl mx-auto rounded-md drop-shadow-lg flex">
                    <div className="flex-1 p-4">
                        <div className={styles.chat_container}>
                            <div className="w-12 h-12 rounded-full text-neutral-700">
                                <UserCircleIcon />
                            </div>
                            <div className={styles.content_container}>
                                <div className={styles.message_card}>
                                    <p className={styles.message_card_title}>
                                        What inspired you to pursue this career?
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        <span>Answertime: </span>{" "}
                                        <span
                                            className={
                                                styles.message_card_badge
                                            }
                                        >
                                            <strong>3 minutes</strong>
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        <span>Number of takes: </span>{" "}
                                        <span
                                            className={
                                                styles.message_card_badge
                                            }
                                        >
                                            <strong>3</strong>
                                        </span>
                                    </p>
                                </div>
                                <div className={styles.takes_wrapper}>
                                    {recordedVideo.length > 0 && (
                                        <div>
                                            <video controls>
                                                <source
                                                    src={recordedVideo[0]}
                                                    type="video/mp4"
                                                />
                                                Sorry, your browser doesn&apos;t
                                                support embedded videos, but
                                                don&apos;t worry, you can
                                                <a href={recordedVideo[0]}></a>
                                                and watch it with your favorite
                                                video player!
                                            </video>
                                        </div>
                                    )}
                                    {new Array(3).fill("").map((_, index) => (
                                        <div
                                            key={index}
                                            className={styles.takes_placeholder}
                                        >
                                            <span
                                                className={styles.takes_badge}
                                            >
                                                <strong>
                                                    Takes {index + 1}
                                                </strong>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-6 border-l border-gray-300">
                        <div className="mb-4">
                            {stream && (
                                <VideoRecorder
                                    devices={devices}
                                    stream={stream}
                                    toggleCamera={toggleCamera}
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
