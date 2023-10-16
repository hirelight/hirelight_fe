"use client";

import React, { FormEvent } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

import styles from "../styles.module.scss";

const IdentitySection = () => {
    const handleSaveIdentityChages = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <section>
            <h2 className={styles.section__title}>Organization Indentity</h2>
            <form
                onSubmit={handleSaveIdentityChages}
                className={styles.section__content__wrapper}
            >
                <div className="p-6 text-neutral-700">
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold">Company Logo</h4>
                        <p className="text-sm text-neutral-500">
                            Workable displays your company’s logo in your
                            careers page, in emails to candidates as well as
                            some job boards.
                        </p>
                    </div>

                    <div className="mb-4">
                        <strong className="block mb-2 text-sm">Image</strong>
                        <div className="p-8 border border-dashed border-gray-400 rounded-md flex flex-col items-center gap-4"></div>
                    </div>

                    <div className="mb-4">
                        <strong className="block text-sm">
                            Company Introduction
                        </strong>
                        <p className="text-sm text-neutral-500 mb-4">
                            The company introduction helps other people know
                            briefly about your company
                        </p>
                        <div className="min-h-[200px] flex">
                            <QuillEditorNoSSR
                                theme="snow"
                                onChange={() => {}}
                                className="flex-1 border border-slate-400 rounded-md overflow-hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <strong className="block text-sm">
                            Company Description
                        </strong>
                        <p className="text-sm text-neutral-500 mb-4">
                            The company description helps to set you apart on
                            some job boards, including the Workable Job Board.
                            It also appears on welcome pages for features like
                            video interviews and assessments.
                        </p>
                        <div className="min-h-[200px] flex">
                            <QuillEditorNoSSR
                                theme="snow"
                                onChange={() => {}}
                                className="flex-1 border border-slate-400 rounded-md overflow-hidden"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-300">
                    <Button type="submit">Save changes</Button>
                </div>
            </form>
        </section>
    );
};

export default IdentitySection;
