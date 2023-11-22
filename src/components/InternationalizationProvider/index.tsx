"use client";

import React from "react";
import { useParams } from "next/navigation";

import defaultNs from "@/utils/dictionaries/en.json";

import { Locale } from "../../../i18n.config";

type InternationalizationState = {
    lang: any;
    contents: Record<string, any>;
};

export const InternationalizationContext =
    React.createContext<InternationalizationState | null>(null);

export const useTranslation = (lang: Locale, ns: string) => {
    const context = React.useContext(InternationalizationContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    if (ns === "") return context.contents;

    const keys = ns.split(".");
    let value = context.contents;
    for (const key of keys) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key];
        }
    }

    return value;
};

const InternationalizationProvider = ({ children, ...props }: any) => {
    const { lang } = useParams();
    const [contents, setContents] = React.useState(defaultNs);

    React.useEffect(() => {
        const getTranslation = async () => {
            const htmlEl = document.documentElement;

            if (htmlEl) {
                htmlEl.lang = lang as string;
            }
            const data = await import(
                `@/utils/dictionaries/${lang ?? "en"}.json`
            ).then(module => module.default);

            setContents(data);
        };

        getTranslation();
    }, [lang]);

    return (
        <InternationalizationContext.Provider
            value={{ lang: lang as Locale, contents }}
            {...props}
        >
            {children}
        </InternationalizationContext.Provider>
    );
};

export default InternationalizationProvider;
