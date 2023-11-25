import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { IIntegrationDto, ThirdPartyAssessment } from "@/services";
import { supportServices } from "@/utils/constants/integrations";
import { HackerrankIcon, TestlifyLogo } from "@/icons";
import assessmentsServices from "@/services/assessments/assessments.service";
import { handleError } from "@/helpers";

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

    const [showList, setShowList] = useState(false);
    const [assessments, setAssessments] = useState<ThirdPartyAssessment[]>([]);

    const handleShowAssessment = () => {
        if (assessments && assessments?.length > 0) {
            setShowList(!showList);
        } else {
            router.push(
                `/${lang}/backend/settings/integrations#${data.service}`
            );
        }
    };

    useEffect(() => {
        const getIntegrationAssessment = async (service: string) => {
            try {
                const res =
                    await assessmentsServices.getListThirdParty(service);

                setAssessments(res.data);
            } catch (error: any) {
                handleError(error);
            }
        };

        if (data.token) getIntegrationAssessment(data.service);
    }, [data.service, data.token]);

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
                            ? "HackerRank is the industry standard, end-to-end technical skills assessment platform that helps companies across industries to better evaluate, interview, and hire software developers."
                            : `Criteria is an assessment company dedicated to helping
                        organizations make better talent decisions using
                        objective, multidimensional data. By combining
                        leading-edge data science with rigorous validation
                        backed by I/O psychologists, we provide the most precise
                        assessments available.`}
                    </p>
                </div>
                <div className="self-center px-4">
                    <button
                        type="button"
                        className="font-semibold text-blue_primary_600 invisible group-hover:visible hover:text-blue_primary_800 hover:underline"
                        onClick={handleShowAssessment}
                    >
                        {data.token
                            ? "Select assessment"
                            : "Set up integration"}
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
                        <ul className="p-6 space-y-4">
                            {assessments?.map(assessment => (
                                <li key={assessment.id}>
                                    <div className="flex items-center">
                                        <input
                                            id={assessment.id}
                                            type="radio"
                                            name={
                                                "selected-thirdparty-assessment"
                                            }
                                            defaultChecked={
                                                selected &&
                                                selected.assessmentId ===
                                                    assessment.id
                                            }
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={e => {
                                                if (e.currentTarget.checked) {
                                                    onSelect({
                                                        service: data.service,
                                                        orgName:
                                                            data.token!!.payload.split(
                                                                ","
                                                            )[0],
                                                        assessmentId:
                                                            assessment.id,
                                                        assessmentName:
                                                            assessment.name,
                                                    });
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor={assessment.id}
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {assessment.name}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IntegrationCard;
