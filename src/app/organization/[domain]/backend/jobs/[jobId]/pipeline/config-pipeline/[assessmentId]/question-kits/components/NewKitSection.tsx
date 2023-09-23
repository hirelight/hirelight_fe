import React from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Button, CustomInput } from "@/components";
import { DragIndicatorIcon } from "@/icons";

import KitRequirement from "./KitRequirement";

interface INewKitSection {
    data: {
        id?: number;
        title: string;
        contents: {
            name: string;
            requirements: string;
        }[];
    };
    onChange: (value: any) => void;
}

const NewKitSection = ({ data, onChange }: INewKitSection) => {
    const [kit, setKit] = React.useState(data);

    const handleUpdateSection = () => {
        onChange(kit);
    };

    return (
        <div className="bg-gray-50 border border-gray-300 rounded-md overflow-hidden">
            <div className="p-4 xl:p-6">
                <CustomInput
                    title=""
                    type="text"
                    placeholder="Section title"
                    required
                    className="mb-4"
                    value={kit.title}
                    onChange={(e: any) =>
                        setKit(prev => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                />
                {kit.contents.map((content, contentNo) => (
                    <KitRequirement
                        key={contentNo}
                        data={content}
                        contents={kit.contents}
                    />
                ))}

                <button
                    type="button"
                    className="flex items-center gap-1 text-base font-medium text-blue_primary_800 hover:underline"
                    onClick={() => {
                        setKit(prev => ({
                            ...prev,
                            contents: [
                                ...prev.contents,
                                {
                                    name: "",
                                    requirements: "",
                                },
                            ],
                        }));
                    }}
                >
                    <PlusCircleIcon className="w-6 h-6" />
                    <span>Add new question</span>
                </button>
            </div>
            <div className="p-4 xl:p-6 flex items-center gap-4 bg-gray-50 border-t border-gray-300">
                <Button onClick={handleUpdateSection}>Save section</Button>
                <button
                    type="button"
                    className="font-semibold text-neutral-500 text-sm hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default NewKitSection;
