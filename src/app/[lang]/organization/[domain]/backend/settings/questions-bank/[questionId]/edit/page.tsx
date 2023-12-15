import React from "react";

import { getI18NextTranslation } from "@/utils/i18n";

import EditQuestionForm from "./components/EditForm";

const EditQuestion = async ({ params }: any) => {
    const { questionId, lang } = params;
    const { t } = await getI18NextTranslation(lang, "question-bank");

    return (
        <div className="w-full bg-white rounded-md shadow-md p-4 xl:px-6">
            <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4">
                {t("edit_question")}
            </h1>
            <EditQuestionForm questionId={questionId} />
        </div>
    );
};

export default EditQuestion;
