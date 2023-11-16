import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import { Button, ButtonOutline, Selection } from "@/components";
import fileServices from "@/services/file-service/file.service";
import { SpinLoading } from "@/icons";

import styles from "./AsyncVideoAssessment.module.scss";
import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const mimeType = 'video/webm; codecs="opus,vp8"';
// const mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';

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
    const { recordedVideo, setRecordedVideo } = useAsyncVideoAssessment();
    const [isLoading, setIsLoading] = useState(false);

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
        mediaRecorder.current.onstop = async () => {
            setIsLoading(true);
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const myFile = new File([videoBlob], "demo.mp4", {
                type: mimeType,
            });
            const url = await handleUploadVideo(myFile);
            console.log(url);
            setRecordedVideo([url]);
            setVideoChunks([]);
            setIsLoading(false);
        };
    };

    const handleUploadVideo = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("formFile", file);

            const res = await fileServices.uploadFile(formData);

            console.log(res);
            toast.success((await res).message);

            return res.data;
        } catch (error: any) {
            console.log(error);
            toast.error(error.message ? error.message : "Upload failure");
        }
    };

    useEffect(() => {
        if (liveVideoFeed.current)
            liveVideoFeed.current.srcObject = new MediaStream(
                stream.getVideoTracks()
            );
    }, [stream]);

    return (
        <main className="max-w-[300px]">
            <div
                className={`h-60 w-[300px] bg-gray-900 rounded-md mb-4 relative`}
            >
                <video
                    ref={liveVideoFeed}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover -scale-x-100 scale-y-100 rounded-md`}
                ></video>
                {isLoading && (
                    <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center z-10">
                        <SpinLoading className="w-10 h-10 text-blue_primary_600" />
                    </div>
                )}
            </div>
            <section>
                <h3 className="text-sm text-gray-500 font-semibold mb-2">
                    Camera
                </h3>
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
            </section>

            <div className="h-[1px] w-full bg-gray-300 my-4"></div>

            <section className="mb-4">
                <h3 className="text-sm text-gray-500 font-semibold mb-8">
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
            </section>

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
            {/* <button type="button" onClick={toggleCamera}>
                Toggle camera
            </button> */}
        </main>
    );
};
export default VideoRecorder;
