"use client";

import { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";

import { SearchIcon } from "@/icons";

import styles from "./styles.module.scss";
import EmailTemplateCard from "./components/EmailTemplateCard";
import templates from "./mock-data.json";

const EmailEditorNoSSR = dynamic(() => import("./components/EmailEditor"), {
    ssr: false,
});

export const metadata: Metadata = {
    title: "Hirelight - Templates - Hirelight",
};

const Templates = () => {
    const [search, setSearch] = React.useState("");

    return (
        <div className="w-full flex flex-col gap-8">
            <section>
                <h2 className={styles.section__title}>
                    Communication Templates
                </h2>
                <div className={styles.section__content__wrapper}>
                    <div className="py-1.5 px-4 border-b border-gray-300">
                        <div className="relative rounded-md shadow-sm max-w-[50%]">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <SearchIcon className="w-5 h-5 text-neutral-700" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-md border-0 py-2.5 pl-10 pr-20 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6 placeholder:text-sm"
                                placeholder="Start typing to search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <ul>
                        {templates
                            .filter(item =>
                                item.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((item, index) => (
                                <li
                                    key={item.id}
                                    className="border-b border-gray-300 last:border-none"
                                >
                                    <EmailTemplateCard data={item} />
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Templates;
