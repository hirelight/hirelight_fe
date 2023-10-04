"use client";

import React from "react";
import Image from "next/image";

import { pipelineStages, pipelineTemplates } from "@/utils/shared/initialDatas";

import ChangePipeline from "./components/ChangePipeline";

const SelectPipeline = () => {
    const [selected, setSelected] = React.useState(pipelineTemplates[0]);
    return (
        <div className="w-full bg-white shadow-lg rounded-md">
            <div className="p-6">
                <h1 className="text-lg font-medium text-neutral-800 flex items-center mb-8">
                    Recruiting pipeline: Default pipeline
                </h1>
                <ul className="flex gap-2 mb-6">
                    {selected.pipelineStages.map(item => (
                        <li
                            key={item.id}
                            className="flex-1 flex-shrink-0 w-0 min-w-0 text-center py-3 px-4 rounded-md flex flex-col items-center justify-between bg-white shadow-lg border border-gray-200"
                        >
                            <Image
                                src={item.iconUrl}
                                alt="Assessment"
                                width={24}
                                height={24}
                                unoptimized
                                className="mb-4"
                            />
                            <span className="text-sm text-neutral-700 font-medium max-w-full whitespace-nowrap text-ellipsis overflow-hidden ">
                                {item.stageName}
                            </span>
                        </li>
                    ))}
                </ul>
                <ChangePipeline
                    templates={pipelineTemplates}
                    onSelect={(stages: any) => setSelected(stages)}
                />
            </div>
        </div>
    );
};

export default SelectPipeline;
