"use client";

import React from "react";

const QuestionSkeleton = () => {
    return (
        <div className="bg-white p-4 flex items-stretch">
            <div className="flex-1 animate-pulse">
                <h3 className="w-32 h-6 bg-slate-300 mb-4"></h3>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    {new Array(4).fill("").map((_, index) => (
                        <div
                            key={index}
                            className="h-6 w-48 bg-slate-200"
                        ></div>
                    ))}
                </div>
            </div>
            <div className="hidden h-20 w-[1px] mx-6 self-center md:block"></div>
            <div className="w-[200px] text-sm text-neutral-500 flex flex-col animate-pulse">
                <div className="w-48 h-5 mb-2 bg-slate-200"></div>
                <div className="w-48 h-5 mb-2 bg-slate-200"></div>

                <div className="flex gap-4 flex-wrap mb-2">
                    <div className="w-12 h-5 bg-slate-200"></div>
                    <div className="w-12 h-5 bg-slate-200"></div>
                    <div className="w-12 h-5 bg-slate-200"></div>
                    <div className="w-12 h-5 bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
};

export default QuestionSkeleton;
