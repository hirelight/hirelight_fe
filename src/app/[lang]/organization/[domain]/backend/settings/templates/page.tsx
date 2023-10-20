import { Metadata } from "next";
import React from "react";

import { getDictionary } from "@/utils/dictionaries/dictionnary";

import { Locale } from "../../../../../../../../i18n.config";

import styles from "./styles.module.scss";
import templates from "./mock-data.json";
import EmailTemplateList from "./components/EmailTemplateList";
import TemplatesHeaderSection from "./components/TemplatesHeaderSection";
import TemplatesTitleSection from "./components/TemplatesTitleSection";

export const metadata: Metadata = {
    title: "Hirelight - Templates - Hirelight",
};

const Templates = async ({
    params: { lang },
}: {
    params: { lang: Locale };
}) => {
    const { settings } = await getDictionary(lang);

    return (
        <div className="w-full flex flex-col gap-8">
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
