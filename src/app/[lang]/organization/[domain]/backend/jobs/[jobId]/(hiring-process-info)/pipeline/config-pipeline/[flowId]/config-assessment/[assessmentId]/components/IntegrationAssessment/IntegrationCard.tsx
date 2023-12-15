import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { IIntegrationDto } from "@/services";
import { supportServices } from "@/utils/constants/integrations";
import { HackerrankIcon, TestlifyLogo } from "@/icons";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import ThirpatyAssessments from "./ThirpatyAssessments";

type IntegrationCardProps = {
    data: IIntegrationDto;
    selected?: {
        service: string;
        orgName: string;
        assessmentId: string;
        assessmentName: string;
    };
    onSelect: (selectedAssessment: {
        service: string;
        orgName: string;
        assessmentId: string;
        assessmentName: string;
    }) => void;
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({
    data,
    onSelect,
    selected,
}) => {
    const { lang } = useParams();
    const router = useRouter();

    const { t } = useI18NextTranslation(lang as I18Locale, "assessment");

    const [showList, setShowList] = useState(false);

    const handleShowAssessment = () => {
        if (data.token) {
            setShowList(!showList);
        } else {
            router.push(
                `/${lang}/backend/settings/integrations#${data.service}`
            );
        }
    };

    return (
        <div>
            <div
                className={`p-4 text-sm flex items-start cursor-default group  ${
                    selected && selected.service === data.service
                        ? "bg-green-100 hover:bg-green-300/50"
                        : "hover:bg-amber-100"
                }`}
            >
                {data.service === supportServices.HACKERRANK ? (
                    <HackerrankIcon className="w-14 h-14" />
                ) : (
                    <TestlifyLogo className="w-14 h-auto object-cover" />
                )}
                <div className="flex-1 ml-4">
                    <h3 className="mb-2">
                        <strong>{data.service}</strong>
                    </h3>
                    <p className="text-gray-600">
                        {data.service === supportServices.HACKERRANK
                            ? t("hackerrank_helper")
                            : t("testlify_helper")}
                    </p>
                </div>
                <div className="self-center px-4">
                    <button
                        type="button"
                        className="font-semibold text-blue_primary_600 invisible group-hover:visible hover:text-blue_primary_800 hover:underline"
                        onClick={handleShowAssessment}
                    >
                        {data.token
                            ? t("select_assessment")
                            : t("set_up_integration")}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {showList && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                                ease: "easeOut",
                                duration: 0.15,
                                opacity: {
                                    delay: 0.15,
                                    duration: 0.2,
                                },
                            },
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                                ease: "easeIn",
                                duration: 0.15,
                                height: {
                                    delay: 0.15,
                                    duration: 0.2,
                                },
                            },
                        }}
                    >
                        <ThirpatyAssessments
                            service={data.service}
                            token={data.token}
                            selected={selected}
                            onSelect={onSelect}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IntegrationCard;
