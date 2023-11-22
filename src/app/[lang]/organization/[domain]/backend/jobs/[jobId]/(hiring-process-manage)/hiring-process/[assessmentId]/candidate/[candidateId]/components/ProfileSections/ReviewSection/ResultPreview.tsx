import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IJobPostAppAssDetailDto, IQuestionAnswerDto } from "@/services";
import { QuestionAnswerContentJson } from "@/interfaces/questions.interface";
import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import { useAppSelector } from "@/redux/reduxHooks";

type ResultPreviewProps = {
    isOpen: boolean;
    close: () => void;
    result?: any;
    data: IJobPostAppAssDetailDto;
};

const ResultPreview: React.FC<ResultPreviewProps> = ({
    isOpen,
    close,
    data,
}) => {
    const assessment = useAppSelector(
        state =>
            state.assessmentFlow.data.assessments.find(
                assessment => assessment.id === data.assessmentId
            )!!
    );
    const [result, setResult] = useState<any[]>([]);

    const getResultOnType = (type: AssessmentTypeKey, result: any[]) => {
        switch (type) {
            case "MULTIPLE_CHOICE_QUESTION_ASSESSMENT":
                return <MCQResult results={result} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (
            data.assessment.assessmentTypeName ===
            "MULTIPLE_CHOICE_QUESTION_ASSESSMENT"
        ) {
            const parsedTest = JSON.parse(
                assessment.assessmentQuestionAnswerSetContent as string
            ) as IQuestionAnswerDto[];
            const parsedAnswers = JSON.parse(
                data.questionAnswerSet
            ) as IQuestionAnswerDto[];

            const answerMap = new Map<
                string,
                Omit<IQuestionAnswerDto, "content"> & {
                    content: QuestionAnswerContentJson;
                }
            >();

            parsedAnswers.forEach(item => {
                if (!answerMap.has(item.id)) {
                    answerMap.set(item.id, {
                        ...item,
                        content: JSON.parse(
                            item.content
                        ) as QuestionAnswerContentJson,
                    });
                }
            });

            parsedTest.forEach(item => {
                const isExist = answerMap.get(item.id);
                if (isExist) {
                    answerMap.set(item.id, {
                        ...isExist,
                        content: {
                            ...isExist.content,
                            answers: isExist.content.answers.map(
                                (ans, index) => ({
                                    ...ans,
                                    ...JSON.parse(item.content).answers[index],
                                })
                            ),
                        },
                    });
                }
            });

            setResult(Array.from(answerMap.values()));
        } else {
            setResult(JSON.parse(data.questionAnswerSet));
        }
    }, [
        assessment.assessmentQuestionAnswerSetContent,
        data.assessment.assessmentTypeName,
        data.questionAnswerSet,
    ]);

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full max-h-screen items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-neutral-900 mb-6"
                                >
                                    {data.assessment.name}
                                </Dialog.Title>
                                <div className="mt-2 max-h-[600px] overflow-auto">
                                    {result &&
                                        getResultOnType(
                                            data.assessment.assessmentTypeName,
                                            result
                                        )}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={close}
                                    >
                                        Result: {data.result}%
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ResultPreview;

const MCQResult = ({
    results,
}: {
    results: (Omit<IQuestionAnswerDto, "content"> & {
        content: QuestionAnswerContentJson;
    })[];
}) => {
    return (
        <div className="space-y-6 text-sm">
            {results?.map((item, quesNo) => (
                <section key={item.id}>
                    <p
                        className="ql-editor !p-0 font-semibold text-neutral-700 mb-2"
                        dangerouslySetInnerHTML={{ __html: item.content.name }}
                    ></p>

                    <ul className="space-y-2 pl-2">
                        {item.content.answers.map((ans, index) => (
                            <li
                                key={index}
                                className={`flex items-center font-medium gap-2  ${
                                    ans.isChosen && ans.isChosen !== ans.correct
                                        ? "text-red-600"
                                        : ans.correct
                                        ? "text-green-600"
                                        : ""
                                }`}
                            >
                                <input
                                    type={
                                        item.content.type === "one-answer"
                                            ? "radio"
                                            : "checkbox"
                                    }
                                    defaultChecked={ans.isChosen}
                                    className={`w-4 h-4 text-inherit bg-gray-100 border-gray-300 pointer-events-none`}
                                    readOnly={true}
                                />

                                <div
                                    className="ql-editor !p-0"
                                    dangerouslySetInnerHTML={{
                                        __html: ans.name,
                                    }}
                                ></div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};
