"use client";

import { Metadata } from "next";
import React from "react";
import Head from "next/head";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { SearchIcon } from "@/icons";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./styles.module.scss";
import EmailTemplateCard from "./components/EmailTemplateCard";
import templates from "./mock-data.json";
import AddEmailTemplate from "./components/AddEmailTemplate";
import EmailTemplateList from "./components/EmailTemplateList";
import TemplatesHeaderSection from "./components/TemplatesHeaderSection";
import TemplatesTitleSection from "./components/TemplatesTitleSection";

const Templates = () => {
    const [search, setSearch] = React.useState("");
    const editingId = useAppSelector(state => state.templates.editingId);

    return (
        <div className="w-full flex flex-col gap-8">
            <Head>
                <title>Hirelight - Templates - Hirelight</title>
            </Head>
            <section>
                <TemplatesTitleSection />
                <div className={styles.section__content__wrapper}>
                    <TemplatesHeaderSection />
                    <EmailTemplateList datas={templates} />
                </div>
            </section>
        </div>
    );
};

export default Templates;
