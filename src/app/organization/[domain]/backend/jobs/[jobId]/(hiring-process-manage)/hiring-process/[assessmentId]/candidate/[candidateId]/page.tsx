"use client";

import { useParams } from "next/navigation";
import React from "react";

const HiringProcessCandidate = () => {
    const { candidateId } = useParams();
    return <div>HiringProcessCandidate {candidateId}</div>;
};

export default HiringProcessCandidate;
