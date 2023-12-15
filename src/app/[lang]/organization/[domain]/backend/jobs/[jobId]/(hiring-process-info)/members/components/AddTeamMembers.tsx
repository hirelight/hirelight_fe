"use client";

import React from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button, Portal } from "@/components";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import queryKeyConst from "@/utils/constants/query-key.constant";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AddTeamMembers.module.scss";
import NewMemberModal from "./NewMemberModal";
import CollaboratorList from "./CollaboratorList";

const AddTeamMebers = () => {
    const { jobId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "job-member");

    const [showModal, setShowModal] = React.useState(false);
    const {
        data: res,
        error,
        isLoading,
    } = useQuery({
        queryKey: [queryKeyConst.COLLABORATOR_LIST, jobId],
        queryFn: () =>
            collaboratorsServices.getCollaboratorList(jobId as string),
    });

    if (isLoading) {
        return (
            <div className="relative rounded-md border border-slate-200">
                <CollaboratorListLoading />
            </div>
        );
    }

    return (
        <div className="relative rounded-md border border-slate-200">
            <Portal>
                <NewMemberModal
                    isOpen={showModal}
                    collabList={res ? res.data : []}
                    onClose={() => setShowModal(false)}
                />
            </Portal>
            {res && res.data.length > 0 ? (
                <div className={styles.table__wrapper}>
                    <CollaboratorList datas={res.data} />
                </div>
            ) : (
                <div className="w-full flex flex-col items-center py-6">
                    <UsersIcon className="text-gray-600 w-14 h-14 mb-8" />
                    <h2 className="text-2xl text-neutral-700 font-semibold mb-2">
                        {t("no_account_members")}
                    </h2>
                    <p className="text-sm text-neutral-700">
                        {t("there_no_members_collab")}
                    </p>
                </div>
            )}
            <div className="py-4 px-6 border-t border-gray-300">
                <div className="w-full flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1"></div>
                    <Button
                        className="whitespace-nowrap w-full md:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        onClick={() => setShowModal(true)}
                    >
                        {t("invite_new_member")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTeamMebers;

const CollaboratorListLoading = () => {
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
                        {t("common:email")}
                    </th>
                    <th scope="col" className="p-6 hidden lg:table-cell">
                        {t("common:status")}
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {new Array(4).fill("").map((_, index) => (
                    <tr key={index} className="">
                        <td
                            scope="col"
                            className="animate-pulse p-4 hidden md:table-cell"
                        >
                            <div className="w-full h-6 bg-slate-200 rounded-md"></div>
                        </td>
                        <td scope="col" className="animate-pulse p-4">
                            <div className="w-full h-6 bg-slate-200 rounded-md"></div>
                        </td>
                        <td
                            scope="col"
                            className="animate-pulse p-4 hidden lg:table-cell"
                        >
                            <div className="w-full h-6 bg-slate-200 rounded-md"></div>
                        </td>
                        <th></th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
