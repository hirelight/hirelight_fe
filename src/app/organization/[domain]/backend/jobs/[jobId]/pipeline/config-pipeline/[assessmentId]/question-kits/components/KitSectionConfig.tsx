"use client";

import React from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Button, CustomInput } from "@/components";
import { DragIndicatorIcon } from "@/icons";

import NewKitSection from "./NewKitSection";

const KitSectionConfig = () => {
    const [kits, setKits] = React.useState<
        {
            id?: number;
            title: string;
            contents: {
                name: string;
                requirements: string;
            }[];
        }[]
    >([]);

    return (
        <ul className="flex flex-col gap-4">
            {kits.map((kit, index) => (
                <li key={kit.id}>
                    <NewKitSection
                        data={kit}
                        onChange={(kit: any) =>
                            setKits(prev =>
                                prev.map((k, kNo) => {
                                    if (kNo === index) return k;
                                    return k;
                                })
                            )
                        }
                    />
                </li>
            ))}

            <button
                type="button"
                className="flex items-center gap-1 text-base font-medium text-blue_primary_800 hover:underline mt-6"
                onClick={() => {
                    const newKit = {
                        id: kits.length + 1,
                        title: "",
                        contents: [
                            {
                                name: "",
                                requirements: "",
                            },
                        ],
                    };
                    setKits(prev => prev.concat([newKit]));
                }}
            >
                <PlusCircleIcon className="w-6 h-6" />
                <span>Create new section</span>
            </button>
        </ul>
    );
};

export default KitSectionConfig;
