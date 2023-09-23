import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

import { DragIndicatorIcon } from "@/icons";

interface IKitRequirement {
    data: {
        name: string;
        requirements: string;
    };
    contents: any[];
}

const KitRequirement = ({ data, contents }: IKitRequirement) => {
    const markerListRef = React.useRef<HTMLUListElement>(null);
    const [lines, setLines] = React.useState(1);
    const [content, setContent] = React.useState(data);

    return (
        <div className="flex gap-2 items-stretch h-full">
            {contents.length > 1 && (
                <span className={`p-4 h-fit cursor-grab`}>
                    <DragIndicatorIcon className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800 focus:text-blue_primary_800" />
                </span>
            )}
            <div className="flex-1 w-full mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg block overflow-hidden focus-within:ring-1 focus-within:border-blue-500 focus-within:ring-blue-500">
                <input
                    placeholder="Skill, trait or requirement"
                    className={
                        "bg-gray-50 w-full p-2.5 dark:placeholder-gray-400 dark:text-white outline-none ring-0"
                    }
                    onChange={e =>
                        setContent(prev => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />

                <section
                    className="h-0 bg-white focus-within:h-auto peer-focus:h-auto pt-1 pl-4 transition-all overflow-hidden"
                    style={content.requirements ? { height: "auto" } : {}}
                >
                    <div className="relative pr-3 pb-3">
                        <ul
                            ref={markerListRef}
                            className="list-disc absolute top-0 left-0 mb-2 ml-4 leading-[19px]"
                        >
                            {content.requirements
                                .split("\n")
                                .map((text: string, index: number) => (
                                    <li
                                        key={index}
                                        className={`${
                                            text
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    ></li>
                                ))}
                        </ul>
                        <textarea
                            rows={4}
                            cols={50}
                            className="p-0 pl-4 w-full bg-transparent border-none focus:outline-none focus:ring-0 relative break-words leading-[19px]"
                            contentEditable
                            value={content.requirements}
                            placeholder="Enter or copy & paste evaluation questions"
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    if (
                                        e.currentTarget.value.split("\n")[
                                            e.currentTarget.value.split("\n")
                                                .length - 1
                                        ] === ""
                                    )
                                        e.preventDefault();
                                    else setLines(prev => prev + 1);
                                } else if (
                                    e.key === "Backspace" &&
                                    e.currentTarget.value.split("\n")[
                                        e.currentTarget.value.split("\n")
                                            .length - 1
                                    ] === ""
                                ) {
                                    setLines(prev => (prev > 1 ? prev - 1 : 1));
                                }
                            }}
                            onChange={e => {
                                setContent(prev => ({
                                    ...prev,
                                    requirements: e.target.value,
                                }));
                            }}
                            style={{
                                height: `${
                                    76 + (lines > 4 ? lines - 4 : 0) * 19
                                }px`,
                            }}
                        />
                    </div>
                </section>
            </div>
            {contents.length > 1 && (
                <button
                    type="button"
                    className={`p-4 h-fit group`}
                    onClick={() => {}}
                >
                    <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                </button>
            )}
        </div>
    );
};

export default KitRequirement;
