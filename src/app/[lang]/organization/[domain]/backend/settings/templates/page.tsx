import { Metadata } from "next";
import React from "react";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";

import emailTemplateService from "@/services/email-template/email-template.service";

import { Locale } from "../../../../../../../../i18n.config";

import styles from "./styles.module.scss";
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
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["email-templates"],
        queryFn: emailTemplateService.getListAsync,
    });

    return (
        <div className="w-full flex flex-col gap-8">
            <section>
                <TemplatesTitleSection />
                <div className={styles.section__content__wrapper}>
                    <TemplatesHeaderSection />
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <EmailTemplateList />
                    </HydrationBoundary>
                </div>
            </section>
        </div>
    );
};

export default Templates;
