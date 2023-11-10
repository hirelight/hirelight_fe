"use client";

import React from "react";

import QuestionSetForm from "../components/QuestionSetForm";

type CreateQuestionSetPageProps = {};

const CreateQuestionSetPage: React.FC<CreateQuestionSetPageProps> = ({}) => {
    return (
        <div className="w-full bg-white rounded-md shadow-md p-4 xl:px-6">
            <QuestionSetForm />
        </div>
    );
};

export default CreateQuestionSetPage;
