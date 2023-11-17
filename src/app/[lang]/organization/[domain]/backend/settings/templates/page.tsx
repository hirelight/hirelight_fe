import { Metadata } from "next";
import React from "react";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

import emailTemplateService from "@/services/email-template/email-template.service";
import getQueryClient from "@/utils/react-query/getQueryClient";
import { checkResErr } from "@/helpers";

import { Locale } from "../../../../../../../../i18n.config";

import styles from "./styles.module.scss";
import EmailTemplateList from "./components/EmailTemplateList";
import TemplatesHeaderSection from "./components/TemplatesHeaderSection";
import TemplatesTitleSection from "./components/TemplatesTitleSection";

export const metadata: Metadata = {
    title: "Hirelight - Templates - Hirelight",
};

const fetchTemplates = async () => {
    const token = cookies().get("hirelight_access_token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/email-templates`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token!!.value}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();

    checkResErr(jsonRes);

    return jsonRes;
};

const Templates = async ({
    params: { lang },
}: {
    params: { lang: Locale };
}) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["email-templates"],
        queryFn: fetchTemplates,
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
