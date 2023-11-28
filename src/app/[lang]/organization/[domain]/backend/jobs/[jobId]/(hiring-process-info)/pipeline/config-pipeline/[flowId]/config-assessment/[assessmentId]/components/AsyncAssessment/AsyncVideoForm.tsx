import React, { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Modal,
    Portal,
    QuestionPicker,
    Selection,
    Timer,
} from "@/components";
import {
    IAssessmentDto,
    IEditAsyncVideoInterviewDto,
    IQuestionAnswerDto,
} from "@/services";
import assessmentsServices from "@/services/assessments/assessments.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { QuestionAnswerContentJson } from "@/interfaces/questions.interface";
import { extractTextFromHtml, isInvalidForm } from "@/helpers";

import QuestionSection from "./QuestionSection";

const AddNewQuestionSection = dynamic(() => import("./AddNewQuestionSection"));

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <div className="min-h-[300px] border border-gray-300"></div>,
});

export type AsyncQuestionType = Omit<IQuestionAnswerDto, "content"> & {
    content: QuestionAnswerContentJson;
};

type AsyncVideoForm = Omit<IEditAsyncVideoInterviewDto, "content"> & {
    content: {
        welcomeNote: string;
    };
};

const AsyncVideoForm = () => {
    const { flowId } = useParams();
    const assessment = useAppSelector(state => state.assessment.data);

    const queryClient = useQueryClient();

    const [showPicker, setShowPicker] = React.useState(false);
    const [showCreate, setShowCreate] = React.useState(false);
    const [questions, setQuestions] = React.useState<AsyncQuestionType[]>(
        assessment.assessmentQuestionAnswerSetContent
            ? JSON.parse(assessment.assessmentQuestionAnswerSetContent)
            : []
    );

    const [isLoading, setIsLoading] = useState(false);

    const [formErr, setFormErr] = useState({
        nameErr: "",
        questionsErr: "",
        descriptionErr: "",
    });
    const [formState, setFormState] = React.useState<AsyncVideoForm>({
        id: "",
        name: "",
        description: "",
        content: {
            welcomeNote: "",
        },
        query: "",
        duration: 0,
        index: 0,
        assessmentQuestionAnswerSetContent: "",
    });

    const inValidInput = (): boolean => {
        const { name, duration, description } = formState;

        let error = formErr;

        if (!name) error.nameErr = "Assessment name must not be blank";

        if (questions.length < 1)
            error.questionsErr = "Please select at least 1 question";

        if (extractTextFromHtml(description).length < 100)
            error.descriptionErr = "Description must at least 100 characters";

        if (isInvalidForm(error)) {
            setFormErr({ ...error });
            toast.error(
                <div>
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
            return true;
        }
        return false;
    };

    const handleCreateOneWay = async (e: FormEvent) => {
        e.preventDefault();
        if (inValidInput()) return;

        setIsLoading(true);
        try {
            const sumOfDuration =
                questions.reduce((prev, cur) => {
                    const sum =
                        cur.content.config!!.duration *
                            cur.content.config!!.numOfTakes +
                        cur.content.config!!.numOfTakes * 3 +
                        cur.content.config!!.thinkTime *
                            cur.content.config!!.numOfTakes;
                    return prev + sum;
                }, 0) +
                10 * 60;
            const res = await assessmentsServices.editAsync({
                ...formState,
                content: JSON.stringify(formState.content),
                assessmentQuestionAnswerSetContent: JSON.stringify(questions),
                duration: sumOfDuration,
            });

            queryClient.invalidateQueries({
                queryKey: ["assessmentFlow", flowId],
            });
            toast.success(res.message);
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (assessment.id) {
            setQuestions(
                assessment.assessmentQuestionAnswerSetContent
                    ? JSON.parse(assessment.assessmentQuestionAnswerSetContent)
                    : []
            );
            setFormState({
                id: assessment.id,
                name: assessment.name,
                description: assessment.description ?? "",
                content: assessment.content
                    ? JSON.parse(assessment.content)
                    : {
                          welcomeNote: "",
                      },
                query: assessment.query ?? "",
                duration: assessment.duration ?? 0,
                index: assessment.index,
                assessmentQuestionAnswerSetContent:
                    assessment.assessmentQuestionAnswerSetContent ?? "",
            });
        }
    }, [assessment]);

    return (
        <React.Fragment>
            <Portal>
                <Modal
                    isOpen={showPicker}
                    onClose={() => setShowPicker(false)}
                    className="min-w-[500px] p-6 bg-white"
                >
                    <QuestionPicker
                        query={{ type: "essay" }}
                        pickedQuestions={questions.map(item => ({
                            ...item,
                            content: JSON.stringify(item.content),
                        }))}
                        onPickedChange={newQuestions => {
                            setQuestions(
                                newQuestions.map(item =>
                                    produce(
                                        {
                                            ...item,
                                            content: JSON.parse(item.content),
                                        },
                                        draft => {
                                            if (!draft.content.config) {
                                                draft.content.config = {
                                                    thinkTime: 0,
                                                    numOfTakes: 1,
                                                    duration: 60,
                                                };
                                            }
                                        }
                                    )
                                )
                            );
                            setFormErr({
                                ...formErr,
                                questionsErr: "",
                            });
                            setShowPicker(false);
                        }}
                    />
                </Modal>
            </Portal>
            <form onSubmit={handleCreateOneWay} className="flex flex-col gap-8">
                <section>
                    <h3 className="text-lg text-neutral-700 font-semibold bg-slate-100 p-4 xl:px-6 mb-6">
                        Welcome page info
                    </h3>

                    <div className="flex items-start gap-6 mb-6 px-4 xl:px-6">
                        <CustomInput
                            title="Title"
                            id="one-way-assessment__title"
                            name="one-way-assessment__title"
                            type="text"
                            placeholder="One-way interview - UX researcher at 123"
                            value={formState.name}
                            onChange={e => {
                                setFormState({
                                    ...formState,
                                    name: e.target.value,
                                });
                                setFormErr({
                                    ...formErr,
                                    nameErr: "",
                                });
                            }}
                            errorText={formErr.nameErr}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-4 mb-6 px-4 xl:px-6">
                        <h3 className="text-neutral-700 font-medium">
                            Description
                        </h3>
                        <QuillEditorNoSSR
                            placeholder="Enter the job description here; include key areas of
        responsibility and what the candidate might do on a typical
        day."
                            value={formState.description}
                            onChange={(value: string) => {
                                setFormState({
                                    ...formState,
                                    description: value,
                                });
                                setFormErr({
                                    ...formErr,
                                    descriptionErr: "",
                                });
                            }}
                            className="min-h-[250px]"
                            theme="snow"
                            errorText={formErr.descriptionErr}
                        />
                    </div>
                </section>

                <section>
                    <div className="text-neutral-700 font-medium mb-4 p-4 flex items-center justify-between xl:px-6 bg-slate-100">
                        <h3 className="flex items-center gap-4">
                            Questions{" "}
                            {formErr.questionsErr !== "" && (
                                <p className="ml-auto text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">
                                        {formErr.questionsErr}
                                    </span>
                                </p>
                            )}
                        </h3>
                        <button
                            type="button"
                            className="text-sm font-semibold text-blue_primary_700 hover:text-blue_primary_800 hover:underline"
                            onClick={() => setShowPicker(true)}
                        >
                            Import questions
                        </button>
                    </div>

                    {questions.length > 0 && (
                        <div className="px-4 xl:px-6 mb-6">
                            <ul className="flex flex-col gap-6">
                                {questions?.map(question => (
                                    <li key={question.id}>
                                        <QuestionSection
                                            data={question}
                                            datas={questions}
                                            onReorder={newOrder =>
                                                setQuestions(newOrder)
                                            }
                                            onUpdate={updatedQuestion => {
                                                setQuestions(prev =>
                                                    prev.map(ques =>
                                                        ques.id ===
                                                        updatedQuestion.id
                                                            ? updatedQuestion
                                                            : ques
                                                    )
                                                );
                                            }}
                                            onDelete={() =>
                                                setQuestions(prev =>
                                                    prev.filter(
                                                        item =>
                                                            item.id !==
                                                            question.id
                                                    )
                                                )
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mb-4 px-4 xl:px-6">
                        {showCreate ? (
                            <AddNewQuestionSection
                                onFinish={() => setShowCreate(false)}
                                onSaveTopic={(
                                    newQuestion: AsyncQuestionType
                                ) => {
                                    setQuestions(prev =>
                                        prev.concat([newQuestion])
                                    );
                                    setFormErr({
                                        ...formErr,
                                        questionsErr: "",
                                    });
                                }}
                            />
                        ) : (
                            <button
                                type="button"
                                className="relative flex items-center justify-center overflow-hidden text-sm font-medium text-blue_primary_600 rounded-lg group border border-dashed border-gray-400 transition-all ease-in duration-75 w-full hover:border-blue_primary_800 hover:text-blue_primary_800"
                                onClick={() => setShowCreate(true)}
                            >
                                <span className="relative py-4 px-5 flex items-center">
                                    <PlusCircleIcon className="w-5 h-5 mr-1" />
                                    Create new topic
                                </span>
                            </button>
                        )}
                    </div>
                </section>

                <div className="flex items-center justify-end gap-4 p-4 xl:px-6">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        Save all changes
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default AsyncVideoForm;
