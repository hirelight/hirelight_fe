import { Metadata } from "next";
import React from "react";

import QuestionList from "./components/QuestionList";

export const metadata: Metadata = {
    title: "Hirelight - Question bank - Company",
};

const QuestionsBank = () => {
    return (
        <div className="bg-white rounded-md shadow-md p-4 xl:px-6">
            <QuestionList />
        </div>
    );
};

export default QuestionsBank;
