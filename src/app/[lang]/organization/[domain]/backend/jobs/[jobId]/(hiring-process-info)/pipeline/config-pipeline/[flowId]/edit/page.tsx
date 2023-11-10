import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import endpoints from "@/utils/constants/service-endpoint";
import { checkResErr } from "@/helpers";
import { IAssessmentFlowDto } from "@/services";

import AssessmentFlowForm from "./components/AssessmentFlowForm";

type EditFlowPageProps = {};

const fetchAssessFlowById = async (id: number): Promise<IAssessmentFlowDto> => {
    const token = cookies().get("hirelight_access_token")!!.value;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.ASSESSMENT_FLOWS}/${id}`,
        {
            method: "GET",
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

const EditFlowPage: React.FC<EditFlowPageProps> = async ({ params }: any) => {
    const { flowId, lang, jobId } = params;
    const data = await fetchAssessFlowById(flowId);
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    {data.name}
                </h3>

                <Link
                    href={`/${lang}/backend/jobs/${jobId}/pipeline/select-pipeline?flowId=${flowId}`}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4 xl:mr-6"
                >
                    Change flow
                </Link>
            </div>
            <div className="bg-white py-6 drop-shadow-md rounded-md">
                <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                    {data.name}
                </h2>

                <AssessmentFlowForm
                    data={{
                        id: data.id,
                        name: data.name,
                        startTime: data.startTime,
                        endTime: data.endTime,
                        assessments: data.assessments.map(item => ({
                            name: item.name,
                            assessmentType: item.assessmentTypeName,
                        })),
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default EditFlowPage;
