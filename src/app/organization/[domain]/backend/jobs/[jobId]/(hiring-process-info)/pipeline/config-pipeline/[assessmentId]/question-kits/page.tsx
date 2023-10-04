"use client";

import React from "react";

import { CustomInput } from "@/components";

import KitSectionConfig from "./components/KitSectionConfig";

const itemHeight = 220;
const padding = 24;

const reorderList = (array: any[], rowFrom: number, rowTo: number) => {
    const __array = [...array];

    const val = __array[rowFrom];
    if (rowTo >= array.length) {
        rowTo = array.length - 1;
    }

    __array.splice(rowFrom, 1);
    __array.splice(rowTo, 0, val);
    return __array;
};

const InterviewQuestionKits = () => {
    return (
        <div className="bg-white py-4 px-4 xl:px-6 shadow-md rounded-md">
            <div className="mb-8">
                <h2 className="text-xl text-neutral-700 font-medium mb-2">
                    Add questions to your kit
                </h2>
                <p className="text-base text-neutral-500">
                    Questions are divided into manageable sections. Create or
                    import a section:
                </p>
            </div>

            <KitSectionConfig />
        </div>
    );
};

export default InterviewQuestionKits;
