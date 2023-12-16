import React from "react";

import featureDescription from "/public/images/feature_description.png";

import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";

import { getI18NextTranslation } from "@/utils/i18n";

import { Locale } from "../../../../../../i18n.config";

import styles from "./FeatureDescription.module.scss";

const features = [
    {
        title: "CV Screening",
        description:
            "Effortlessly sift through resumes with our intelligent CV screening feature. Save time and ensure you never miss a qualified candidate by leveraging our advanced algorithms that analyze and match candidate profiles to your job requirements.",
        details: ["Config cv scan keywords", "Scan matching keywords"],
    },
    {
        title: "Async Video Assessment",
        description:
            "Revolutionize your hiring process with asynchronous video assessments. Empower candidates to showcase their skills and personality at their convenience, while your team collaborates on the evaluations. Say goodbye to scheduling conflicts and welcome a more efficient and insightful evaluation process.",
        details: [
            "No need to schedule a meeting",
            "Share recoded interviews",
            "Greate candidate experience",
        ],
    },
    {
        title: "Collaborative Hiring Workflows",
        description:
            "Enhance team collaboration and communication with our intuitive hiring workflows. From initial screening to final interviews, streamline your hiring process by keeping all stakeholders on the same page. Easily manage and track candidate progress, feedback, and interview schedules in one centralized platform.",
        details: [
            "Collaboration on a single place",
            "Tracking activity for better management",
            "Share resouces throughout recuitment process",
        ],
    },
];
interface IFeatureDescription {
    lang: string;
}

const FeatureDescription: React.FC<IFeatureDescription> = async ({ lang }) => {
    const { t: _t } = await getI18NextTranslation(lang as Locale, "home", {
        keyPrefix: "feature_description_section.title",
    });

    return (
        <div className="max-w-screen-xl w-full mx-auto flex flex-col gap-16 relative px-5">
            {features.map((item, index) => {
                return (
                    <section
                        key={index}
                        className={`flex flex-col md:flex-row justify-between items-center gap-4 px-5 md:px-0 md:gap-10 ${
                            index === 1 ? "md:flex-row-reverse" : ""
                        }`}
                    >
                        <div className="flex-1">
                            <Image
                                alt="Feature Description"
                                src={featureDescription}
                                className="w-96 md:w-full h-auto object-cover"
                            />
                        </div>
                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className="hidden md:block text-lg text-blue_primary_600 mb-8">
                                <Trans t={_t} i18nKey={"title"}>
                                    Outstanding features {{ num: index + 1 }}
                                </Trans>
                            </h3>
                            <h1 className=" text-4xl md:text-5xl text-neutral-700 font-semibold my-4">
                                {item.title}
                            </h1>
                            <p className="text-sm md:text-base font-medium text-neutral-500 w-3/4 md:w-full lg:w-3/4 mb-10">
                                {item.description}
                            </p>
                            <ul className="flex flex-col gap-6">
                                {item.details.map((i, iL) => (
                                    <li
                                        key={iL}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="rounded-full bg-slate-200 p-4"></div>
                                        <p className="text-xs md:text-sm font-semibold text-gray-600">
                                            {i}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default FeatureDescription;
