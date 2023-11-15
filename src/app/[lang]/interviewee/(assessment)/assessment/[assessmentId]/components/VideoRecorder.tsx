import { useState, useRef, useEffect } from "react";

import { Button, ButtonOutline, Selection } from "@/components";

import styles from "../styles.module.scss";

const mimeType = 'video/webm; codecs="opus,vp8"';

type VideoRecorderProps = {
    stream: MediaStream;
    devices: MediaDeviceInfo[];
    toggleCamera: () => void;
};

const VideoRecorder: React.FC<VideoRecorderProps> = ({
    stream,
    devices,
    toggleCamera,
}) => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const liveVideoFeed = useRef<HTMLVideoElement>(null);
    const [recordingStatus, setRecordingStatus] = useState<
        "inactive" | "recording"
    >("inactive");
    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
    const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

    // const toggleCamera = async () => {
    //     if ("MediaRecorder" in window && liveVideoFeed.current) {
    //         if (!stream) {
    //             const videoConstraints = {
    //                 audio: false,
    //                 video: true,
    //             };
    //             const audioConstraints = { audio: true };
    //             // create audio and video streams separately
    //             const audioStream =
    //                 await navigator.mediaDevices.getUserMedia(audioConstraints);
    //             const videoStream =
    //                 await navigator.mediaDevices.getUserMedia(videoConstraints);
    //             setPermission(true);
    //             //combine both audio and video streams
    //             const combinedStream = new MediaStream([
    //                 ...videoStream.getVideoTracks(),
    //                 ...audioStream.getAudioTracks(),
    //             ]);
    //             //set videostream to live feed player
    //             liveVideoFeed.current.srcObject = videoStream;
    //         } else {
    //             console.log("Turn off camera");
    //             const tracks = stream.getTracks();

    //             // Stop each track
    //             tracks.forEach(track => {
    //                 track.stop();
    //             });
    //             liveVideoFeed.current.srcObject = null;
    //         }
    //     }
    // };

    const startRecording = async () => {
        console.log("Recording");

        setRecordingStatus("recording");

        if (!stream) return;

        const media = new MediaRecorder(stream, { mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();

        let localVideoChunks: Blob[] = [];

        mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
            console.log(event.data);
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };

        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        console.log("Stop");
        setPermission(false);
        setRecordingStatus("inactive");

        if (!mediaRecorder.current) return;

        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    };

    useEffect(() => {
        if (liveVideoFeed.current)
            liveVideoFeed.current.srcObject = new MediaStream(
                stream.getVideoTracks()
            );
    }, [stream]);

    return (
        <main className="max-w-[300px]">
            <div className={`h-60 w-[300px] bg-gray-900 rounded-md mb-4`}>
                <video
                    ref={liveVideoFeed}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover -scale-x-100 scale-y-100 rounded-md`}
                ></video>
            </div>
            <h3 className="text-sm text-gray-500 font-semibold mb-2">Camera</h3>
            <Selection
                title=""
                items={devices
                    .filter(item => item.kind === "videoinput")
                    .map(item => ({
                        label: item.label,
                        value: item,
                    }))}
                onChange={() => {}}
            />

            <div className="h-[1px] w-full bg-gray-300 my-4"></div>

            <h3 className="text-sm text-gray-500 font-semibold mb-2">
                Microphone
            </h3>
            <Selection
                title=""
                items={devices
                    .filter(item => item.kind === "audioinput")
                    .map(item => ({
                        label: item.label,
                        value: item,
                    }))}
                onChange={() => {}}
            />
            {/* {recordedVideo && (
                <div
                    className={`h-60 w-[300px] object-cover bg-gray-900 rounded-md`}
                >
                    <video
                        src={recordedVideo}
                        controls
                        className={styles.live_player}
                    ></video>
                </div>
            )} */}
            <div className={styles.video_controls}>
                {recordingStatus === "inactive" ? (
                    <Button onClick={startRecording} type="button">
                        Start Recording
                    </Button>
                ) : (
                    <ButtonOutline onClick={stopRecording} type="button">
                        Stop Recording
                    </ButtonOutline>
                )}
            </div>
            <button type="button" onClick={toggleCamera}>
                Toggle camera
            </button>
        </main>
    );
};
export default VideoRecorder;
