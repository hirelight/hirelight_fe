"use client";

import React, { useEffect, useState } from "react";

import LoadingIndicator from "@/components/LoadingIndicator";

import VideoRecorder from "./components/VideoRecorder";
import AudioRecorder from "./components/AudioRecorder";
import styles from "./styles.module.scss";
import SoundIndicator from "./components/SoundIndicator";

const AssessmentPage = () => {
    const [permission, setPermission] = useState(true);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

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
        <div className="bg-slate-100 h-screen w-screen flex justify-center py-10">
            <div className="bg-white min-w-[900px] rounded-md drop-shadow-lg flex">
                <div className="flex-1"></div>
                <div className="min-w-[300px] p-6">
                    <div className="mb-4">
                        {stream && (
                            <VideoRecorder
                                devices={devices}
                                stream={stream}
                                toggleCamera={toggleCamera}
                            />
                        )}
                        {/* <AudioRecorder /> */}
                        {audioContext && stream && (
                            <SoundIndicator
                                context={audioContext}
                                stream={stream}
                                devices={devices}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentPage;

{
    /* <div>
<h1>React Media Recorder</h1>
<div className={styles.button_flex}>
    <button type="button" onClick={toggleRecordOption("video")}>
        Record Video
    </button>
    <button type="button" onClick={toggleRecordOption("audio")}>
        Record Audio
    </button>
</div>

<div>
    {recordOption === "video" ? (
        <VideoRecorder />
    ) : (
        <AudioRecorder />
    )}
</div>
</div> */
}
