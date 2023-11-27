import { useQuery } from "@tanstack/react-query";
import React from "react";

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
    const { data: res, isLoading } = useQuery({
        queryKey: ["thirdparty-assessments", service],
        queryFn: () => assessmentsServices.getListThirdParty(service),
    });

    if (isLoading) return <LoadingSkeleton />;

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
