import React from "react";

import featureDescription from "/public/images/feature_description.png";

import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";

import { getI18NextTranslation } from "@/utils/i18n";

import { Locale } from "../../../../../../i18n.config";

import styles from "./FeatureDescription.module.scss";

interface IFeatureDescription {
    lang: string;
}

const FeatureDescription: React.FC<IFeatureDescription> = async ({ lang }) => {
    const { t: _t } = await getI18NextTranslation(lang as Locale, "home", {
        keyPrefix: "feature_description_section.title",
    });

    return (
        <div className="max-w-screen-xl w-full mx-auto flex flex-col gap-16 relative px-5">
            {new Array(3).fill("").map((item, index) => {
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
                                Borem ipsum dolor{" "}
                            </h3>
                            <h1 className=" text-4xl md:text-5xl text-neutral-700 font-semibold my-4">
                                <Trans t={_t} i18nKey={"title"}>
                                    Outstanding features {{ num: index + 1 }}
                                </Trans>
                            </h1>
                            <p className="text-sm md:text-base font-medium text-neutral-500 w-3/4 md:w-full lg:w-3/4 mb-10">
                                Vorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit
                                interdum, ac aliquet odio mattis. Class aptent
                                taciti sociosqu ad litora torquent per conubia
                                nostra, per inceptos himenaeos.
                            </p>
                            <ul className="flex flex-col gap-6">
                                <li className="flex items-center gap-4">
                                    <div className="rounded-full bg-slate-200 p-4"></div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-600">
                                        Jorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </p>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="rounded-full bg-slate-200 p-4"></div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-600">
                                        Jorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </p>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="rounded-full bg-slate-200 p-4"></div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-600">
                                        Jorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default FeatureDescription;
