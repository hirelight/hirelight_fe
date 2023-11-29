import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

import { Button, ButtonOutline, CountdownTimer } from "@/components";
import ProgressTimer from "@/components/ProgressTimer";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";
import { IAsyncAnswer } from "@/services";
import { uploadFile } from "@/helpers";

import { AnswerState, useAsyncVideoAssessment } from "./AsyncVideoAssessment";
import styles from "./ActionSection.module.scss";
import { useVideoRecorder } from "./VideoRecorder";

const mimeType = 'video/webm; codecs="opus,vp8"';

type ActionSectionProps = {
    mediaRecorder: MediaRecorder | null;
    selectedAnswer: IAsyncAnswer;
    startRecording: () => void;
};

const ActionSection: React.FC<ActionSectionProps> = ({
    selectedAnswer,
    startRecording,

    mediaRecorder,
}) => {
    const {
        answers,
        curPos,
        stream,
        assessmentData,
        applicantDetail,
        handleJoinTest,
        setCurPos,
        handleTrackTest,
        assessmentLoading,
    } = useAsyncVideoAssessment();
    const {
        isBreak,
        setIsBreak,
        recordingStatus,
        setRecordingStatus,
        videoChunks,
        setVideoChunks,
        isUploading,
        setIsUploading,
    } = useVideoRecorder();

    const router = useRouter();

    const [remainThinkTime, setRemainThinkTime] = useState<number>();
    const [outTime, setOutTime] = useState<Date>();
    const [isRetake, setIsRetake] = useState(false);

    const canRecord = useMemo(
        () =>
            selectedAnswer &&
            (!selectedAnswer.content.files ||
                selectedAnswer.content.files!!.length <
                    selectedAnswer.content.config!!.numOfTakes),
        [selectedAnswer]
    );

    const canMoveNext = useMemo(
        () =>
            selectedAnswer &&
            selectedAnswer.content.files &&
            curPos < answers.length - 1,
        [answers.length, curPos, selectedAnswer]
    );

    const canFinishAssessment = useMemo(
        () =>
            assessmentData &&
            answers.every(
                ans => ans.content.files && ans.content.files.length > 0
            ) &&
            recordingStatus === "inactive" &&
            !isBreak &&
            !isUploading &&
            assessmentData.status ===
                ApplicantAssessmentDetailStatus.IN_PROGRESS,
        [answers, assessmentData, isBreak, isUploading, recordingStatus]
    );

    const handleGotoReview = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        localStorage.removeItem(applicantDetail.id);
        router.push(`${applicantDetail.id}/review`);
    }, [applicantDetail.id, router, stream]);

    const handleStartRecord = () => {
        setIsBreak(true);
        setRemainThinkTime(0);
        const curStateString = localStorage.getItem(applicantDetail.id);
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString) as AnswerState;

            if (parsedCurState) parsedCurState.isThinkEnd = true;

            localStorage.setItem(
                applicantDetail.id,
                JSON.stringify(parsedCurState)
            );
        } else {
            localStorage.setItem(
                applicantDetail.id,
                JSON.stringify({
                    isThinkEnd: true,
                })
            );
        }
    };

    const handleMoveNext = useCallback(() => {
        const curStateString = localStorage.getItem(applicantDetail.id);
        if (canMoveNext) {
            if (curStateString) {
                let parsedCurState = JSON.parse(curStateString);
                parsedCurState = {
                    ...parsedCurState,
                    startRecordTime: parsedCurState.startRecordTime
                        ? parsedCurState.startRecordTime
                        : new Date(),
                    answerPos: curPos + 1,
                    startQuestionTime: new Date(),
                    isThinkEnd: undefined,
                };

                localStorage.setItem(
                    applicantDetail.id,
                    JSON.stringify(parsedCurState)
                );
            }
            setIsRetake(false);
            setCurPos(curPos + 1);
            setRemainThinkTime(undefined);
        } else {
            if (!canRecord) {
                handleGotoReview();
            }
        }
    }, [
        applicantDetail.id,
        canMoveNext,
        canRecord,
        curPos,
        handleGotoReview,
        setCurPos,
    ]);

    const stopRecording = useCallback(() => {
        setRecordingStatus("inactive");
        if (!mediaRecorder) return;

        mediaRecorder.stop();
        mediaRecorder.onstop = async () => {
            setIsUploading(true);
            try {
                const videoBlob = new Blob(videoChunks, { type: mimeType });
                const myFile = new File([videoBlob], `takes-${uuid()}`, {
                    type: mimeType,
                });

                const url = await uploadFile(myFile);
                const updatedAns = produce(selectedAnswer, draft => {
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

                await handleTrackTest(updatedAns);

                setVideoChunks([]);
                setIsBreak(false);

                // Check if out of takes auto go to next question
                if (
                    selectedAnswer &&
                    selectedAnswer.content.files &&
                    selectedAnswer.content.files!!.length ===
                        selectedAnswer.content.config!!.numOfTakes - 1
                ) {
                    handleMoveNext();
                } else setIsRetake(true);

                setIsUploading(false);
            } catch (error) {
                console.error(error);
                setIsUploading(false);
            }
        };
    }, [
        handleMoveNext,
        handleTrackTest,
        mediaRecorder,
        setRecordingStatus,
        setVideoChunks,
        selectedAnswer,
        setIsBreak,
        videoChunks,
        setIsUploading,
    ]);

    // Auto start record time
    useEffect(() => {
        if (canRecord && !isRetake && remainThinkTime === 0) {
            console.log("Use effect");
            setIsBreak(true);
        }
    }, [
        answers,
        curPos,
        canRecord,
        startRecording,
        remainThinkTime,
        setIsBreak,
        isRetake,
    ]);

    useEffect(() => {
        const curStateString = localStorage.getItem(applicantDetail.id);
        if (curStateString) {
            let parsedCurState = JSON.parse(curStateString) as AnswerState;
            setOutTime(parsedCurState.outTime);
        }
    }, [applicantDetail.id]);

    // Tracking current assessment state when get out
    useEffect(() => {
        function saveCurAnswerState(e: BeforeUnloadEvent) {
            e.preventDefault();
            if (recordingStatus === "recording") {
                stopRecording();
            }
            const curStateString = localStorage.getItem(applicantDetail.id);
            if (curStateString) {
                let parsedCurState = JSON.parse(curStateString) as AnswerState;
                parsedCurState = {
                    ...parsedCurState,
                    answerPos: curPos,
                    outTime: new Date(),
                };
                localStorage.setItem(
                    applicantDetail.id,
                    JSON.stringify(parsedCurState)
                );
            } else {
                const currentState = {
                    answerPos: curPos,
                    outTime: new Date(),
                };

                localStorage.setItem(
                    applicantDetail.id,
                    JSON.stringify(currentState)
                );
            }

            if (stream) {
                stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
        window.addEventListener("beforeunload", function (e) {
            e.preventDefault();
            return `You have unsaved changes! Do you really want to leave?`;
        });
        window.addEventListener("unload", saveCurAnswerState);
        return () => {
            window.removeEventListener("beforeunload", function (e) {
                e.preventDefault();
                return `You have unsaved changes! Do you really want to leave?`;
            });
            window.removeEventListener("unload", saveCurAnswerState);
        };
    }, [
        curPos,
        answers,
        recordingStatus,
        stopRecording,
        applicantDetail.id,
        stream,
    ]);

    // Get the remain think time
    useEffect(() => {
        let startQuestionTime;
        const curStateString = localStorage.getItem(applicantDetail.id);

        if (typeof window !== "undefined" && selectedAnswer) {
            if (curStateString) {
                const parsed = JSON.parse(curStateString) as AnswerState;
                startQuestionTime = parsed.startQuestionTime ?? new Date();

                const eslapseTime = moment(startQuestionTime)
                    .add(selectedAnswer.content.config!!.thinkTime, "seconds")
                    .diff(moment(), "seconds");

                console.log(eslapseTime);
                if (parsed.isThinkEnd) setRemainThinkTime(0);
                else setRemainThinkTime(eslapseTime);
            } else
                setRemainThinkTime(selectedAnswer.content.config!!.thinkTime);
        }
    }, [answers, applicantDetail.id, curPos, selectedAnswer]);

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

    return (
        <React.Fragment>
            {remainThinkTime && remainThinkTime > 0 && !isBreak ? (
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

            {selectedAnswer && recordingStatus === "recording" && (
                <div className="my-4">
                    <ProgressTimer
                        title="Answer time"
                        targetDate={moment()
                            .add(
                                selectedAnswer.content.config!!.duration,
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
                    !isUploading &&
                    (selectedAnswer.content.files &&
                    selectedAnswer.content.files!!.length > 0 ? (
                        <RetakeCountDown
                            onClick={() => {
                                setIsRetake(false);
                                setIsBreak(true);
                            }}
                            onEnd={handleMoveNext}
                            loading={isUploading}
                        />
                    ) : (
                        <Button
                            disabled={isUploading}
                            onClick={handleStartRecord}
                            type="button"
                        >
                            Start Recording
                        </Button>
                    ))}

                {recordingStatus === "recording" && (
                    <ButtonOutline
                        isLoading={isUploading}
                        onClick={stopRecording}
                        type="button"
                    >
                        Stop Recording
                    </ButtonOutline>
                )}
                {canMoveNext && !isBreak && recordingStatus === "inactive" && (
                    <ButtonOutline
                        disabled={isUploading}
                        onClick={handleMoveNext}
                        type="button"
                    >
                        Next question
                    </ButtonOutline>
                )}
            </div>

            {canFinishAssessment && (
                <div className="flex justify-center">
                    <ButtonOutline
                        disabled={isUploading}
                        onClick={handleGotoReview}
                    >
                        Finish assessment
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
            )}
        </React.Fragment>
    );
};

export default ActionSection;

const RetakeCountDown = ({
    onEnd,
    onClick,
    loading,
}: {
    onEnd: () => void;
    onClick: () => void;
    loading: boolean;
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
        <Button type="button" disabled={loading} onClick={onClick}>
            Retake {countdown}
        </Button>
    );
};
