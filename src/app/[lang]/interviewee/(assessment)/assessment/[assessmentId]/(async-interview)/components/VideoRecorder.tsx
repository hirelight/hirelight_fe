import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import moment from "moment";

import { Button, ButtonOutline, CountdownTimer, Selection } from "@/components";
import { SpinLoading } from "@/icons";
import { uploadFile } from "@/helpers";

import styles from "./VideoRecorder.module.scss";
import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const mimeType = 'video/webm; codecs="opus,vp8"';
// const mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';

type VideoRecorderProps = {
    stream: MediaStream;
    devices: MediaDeviceInfo[];
    toggleCamera?: () => void;
};

const VideoRecorder: React.FC<VideoRecorderProps> = ({
    stream,
    devices,
    toggleCamera,
}) => {
    const {
        answers,
        setAnswers,
        curPos,
        setCurPos,
        setRecordedVideo,
        handleJoinTest,
        assessmentData,
        handleTrackTest,
    } = useAsyncVideoAssessment();

    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const liveVideoFeed = useRef<HTMLVideoElement>(null);
    const [recordingStatus, setRecordingStatus] = useState<
        "inactive" | "recording"
    >("inactive");
    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const canRecord = useMemo(
        () =>
            answers[curPos] &&
            (!answers[curPos].content.files ||
                answers[curPos].content.files!!.length <
                    answers[curPos].content.config!!.numOfTakes),
        [answers, curPos]
    );

    const canMoveNext = useMemo(
        () => answers[curPos] && answers[curPos].content.files,
        [answers, curPos]
    );

    const startRecording = async () => {
        console.log("Recording");

        setRecordingStatus("recording");

        if (!stream) return;

        const media = new MediaRecorder(stream, { mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();

        let localVideoChunks: Blob[] = [];

        mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
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
            try {
                setIsLoading(true);
                const videoBlob = new Blob(videoChunks, { type: mimeType });
                const myFile = new File([videoBlob], `takes-${curPos + 1}`, {
                    type: mimeType,
                });
                const url = await uploadFile(myFile);
                setAnswers(
                    produce(answers, draft => {
                        if (!draft[curPos].content.files)
                            draft[curPos].content.files = [
                                {
                                    name: myFile.name,
                                    src: url,
                                    type: "video/mp4",
                                    isChosen: true,
                                },
                            ];
                        else {
                            draft[curPos].content.files!![
                                draft[curPos].content.files!!.length - 1
                            ].isChosen = false;
                            draft[curPos].content.files!!.push({
                                name: myFile.name,
                                src: url,
                                type: "video/mp4",
                                isChosen: true,
                            });
                        }
                    })
                );

                setRecordedVideo([url]);
                setVideoChunks([]);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
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

            {recordingStatus === "recording" && (
                <div className="my-4">
                    <CountdownTimer
                        targetDate={moment().add(3, "minutes").toDate()}
                        onEnd={stopRecording}
                    />
                </div>
            )}

            <div className={styles.video_controls}>
                {canRecord &&
                    (recordingStatus === "inactive" ? (
                        <Button onClick={startRecording} type="button">
                            Start Recording
                        </Button>
                    ) : (
                        <ButtonOutline onClick={stopRecording} type="button">
                            Stop Recording
                        </ButtonOutline>
                    ))}
                {canMoveNext && (
                    <ButtonOutline
                        onClick={() => setCurPos(curPos + 1)}
                        type="button"
                    >
                        Next question
                    </ButtonOutline>
                )}
            </div>
            {!assessmentData && (
                <div className="flex justify-center">
                    <ButtonOutline onClick={handleJoinTest}>
                        Start interview
                    </ButtonOutline>
                </div>
            )}
        </main>
    );
};
export default VideoRecorder;
