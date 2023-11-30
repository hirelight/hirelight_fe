import { useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DocumentMinusIcon } from "@heroicons/react/24/outline";

import { IIntegrationToken } from "@/services";
import assessmentsServices from "@/services/assessments/assessments.service";

type ThirpatyAssessmentsProps = {
    service: string;
    token: IIntegrationToken | null;
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

const ThirpatyAssessments: React.FC<ThirpatyAssessmentsProps> = ({
    service,
    token,
    selected,
    onSelect,
}) => {
    const { lang } = useParams();
    const {
        data: res,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["thirdparty-assessments", service],
        queryFn: () => assessmentsServices.getListThirdParty(service),
    });

    if (isLoading) return <LoadingSkeleton />;
    if (isError) return <ErrorAssessment lang={lang} />;

    return (
        <ul className="p-6 space-y-4">
            {res?.data?.map(assessment => (
                <li key={assessment.id}>
                    <div className="flex items-center">
                        <input
                            id={assessment.id}
                            type="radio"
                            name={"selected-thirdparty-assessment"}
                            defaultChecked={
                                selected &&
                                selected.assessmentId === assessment.id
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={e => {
                                if (e.currentTarget.checked) {
                                    onSelect({
                                        service: service,
                                        orgName: token!!.payload.split(",")[0],
                                        assessmentId: assessment.id,
                                        assessmentName: assessment.name,
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
    );
};

export default ThirpatyAssessments;

const LoadingSkeleton = () => {
    return (
        <div className="p-6 space-y-2 animate-pulse">
            {new Array(3).fill("").map((_, index) => (
                <div
                    key={index}
                    className="w-[400px] max-w-full h-6 bg-slate-200"
                ></div>
            ))}
        </div>
    );
};

const ErrorAssessment = ({ lang }: any) => {
    return (
        <div className="p-6 flex flex-col justify-center items-center">
            <div className="w-16 h-16 text-neutral-700 mb-4">
                <DocumentMinusIcon />
            </div>
            <p>
                Seem like your provided token is expired or not correct!{" "}
                <Link
                    target="_blank"
                    href={`/${lang}/backend/settings/integrations`}
                    className="text-blue_primary_600 font-semibold hover:text-blue_primary_800 hover:underline"
                >
                    <strong>Set up integration</strong>
                </Link>{" "}
            </p>
        </div>
    );
};
