import Image from "next/image";
import React from "react";

import lading1 from "/public/images/landing_1.jpg";
import lading2 from "/public/images/landing_2.jpg";
import lading3 from "/public/images/landing_3.jpg";

import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

import { getI18NextTranslation } from "@/utils/i18n";

import { Locale } from "../../../../../../i18n.config";

import styles from "./Overview.module.scss";

interface IOverviewSection {
    lang: string;
}

const OverviewSection: React.FC<IOverviewSection> = async ({ lang }) => {
    const { t: _t } = await getI18NextTranslation(lang as Locale, "home", {
        keyPrefix: "overview_section",
    });
    return (
        <div className="max-w-screen-xl w-full mx-auto px-4 md:px-8  flex flex-col items-center md:flex-row justify-between gap-4 lg:gap-8 ">
            <section className="flex-1 self-stretch flex flex-col  items-center md:items-start justify-between">
                <div className="flex flex-col items-center gap-9 md:items-start">
                    <p className="text-blue_primary_600 hidden md:block">
                        Ipsum dolor sit
                    </p>
                    <div>
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl text-center md:text-left font-semibold text-neutral-800 mb-4">
                            Worem{" "}
                            <span className={styles.title__gradient}>
                                ipsum dolor sit
                            </span>{" "}
                            amet consectetur
                        </h1>
                        <p className="text-neutral-400 text-sm xl:text-lg text-center md:text-left">
                            Gorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                        <p className="text-neutral-400 text-sm xl:text-lg text-center md:text-left">
                            {" "}
                            Nunc vulputate libero et velit.
                        </p>
                    </div>
                    <Link
                        href={`${lang}/login`}
                        aria-label="Go to login"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-base xl:text-lg px-5 py-2.5 text-center mr-2 mb-2 flex items-center gap-2"
                    >
                        <span>{_t("get_started")}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="flex  flex-wrap justify-center md:justify-normal gap-8  md:gap-6 lg:gap-8 mt-6">
                    <div className="flex gap-4 items-center">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 md:w-8 md:h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className="text-lg text-neutral-500">
                            <Trans t={_t} i18nKey={"free_trials"}>
                                {{ days: 15 }} days free trials
                            </Trans>
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 md:w-8 md:h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                />
                            </svg>
                        </div>
                        <span className="text-lg text-neutral-500">
                            {_t("easy_payment")}
                        </span>
                    </div>
                </div>
            </section>
            <section className="flex-1 md:max-w-sm lg:max-w-2xl flex flex-col gap-3">
                <Image
                    alt="Lading Image example 1"
                    src={lading1}
                    className="max-w-full max-h-80 overflow-hidden object-cover rounded-3xl shadow-md"
                />
                <div className="w-full max-h-60 h-60 gap-2 hidden md:flex">
                    <Image
                        alt="Lading Image example 2"
                        src={lading2}
                        className="h-full w-full overflow-hidden object-cover rounded-3xl shadow-md"
                    />
                    <Image
                        alt="Lading Image example 3"
                        src={lading3}
                        className="h-full w-full overflow-hidden object-cover rounded-3xl shadow-md"
                    />
                </div>
            </section>
        </div>
    );
};

export default OverviewSection;
