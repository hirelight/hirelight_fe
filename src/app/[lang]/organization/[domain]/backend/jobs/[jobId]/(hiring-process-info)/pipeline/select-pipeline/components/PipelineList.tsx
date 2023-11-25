import React from "react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ButtonOutline } from "@/components";
import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";

import ChangePipeline from "./ChangePipeline";

const PipelineList = () => {
    const { lang } = useParams();
    const { data: flowTemplateRes } = useQuery({
        queryKey: ["flow-templates"],
        queryFn: assessmentFlowTemplatesServices.getListAsync,
    });
    return (
        <div className="p-6">
            {flowTemplateRes &&
                (flowTemplateRes.data.length > 0 ? (
                    <ChangePipeline
                        datas={flowTemplateRes.data.map(item => ({
                            ...item,
                            assessments: JSON.parse(item.content),
                        }))}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center py-6">
                        <Square3Stack3DIcon className="text-gray-600 w-14 h-14 mb-6" />
                        <h2 className="text-2xl text-neutral-700 font-semibold mb-2">
                            No templates available in your organization
                        </h2>
                        <p className="text-sm text-center text-neutral-700 mb-6">
                            There are no assessment flow template in your
                            organization. <br /> You can create a new one to use
                            in furthur job recruitment process.
                        </p>
                        <Link
                            href={`/${lang}/backend/settings/assessment_flow`}
                        >
                            <ButtonOutline>Create new template</ButtonOutline>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default PipelineList;
