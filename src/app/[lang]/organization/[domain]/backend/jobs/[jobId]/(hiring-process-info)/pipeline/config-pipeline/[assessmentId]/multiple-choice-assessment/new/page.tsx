"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { Button, ButtonOutline, CustomInput, Selection } from "@/components";
import { Logo } from "@/icons";

import styles from "./styles.module.scss";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const NewMCAssessment = () => {
    return (
        <div className="bg-white py-6 drop-shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                Create multiple choice question set
            </h2>
            <form>
                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
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
                                datas={["In 7 days", "In 1 month", "In 3 days"]}
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
                    <div className="flex flex-col gap-4 mb-4 px-4 xl:px-6">
                        <div>
                            <strong>Accuracy</strong>
                            <div></div>
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

export default NewMCAssessment;
