"use client";

import React, { FormEvent } from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Portal,
    Selection,
} from "@/components";

import AddNewQuestionSection from "../components/AddNewQuestionSection";

import QuestionSection from "./components/QuestionSection";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const NewOneWayInterview = () => {
    const [showCreate, setShowCreate] = React.useState(false);
    const [questionSections, setQuestionSections] = React.useState<any[]>([]);

    const handleCreateOneWay = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="bg-white py-4 shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 font-medium px-4 xl:px-6 mb-8">
                Create your video interview
            </h2>

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
                            required
                        />

                        <div className="w-1/3">
                            <Selection
                                title="Due date"
                                items={[
                                    "In 7 days",
                                    "In 1 month",
                                    "In 3 days",
                                ].map(item => ({ label: item, value: item }))}
                                onChange={() => {}}
                                required
                            />
                        </div>
                    </div>

                    <div className=" flex flex-col gap-4 mb-6 px-4 xl:px-6">
                        <h3 className="text-neutral-700 font-medium">
                            Welcome note
                        </h3>
                        <QuillEditorNoSSR
                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                            onChange={(value: string) => {}}
                            className="min-h-[320px] rounded-md overflow-hidden"
                            theme="snow"
                        />
                    </div>
                </section>

                <section>
                    <h3 className="text-neutral-700 font-medium mb-4 p-4 xl:px-6 bg-slate-100">
                        Questions
                    </h3>

                    {questionSections.length > 0 && (
                        <div className="px-4 xl:px-6 mb-6">
                            <ul className="flex flex-col gap-6">
                                {questionSections.map(section => (
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
                    )}

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

                <section>
                    <h3 className="text-lg text-neutral-700 font-semibold bg-slate-100 p-4 xl:px-6 mb-6">
                        Epilogue
                    </h3>

                    <div className="flex gap-6 mb-6 px-4 xl:px-6">
                        <CustomInput
                            title="Title"
                            type="text"
                            placeholder="Thanks for sharing this video with 123"
                            required
                        />

                        <div className="w-1/3"></div>
                    </div>

                    <div className="min-h-[320px] flex flex-col gap-4 mb-6 px-4 xl:px-6">
                        <h3 className="text-neutral-700 font-medium">
                            Outro note{" "}
                            <span className="text-neutral-500 font-normal text-sm">
                                (Optional)
                            </span>
                        </h3>
                        <QuillEditorNoSSR
                            placeholder="We'll be watching your interview soon and will contact you about the next steps"
                            onChange={(value: string) => {}}
                            className="flex-1 border border-slate-400 rounded-md overflow-hidden"
                            theme="snow"
                        />
                    </div>
                </section>

                <section>
                    <h3 className="text-lg text-neutral-700 font-semibold bg-slate-100 p-4 xl:px-6 mb-6">
                        Settings
                    </h3>
                    <div className="flex justify-between gap-4 p-4 xl:px-6">
                        <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-md">
                            <input
                                id="tops-and-questions"
                                type="radio"
                                value=""
                                name="assessment-visibility"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="tops-and-questions"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >
                                <div>
                                    <h4 className="text-neutral-700 text-base font-semibold">
                                        Topics & questions
                                    </h4>
                                    <p className="text-neutral-500 text-sm">
                                        Allow candidates to preview both topics
                                        & questions, before starting the
                                        interview.
                                    </p>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-md">
                            <input
                                id="topics-only"
                                type="radio"
                                value=""
                                name="assessment-visibility"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="topics-only"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >
                                <div>
                                    <h4 className="text-neutral-700 text-base font-semibold">
                                        Topics only
                                    </h4>
                                    <p className="text-neutral-500 text-sm">
                                        Allow candidates to preview topics only,
                                        before starting the interview.
                                    </p>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center gap-2 p-4 border border-gray-300 rounded-md">
                            <input
                                id="assessment-hidden"
                                type="radio"
                                value=""
                                name="assessment-visibility"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="assessment-hidden"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                            >
                                <div>
                                    <h4 className="text-neutral-700 text-base font-semibold">
                                        No visibility
                                    </h4>
                                    <p className="text-neutral-500 text-sm">
                                        Don&apos;t allow candidates to preview
                                        the content of the interview
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                <div className="flex items-center justify-end gap-4 p-4 xl:px-6">
                    <ButtonOutline>Save & continue</ButtonOutline>
                    <Button>Save all changes</Button>
                </div>
            </form>
        </div>
    );
};

export default NewOneWayInterview;
