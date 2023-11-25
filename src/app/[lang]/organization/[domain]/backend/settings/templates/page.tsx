import { Metadata } from "next";
import React from "react";

import styles from "./styles.module.scss";
import EmailTemplateList from "./components/EmailTemplateList";
import TemplatesHeaderSection from "./components/TemplatesHeaderSection";
import TemplatesTitleSection from "./components/TemplatesTitleSection";

export const metadata: Metadata = {
    title: "Hirelight - Templates - Hirelight",
};

const Templates = () => {
    return (
        <div className="w-full flex flex-col gap-8">
            <section>
                <TemplatesTitleSection />
                <div className={styles.section__content__wrapper}>
                    <TemplatesHeaderSection />
                    <EmailTemplateList />
                </div>
            </section>
        </div>
    );
};

export default Templates;
