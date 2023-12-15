import React from "react";
import { Metadata } from "next";
import { UserMinusIcon } from "@heroicons/react/24/outline";

import { getI18NextTranslation } from "@/utils/i18n";

export const metadata: Metadata = {
    title: "Hirelight - FPT",
};

const CandidateListPage = async ({ params }: any) => {
    const { t } = await getI18NextTranslation(params.lang, "hiring-process");
    return (
        <div className="flex flex-col justify-center items-center pt-[10%]">
            <div className="w-28 h-28 mb-4 text-neutral-700">
                <UserMinusIcon />
            </div>
            <p className="text-lg font-medium">{t("no_candidate_selected")}</p>
        </div>
    );
};

export default CandidateListPage;
