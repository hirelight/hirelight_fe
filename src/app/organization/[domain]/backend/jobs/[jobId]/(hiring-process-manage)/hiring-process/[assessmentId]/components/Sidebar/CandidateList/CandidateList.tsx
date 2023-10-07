"use client";

import React from "react";

import CandidateCard from "../CandidateCard/CandidateCard";

const CandidateList = ({}: any) => {
    return (
        <ul className="bg-white min-h-[200px]">
            {new Array(3).fill("").map((item, index) => (
                <li
                    key={index}
                    className="bg-white border-b border-gray-300 last:border-none hover:bg-blue_primary_100"
                >
                    <CandidateCard index={index} />
                </li>
            ))}
        </ul>
    );
};

export default CandidateList;
