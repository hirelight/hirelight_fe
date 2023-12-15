import React from "react";
import { useParams } from "next/navigation";

import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import CollaboratorCard from "./CollaboratorCard";

type CollaboratorListProps = {
    datas: ICollaboratorDto[];
};

const CollaboratorList: React.FC<CollaboratorListProps> = ({ datas }) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "job-member");
    return (
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400 overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                <tr>
                    <th scope="col" className="p-6 hidden md:table-cell">
                        {t("member_name")}
                    </th>
                    <th scope="col" className="p-6">
                        {t("email")}
                    </th>
                    <th scope="col" className="p-6 hidden lg:table-cell">
                        {t("status")}
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {datas?.map(member => (
                    <CollaboratorCard key={member.id} member={member} />
                ))}
            </tbody>
        </table>
    );
};

export default CollaboratorList;
