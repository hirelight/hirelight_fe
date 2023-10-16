import React from "react";
import type { Metadata } from "next";

import { getDictionary } from "../dictionnary";
import { Locale } from "../../../../i18n.config";

import OverviewSection from "./components/OverView/Overview";
import HomeHeader from "./components/HomeHeader/HomeHeader";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import FeatureDescription from "./components/FeatureDescription/FeatureDescription";
import IntegrationDescription from "./components/IntegrationDescription/IntegrationDescription";
import CustomerReview from "./components/CustomerReview/CustomerReview";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import JoinSection from "./components/JoinSection/JoinSection";

export const metadata: Metadata = {
    title: "Hirelight",
};

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const { home } = await getDictionary(lang);

    return (
        <div className="w-full flex flex-col gap-20">
            <HomeHeader _t={home.header} />
            <main className="w-full flex flex-col gap-20">
                <OverviewSection _t={home.overview_section} lang={lang} />
                <FeatureSection _t={home.feature_section} />
                <div className="flex flex-col gap-20 relative">
                    <div className="hidden md:block w-full h-28 absolute -top-36 z-30 bg-gradient-to-b from-[#F2F7FE] to-white"></div>
                    <FeatureDescription _t={home.feature_description_section} />
                    <IntegrationDescription _t={home.integration_section} />
                    <CustomerReview _t={home.customer_review_section} />
                </div>
                <JoinSection _t={home.join_section} />
            </main>
            <HomeFooter _t={home.footer} />
        </div>
    );
}
