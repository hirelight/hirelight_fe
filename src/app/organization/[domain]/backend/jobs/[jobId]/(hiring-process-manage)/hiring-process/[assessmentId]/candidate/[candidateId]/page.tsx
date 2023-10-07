"use client";

import { useParams } from "next/navigation";
import React from "react";

const HiringProcessCandidate = () => {
    const { candidateId } = useParams();
    return (
        <div className="w-full min-h-screen bg-white rounded-md mb-10">
            HiringProcessCandidate {candidateId}
        </div>
    );
};

export default HiringProcessCandidate;
