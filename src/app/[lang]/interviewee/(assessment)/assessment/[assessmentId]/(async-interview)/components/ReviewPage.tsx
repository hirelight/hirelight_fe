import React, { useRef } from "react";
import { RadioGroup } from "@headlessui/react";

import { IAsyncAnswer, ICandidateAssessmentDetailDto } from "@/services";
import { VideoWrapper } from "@/components";
import { videoJsOptions } from "@/components/VideoWrapper";

import styles from "./ReviewPage.module.scss";

type ReviewPageProps = {
    data: ICandidateAssessmentDetailDto;
};

const ReviewPage: React.FC<ReviewPageProps> = ({ data }) => {
    const { questionAnswerSet, assessment } = data;
    const parseAnswerSet = useRef<IAsyncAnswer[]>(
        JSON.parse(questionAnswerSet!!)
    );

    return (
        <main className={styles.wrapper}>
            <div className="bg-white w-full max-w-screen-xl mx-auto rounded-md drop-shadow-lg flex">
                <div className={styles.chat_container}>
                    {parseAnswerSet.current.map(answer => (
                        <div
                            key={answer.id}
                            className={styles.content_container}
                        >
                            <RadioGroup className={styles.takes_wrapper}>
                                {answer.content.files?.map((vid, vidIndex) => (
                                    <RadioGroup.Option
                                        key={vidIndex}
                                        value={vid}
                                        className={({ active, checked }) =>
                                            `flex justify-center items-center relative rounded-md overflow-hidden border ${
                                                checked
                                                    ? "border-green-400"
                                                    : "border-slate-300"
                                            }`
                                        }
                                    >
                                        <VideoWrapper
                                            options={{
                                                ...videoJsOptions,
                                                sources: [
                                                    {
                                                        src: vid.src,
                                                        type: vid.type,
                                                    },
                                                ],
                                            }}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>
                {/* <div className="min-w-[300px] p-6 border-l border-gray-300">
                        <div className="mb-4 h-full">
                            <VideoRecorder devices={devices} stream={stream} />
                        </div>
                    </div> */}
            </div>
        </main>
    );
};

export default ReviewPage;
