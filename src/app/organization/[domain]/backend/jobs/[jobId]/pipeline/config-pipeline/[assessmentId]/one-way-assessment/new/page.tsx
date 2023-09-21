"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { ButtonOutline, CustomInput, Portal, Selection } from "@/components";
import { oneWayQuestions } from "@/utils/shared/initialDatas";

import AddNewQuestionSection from "../components/AddNewQuestionSection";

import QuestionSection from "./components/QuestionSection";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const NewOneWayInterview = () => {
    const [showCreate, setShowCreate] = React.useState(false);
    const [questionSections, setQuestionSections] =
        React.useState(oneWayQuestions);

    return (
        <div className="bg-white py-4 shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 font-medium px-4 xl:px-6 mb-8">
                Create your video interview
            </h2>

            <h3 className="text-lg text-neutral-700 font-semibold bg-slate-100 p-4 xl:px-6 mb-6">
                Welcome page info
            </h3>

            <div className="flex gap-6 mb-6 px-4 xl:px-6">
                <CustomInput
                    title="Title"
                    type="text"
                    placeholder="One-way interview - UX researcher at 123"
                    required
                />

                <div className="w-1/3">
                    <Selection
                        title="Due date"
                        datas={["In 7 days", "In 1 month", "In 3 days"]}
                        onChange={() => {}}
                        required
                    />
                </div>
            </div>

            <div className="min-h-[320px] flex flex-col gap-4 mb-6 px-4 xl:px-6">
                <h3 className="text-neutral-700 font-medium">Welcome note</h3>
                <QuillEditorNoSSR
                    placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                    onChange={(value: string) => {}}
                    className="flex-1 border border-slate-400 rounded-md overflow-hidden"
                    theme="snow"
                />
            </div>

            <section>
                <h3 className="text-neutral-700 font-medium mb-4 p-4 xl:px-6 bg-slate-100">
                    Questions
                </h3>

                <div className="px-4 xl:px-6 mb-6">
                    <ul className="flex flex-col gap-6">
                        {questionSections?.map(section => (
                            <li key={section.id}>
                                <QuestionSection
                                    data={section}
                                    onUpdate={updatedSection =>
                                        setQuestionSections(prev =>
                                            prev.map(item => {
                                                if (
                                                    item.id ===
                                                    updatedSection.id
                                                ) {
                                                    return updatedSection;
                                                }
                                                return item;
                                            })
                                        )
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4 px-4 xl:px-6">
                    {showCreate ? (
                        <AddNewQuestionSection
                            onFinish={() => setShowCreate(false)}
                            onSaveTopic={(section: any) =>
                                setQuestionSections(prev =>
                                    prev.concat([
                                        {
                                            ...section,
                                            id: questionSections.length,
                                        },
                                    ])
                                )
                            }
                        />
                    ) : (
                        <button
                            type="button"
                            className="relative flex items-center justify-center overflow-hidden text-sm font-medium text-blue_primary_600 rounded-lg group border border-dashed border-gray-400 transition-all ease-in duration-75 w-full hover:border-blue_primary_800 hover:text-blue_primary_800"
                            onClick={() => setShowCreate(true)}
                        >
                            <span className="relative py-4 px-5 flex items-center">
                                <PlusCircleIcon className="w-4 h-4 mr-1" />
                                Create new topic
                            </span>
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NewOneWayInterview;
