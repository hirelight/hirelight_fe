"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components";
import { ChevronDown } from "@/icons";

interface IChangePipeline {
    templates: any[];
    onSelect: (stages: any) => void;
}

const ChangePipeline = ({ onSelect, templates }: IChangePipeline) => {
    const [show, setShow] = React.useState(false);
    const [selected, setSelected] = React.useState(templates[0]);

    const handleChangePipeline = () => {
        onSelect(selected);
        setShow(!show);
    };
    return (
        <div>
            <button
                type="button"
                className="text-sm text-neutral-700 font-medium flex items-center hover:underline mb-6"
                onClick={() => setShow(!show)}
            >
                {show ? "Select another pipeline" : "Change pipeline"}
                <span className="inline-block ml-1">
                    <ChevronDown className="w-5 h-5" strokeWidth={2} />
                </span>
            </button>

            {show && (
                <React.Fragment>
                    {templates.map((item: any, index) => {
                        return (
                            <ul key={index} className="mb-6">
                                <li>
                                    <div className="flex items-center mb-4">
                                        <input
                                            id={`pipeline-${item.id}`}
                                            type="radio"
                                            value=""
                                            name="recruiting-pipeline"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={e => {
                                                if (e.currentTarget.checked) {
                                                    setSelected(item);
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor={`pipeline-${item.id}`}
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                    <ul className="flex gap-2 mb-6">
                                        {item.pipelineStages.map(
                                            (stage: any) => (
                                                <li
                                                    key={stage.id}
                                                    className="flex-1 flex-shrink-0 w-0 min-w-0 text-center py-3 px-4 rounded-md flex flex-col items-center justify-between bg-white shadow-lg border border-gray-200"
                                                >
                                                    <Image
                                                        src={stage.iconUrl}
                                                        alt="Assessment"
                                                        width={24}
                                                        height={24}
                                                        unoptimized
                                                        className="mb-4"
                                                    />
                                                    <span className="text-sm text-neutral-700 font-medium max-w-full whitespace-nowrap text-ellipsis overflow-hidden ">
                                                        {stage.stageName}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        );
                    })}

                    <div className="w-fit">
                        <Button onClick={handleChangePipeline}>
                            Save changes
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default ChangePipeline;
