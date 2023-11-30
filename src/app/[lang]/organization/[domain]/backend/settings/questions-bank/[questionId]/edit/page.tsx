import React from "react";
import { cookies } from "next/headers";

import { checkResErr } from "@/helpers/resErrHelpers";

import EditQuestionForm from "./components/EditForm";

const EditQuestion = async ({ params }: any) => {
    const { questionId } = params;

    return (
        <div className="w-full bg-white rounded-md shadow-md p-4 xl:px-6">
            <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4">
                Edit question
            </h1>
            <EditQuestionForm questionId={questionId} />
        </div>
    );
};

export default EditQuestion;
