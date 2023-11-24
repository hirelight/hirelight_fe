import {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
    createContext,
    useContext,
} from "react";
import { toast } from "react-toastify";
import { produce } from "immer";
import moment from "moment";

import { Button, ButtonOutline, CountdownTimer, Selection } from "@/components";
import { SpinLoading } from "@/icons";
import { uploadFile } from "@/helpers";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import ProgressTimer from "@/components/ProgressTimer";

import styles from "./VideoRecorder.module.scss";
import { AnswerState, useAsyncVideoAssessment } from "./AsyncVideoAssessment";
import DevicesSection from "./DevicesSection";
import ActionSection from "./ActionSection";

const mimeType = 'video/webm; codecs="opus,vp8"';
// const mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';

type VideoRecorderProps = {};

type VideoRecorderState = {
    isBreak: boolean;
    setIsBreak: React.Dispatch<React.SetStateAction<boolean>>;

    isUploading: boolean;
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;

    recordingStatus: "inactive" | "recording";
    setRecordingStatus: React.Dispatch<
        React.SetStateAction<"inactive" | "recording">
    >;

    videoChunks: Blob[];
    setVideoChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
};

const VideoRecorderContext = createContext<VideoRecorderState | null>(null);

export const useVideoRecorder = (): VideoRecorderState => {
    const context = useContext(VideoRecorderContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

const VideoRecorder: React.FC<VideoRecorderProps> = () => {
    const {
        applicantDetail,
        answers,
        curPos,
        permission,
        stream,
        assessmentData,
        handleJoinTest,
    } = useAsyncVideoAssessment();

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const liveVideoFeed = useRef<HTMLVideoElement>(null);
    const [recordingStatus, setRecordingStatus] = useState<
        "inactive" | "recording"
    >("inactive");
    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const [isBreak, setIsBreak] = useState(false);

    const handleSaveStartRecordTime = useCallback(() => {
        const curStateString = localStorage.getItem(applicantDetail.id);
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString) as AnswerState;
            if (!parsedCurState.startRecordTime) {
                parsedCurState = {
                    ...parsedCurState,
                    startRecordTime: new Date(),
                    answerPos: curPos,
                };
            }

            localStorage.setItem(
                applicantDetail.id,
                JSON.stringify(parsedCurState)
            );
        }
    }, [applicantDetail.id, curPos]);

    const startRecording = useCallback(async () => {
        setRecordingStatus("recording");
        setIsBreak(false);
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
    }, [handleSaveStartRecordTime, stream]);

    useEffect(() => {
        if (liveVideoFeed.current && stream)
            liveVideoFeed.current.srcObject = new MediaStream(
                stream.getVideoTracks()
            );
    }, [stream]);

    return (
        <VideoRecorderContext.Provider
            value={{
                isBreak,
                setIsBreak,
                recordingStatus,
                setRecordingStatus,
                videoChunks,
                setVideoChunks,
                isUploading,
                setIsUploading,
            }}
        >
            <main className="max-w-[300px] h-full relative">
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
                        <VideoCountDown
                            onEnd={() => {
                                startRecording();
                            }}
                        />
                    )}
                    {isUploading && (
                        <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center z-10">
                            <SpinLoading className="w-10 h-10 text-blue_primary_600" />
                        </div>
                    )}
                </div>

                <DevicesSection />

                {answers[curPos] && (
                    <ActionSection
                        mediaRecorder={mediaRecorder.current}
                        selectedAnswer={answers[curPos]}
                        startRecording={startRecording}
                    />
                )}

                {!assessmentData && (
                    <div className="flex justify-center">
                        <ButtonOutline onClick={handleJoinTest}>
                            {applicantDetail.status ===
                            ApplicantAssessmentDetailStatus.IN_PROGRESS
                                ? "Resume"
                                : "Start interview"}
                        </ButtonOutline>
                    </div>
                )}

                {/* {remainThinkTime && remainThinkTime > 0 && !isBreak ? (
                <div className="my-4">
                    <ProgressTimer
                        title="Think time"
                        targetDate={moment()
                            .add(remainThinkTime, "seconds")
                            .toDate()}
                        onEnd={handleStartRecord}
                    />
                </div>
            ) : null}

            {answers[curPos] && recordingStatus === "recording" && (
                <div className="my-4">
                    <ProgressTimer
                        title="Answer time"
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
                    !isBreak &&
                    recordingStatus === "inactive" &&
                    (answers[curPos].content.files &&
                    answers[curPos].content.files!!.length > 0 ? (
                        <RetakeCountDown
                            onClick={() => {
                                setIsRetake(false);
                                setIsBreak(true);
                            }}
                            onEnd={handleMoveNext}
                        />
                    ) : (
                        <Button onClick={handleStartRecord} type="button">
                            Start Recording
                        </Button>
                    ))}

                {recordingStatus === "recording" && (
                    <ButtonOutline onClick={stopRecording} type="button">
                        Stop Recording
                    </ButtonOutline>
                )}
                {canMoveNext && !isBreak && recordingStatus === "inactive" && (
                    <ButtonOutline onClick={handleMoveNext} type="button">
                        Next question
                    </ButtonOutline>
                )}
            </div>

            {!assessmentData && (
                <div className="flex justify-center">
                    <ButtonOutline onClick={handleJoinTest}>
                        {applicantDetail.status ===
                        ApplicantAssessmentDetailStatus.IN_PROGRESS
                            ? "Resume"
                            : "Start interview"}
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

            {assessmentData && (
                <div className="absolute left-1/2 bottom-6 -translate-x-1/2">
                    <CountdownTimer
                        targetDate={moment
                            .utc(assessmentData.startTime)
                            .add(assessmentData.assessment.duration, "seconds")
                            .toDate()}
                    />
                </div>
            )} */}
            </main>
        </VideoRecorderContext.Provider>
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
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            onEnd();
        }
    }, [onEnd, countdown]);

    return (
        <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center z-10">
            <h3 className="text-xl font-semibold text-white">{countdown}</h3>
        </div>
    );
};

const RetakeCountDown = ({
    onEnd,
    onClick,
}: {
    onEnd: () => void;
    onClick: () => void;
}) => {
    const [countdown, setCountDown] = useState(15);

    useEffect(() => {
        let timerId = setInterval(() => {
            setCountDown(prev => (prev > 0 ? prev - 1 : prev));
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            onEnd();
        }
    }, [onEnd, countdown]);

    return (
        <Button type="button" onClick={onClick}>
            Retake {countdown}
        </Button>
    );
};
