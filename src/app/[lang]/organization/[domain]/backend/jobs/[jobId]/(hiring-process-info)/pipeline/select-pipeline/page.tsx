import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";

import { IAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";
import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";

import ChangePipeline from "./components/ChangePipeline";

const fetchTemplates = async (
    token: string
): Promise<IAssessmentFlTempDto[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.ASSESSMENT_FLOW_TEMPLATES}`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();

    checkResErr(jsonRes);

    return jsonRes.data;
};

const SelectPipeline = async () => {
    const accessToken = cookies().get("hirelight_access_token")!!.value;
    const datas = await fetchTemplates(accessToken);

    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    Apply templates
                </h3>
                <Link
                    href={"create-flow"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4"
                >
                    Create new flow
                </Link>
            </div>
            <div className="w-full bg-white shadow-lg rounded-md">
                <div className="p-6">
                    {datas.length > 0 && (
                        <ChangePipeline
                            datas={datas.map(item => ({
                                ...item,
                                assessments: JSON.parse(item.content),
                            }))}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default SelectPipeline;
