import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import moment from "moment";

import { Button, ButtonOutline, CountdownTimer, Selection } from "@/components";
import { SpinLoading } from "@/icons";
import { uploadFile } from "@/helpers";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import styles from "./VideoRecorder.module.scss";
import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const mimeType = 'video/webm; codecs="opus,vp8"';
// const mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';

type VideoRecorderProps = {
    stream: MediaStream | null;
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
        handleJoinTest,
        assessmentData,
        handleSubmitTest,
        permission,
        asyncError,
        handleTrackTest,
    } = useAsyncVideoAssessment();

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const liveVideoFeed = useRef<HTMLVideoElement>(null);
    const [recordingStatus, setRecordingStatus] = useState<
        "inactive" | "recording"
    >("inactive");
    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isBreak, setIsBreak] = useState(false);
    const [outTime, setOutTime] = useState();
    const startQuestionTime = useMemo(() => {
        const curStateString = localStorage.getItem("cur-state");
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString);
            return parsedCurState.startQuestionTime
                ? new Date(parsedCurState.startQuestionTime)
                : new Date();
        } else return null;
    }, []);
    const haveThinkTime = useMemo(
        () =>
            answers[curPos] &&
            answers[curPos].content.config!!.thinkTime &&
            !answers[curPos].content.files &&
            recordingStatus === "inactive" &&
            (startQuestionTime
                ? moment(startQuestionTime)
                      .add(
                          answers[curPos].content.config!!.thinkTime,
                          "seconds"
                      )
                      .isBefore(moment())
                : true),
        [answers, curPos, recordingStatus, startQuestionTime]
    );
    const canRecord = useMemo(
        () =>
            answers[curPos] &&
            (!answers[curPos].content.files ||
                answers[curPos].content.files!!.length <
                    answers[curPos].content.config!!.numOfTakes),
        [answers, curPos]
    );

    const canMoveNext = useMemo(
        () =>
            answers[curPos] &&
            answers[curPos].content.files &&
            curPos < answers.length - 1,
        [answers, curPos]
    );

    const handleSaveStartRecordTime = () => {
        const curStateString = localStorage.getItem("cur-state");
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString);
            if (!parsedCurState.startRecordTime) {
                parsedCurState = {
                    ...parsedCurState,
                    startRecordTime: new Date(),
                };
            }

            localStorage.setItem("cur-state", JSON.stringify(parsedCurState));
        }
    };

    const startRecording = useCallback(async () => {
        setRecordingStatus("recording");

        if (!stream) return;

        const media = new MediaRecorder(stream, { mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();
        handleSaveStartRecordTime();

        let localVideoChunks: Blob[] = [];

        mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;

            localVideoChunks.push(event.data);
        };

        setVideoChunks(localVideoChunks);
    }, [stream]);

    const stopRecording = useCallback(() => {
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
                if (!canRecord) return;
                const url = await uploadFile(myFile);
                const updatedAns = produce(answers[curPos], draft => {
                    if (!draft.content.files)
                        draft.content.files = [
                            {
                                name: myFile.name,
                                src: url,
                                type: "video/mp4",
                                isChosen: true,
                            },
                        ];
                    else {
                        draft.content.files!![
                            draft.content.files!!.length - 1
                        ].isChosen = false;
                        draft.content.files!!.push({
                            name: myFile.name,
                            src: url,
                            type: "video/mp4",
                            isChosen: true,
                        });
                    }
                });

                handleTrackTest(updatedAns);

                setVideoChunks([]);
                setIsBreak(true);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
    }, [answers, canRecord, curPos, handleTrackTest, videoChunks]);

    const handleCountdownEnd = () => {};

    useEffect(() => {
        if (liveVideoFeed.current && stream)
            liveVideoFeed.current.srcObject = new MediaStream(
                stream.getVideoTracks()
            );
    }, [stream]);

    useEffect(() => {
        console.log(answers[curPos], canRecord);
        if (
            answers[curPos] &&
            !answers[curPos].content.config?.thinkTime &&
            canRecord
        ) {
            startRecording();
        }
    }, [answers, curPos, canRecord, startRecording]);

    useEffect(() => {
        const curStateString = localStorage.getItem("cur-state");
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString);
            setOutTime(parsedCurState.outTime);
        }
    }, []);

    // Tracking current assessment state when get out
    useEffect(() => {
        function saveCurAnswerState(e: BeforeUnloadEvent) {
            e.preventDefault();
            if (recordingStatus === "recording") {
                stopRecording();
            }
            const curStateString = localStorage.getItem("cur-state");
            if (curStateString) {
                let parsedCurState = JSON.parse(curStateString);
                parsedCurState = {
                    ...parsedCurState,
                    answerData: answers[curPos],
                    answerPos: curPos,
                    outTime: new Date(),
                };
                localStorage.setItem(
                    "cur-state",
                    JSON.stringify(parsedCurState)
                );
            } else {
                const currentState = {
                    answerData: answers[curPos],
                    answerPos: curPos,
                    outTime: new Date(),
                };

                localStorage.setItem("cur-state", JSON.stringify(currentState));
            }
        }
        window.addEventListener("beforeunload", saveCurAnswerState);
        return () => {
            window.removeEventListener("beforeunload", saveCurAnswerState);
        };
    }, [curPos, answers, recordingStatus, stopRecording]);

    return (
        <main className="max-w-[300px]">
            <div
                className={`h-60 w-[300px] bg-gray-900 rounded-md mb-4 relative`}
            >
                {permission && (
                    <video
                        ref={liveVideoFeed}
                        autoPlay
                        playsInline
                        className={`w-full h-full object-cover -scale-x-100 scale-y-100 rounded-md`}
                    ></video>
                )}
                {isBreak && (
                    <VideoCountDown onEnd={() => handleCountdownEnd()} />
                )}
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
                {asyncError.deviceErr.camErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                            {asyncError.deviceErr.camErr}{" "}
                        </span>
                    </p>
                )}
            </section>

            <div className="h-[1px] w-full bg-gray-300 my-4"></div>

            <section className="mb-4">
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
                {asyncError.deviceErr.micErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                            {asyncError.deviceErr.micErr}{" "}
                        </span>
                    </p>
                )}
            </section>
            {answers[curPos] && haveThinkTime && startQuestionTime ? (
                <div className="my-4">
                    <CountdownTimer
                        targetDate={moment(startQuestionTime)
                            .add(
                                answers[curPos].content.config?.thinkTime,
                                "seconds"
                            )
                            .toDate()}
                        onEnd={startRecording}
                    />
                </div>
            ) : null}

            {answers[curPos] && recordingStatus === "recording" && (
                <div className="my-4">
                    <CountdownTimer
                        targetDate={moment()
                            .add(
                                answers[curPos].content.config!!.duration,
                                "seconds"
                            )
                            .toDate()}
                        onEnd={stopRecording}
                    />
                </div>
            )}

            <div className={styles.video_controls}>
                {canRecord &&
                    (recordingStatus === "inactive" ? (
                        <Button onClick={startRecording} type="button">
                            {canRecord &&
                            answers[curPos].content.files &&
                            answers[curPos].content.files!!.length > 0
                                ? "Retake"
                                : "Start Recording"}
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

            {assessmentData &&
                answers.every(
                    ans => ans.content.files && ans.content.files.length > 0
                ) && (
                    <div className="flex justify-center">
                        <ButtonOutline onClick={handleSubmitTest}>
                            Submit answer
                        </ButtonOutline>
                    </div>
                )}

            <ButtonOutline onClick={stopRecording} type="button">
                Stop Recording
            </ButtonOutline>
        </main>
    );
};
export default VideoRecorder;

const VideoCountDown = ({ onEnd }: { onEnd: () => void }) => {
    const [countdown, setCountDown] = useState(3);

    useEffect(() => {
        let timerId = setInterval(() => {
            setCountDown(prev => (prev > 0 ? prev - 1 : prev));
        }, 1000);

        return () => {
            onEnd();
            clearInterval(timerId);
        };
    }, [onEnd]);

    if (countdown === 0) return null;

    return (
        <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center z-10">
            <h3 className="text-xl font-semibold text-white">{countdown}</h3>
        </div>
    );
};
