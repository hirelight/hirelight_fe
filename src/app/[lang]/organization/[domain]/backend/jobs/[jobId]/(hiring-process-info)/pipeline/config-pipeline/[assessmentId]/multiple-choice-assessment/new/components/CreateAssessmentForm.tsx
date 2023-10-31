"use client";

import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Modal,
    Portal,
    Selection,
} from "@/components";
import { Logo } from "@/icons";

import styles from "./CreateAssessmentForm.module.scss";
import QuestionPickerModal from "./QuestionPickerModal";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const CreateAssessmentForm = () => {
    const [showQuestionPicker, setShowQuestionPicker] = useState(true);

    return (
        <>
            <Portal>
                <QuestionPickerModal
                    isOpen={showQuestionPicker}
                    onClose={() => setShowQuestionPicker(false)}
                />
            </Portal>
            <form>
                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Welcome page info
                    </h3>

                    <div className="flex items-start gap-6 mb-6 px-4 xl:px-6">
                        <CustomInput
                            title="Title"
                            id="multiple-choice-assessment__title"
                            name="multiple-choice-assessment__title"
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

                    <div className="flex flex-col gap-4 mb-6 px-4 xl:px-6">
                        <h3 className="text-neutral-700 font-medium">
                            Welcome note
                        </h3>
                        <QuillEditorNoSSR
                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                            onChange={(value: string) => {}}
                            className="min-h-[320px]"
                            theme="snow"
                        />
                    </div>
                </section>

                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Question
                    </h3>
                    <div className="mb-4 px-4 xl:px-6">
                        <button
                            type="button"
                            className="relative flex items-center justify-center overflow-hidden text-sm font-medium text-blue_primary_600 rounded-lg group border border-dashed border-gray-400 transition-all ease-in duration-75 w-full hover:border-blue_primary_800 hover:text-blue_primary_800"
                            onClick={() => setShowQuestionPicker(true)}
                        >
                            <span className="relative py-4 px-5 flex items-center">
                                <PlusCircleIcon className="w-5 h-5 mr-1" />
                                Create new topic
                            </span>
                        </button>
                    </div>
                </section>
                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Configuration
                    </h3>
                    <div className="flex flex-col gap-8 mb-4 px-4 xl:px-6">
                        <div className="flex justify-between items-start">
                            <strong>Accuracy</strong>
                            <div className="max-w-[400px] w-1/2">
                                <Selection
                                    title=""
                                    items={["80%", "50%", "25%"].map(item => ({
                                        label: item,
                                        value: item,
                                    }))}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <strong>Time</strong>
                            <div className="max-w-[400px] w-1/2">
                                <Selection
                                    title=""
                                    items={[
                                        "120 minutes",
                                        "60 minutes",
                                        "30 minutes",
                                    ].map(item => ({
                                        label: item,
                                        value: item,
                                    }))}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <strong>Number of questions</strong>
                            <div className="max-w-[400px] w-1/2 flex flex-col gap-6">
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Easy
                                    </span>
                                    <Selection
                                        title=""
                                        items={["1", "5", "10", "15"].map(
                                            item => ({
                                                label: item,
                                                value: item,
                                            })
                                        )}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Medium
                                    </span>
                                    <Selection
                                        title=""
                                        items={["1", "5", "10", "15"].map(
                                            item => ({
                                                label: item,
                                                value: item,
                                            })
                                        )}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Hard
                                    </span>
                                    <Selection
                                        title=""
                                        items={["1", "5", "10", "15"].map(
                                            item => ({
                                                label: item,
                                                value: item,
                                            })
                                        )}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Advance
                                    </span>
                                    <Selection
                                        title=""
                                        items={["1", "5", "10", "15"].map(
                                            item => ({
                                                label: item,
                                                value: item,
                                            })
                                        )}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <strong>Time</strong>
                            <div className="max-w-[400px] w-1/2">
                                <Selection
                                    title=""
                                    items={[
                                        "120 minutes",
                                        "60 minutes",
                                        "30 minutes",
                                    ].map(item => ({
                                        label: item,
                                        value: item,
                                    }))}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <label
                                htmlFor="shuffle-questions"
                                className="cursor-pointer"
                            >
                                <strong>Shuffle questions</strong>
                            </label>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input
                                    id="shuffle-questions"
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <label
                                htmlFor="shuffle-answers"
                                className="cursor-pointer"
                            >
                                <strong>Shuffle answers</strong>
                            </label>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input
                                    id="shuffle-answers"
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex items-center justify-end gap-4 p-4 xl:px-6">
                    <ButtonOutline type="button">Save & continue</ButtonOutline>
                    <Button type="submit">Save all changes</Button>
                </div>
            </form>
        </>
    );
};

export default CreateAssessmentForm;
