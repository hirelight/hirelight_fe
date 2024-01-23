import React from "react";
import type { Metadata } from "next";

import InformModal from "@/components/InformModal";

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
    return (
        <div className="w-full flex flex-col gap-20">
            <InformModal />
            <HomeHeader />
            <main className="w-full flex flex-col gap-20">
                <OverviewSection lang={lang} />
                <FeatureSection lang={lang} />
                <div className="flex flex-col gap-20 relative">
                    <div className="hidden md:block w-full h-28 absolute -top-36 z-30 bg-gradient-to-b from-[#F2F7FE] to-white"></div>
                    <FeatureDescription lang={lang} />
                    <IntegrationDescription lang={lang} />
                    <CustomerReview lang={lang} />
                </div>
                <JoinSection lang={lang} />
            </main>
            <HomeFooter lang={lang} />
        </div>
    );
}
