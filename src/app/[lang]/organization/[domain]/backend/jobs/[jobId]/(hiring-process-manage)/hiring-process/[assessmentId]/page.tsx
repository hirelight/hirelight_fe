import React from "react";
import { Metadata } from "next";

import HiringProcessCandidate from "./candidate/[candidateId]/page";

export const metadata: Metadata = {
    title: "Hirelight - FPT",
};

const CandidateListPage = () => {
    return <div>No candidate selected</div>;
};

export default CandidateListPage;
