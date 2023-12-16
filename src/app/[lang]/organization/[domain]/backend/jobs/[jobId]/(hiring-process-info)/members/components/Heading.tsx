"use client";

import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { useParams } from "next/navigation";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

const Heading = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "job-member");
    return (
        <h1 className="text-lg font-medium text-neutral-800 flex items-center mb-8">
            {t("team_collaborators")}
            <span>
                <Tooltip
                    style="light"
                    placement="bottom"
                    animation="duration-500"
                    content={
                        <div className="w-[360px] p-4 bg-white ">
                            <h2 className="text-sm font-medium text-neutral-800 mb-4">
                                {t("what_is_this")}
                            </h2>
                            <p className="text-neutral-500 font-normal text-sm">
                                {t("want_your_colleagues")}
                            </p>
                        </div>
                    }
                >
                    <QuestionMarkCircleIcon className="w-6 h-6 ml-2 text-neutral-400 cursor-pointer" />
                </Tooltip>
            </span>
        </h1>
    );
};

export default Heading;
