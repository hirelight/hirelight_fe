"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./MemberList.module.scss";
import MemberCard from "./MemberCard";

const MemberList = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "org-members");
    const {
        data: res,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["employers-organization"],
        queryFn: employerOrgServices.getListAsync,
    });

    return (
        <>
            <table className="w-full text-sm text-left text-neutral-700 dark:text-gray-400 rounded-tl-lg rounded-tr-lg overflow-hidden">
                <thead className="text-xs text-neutral-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                    <tr>
                        <th scope="col">
                            <div className={styles.table__th__wrapper}>No</div>
                        </th>
                        <th scope="col">
                            <div className={styles.table__th__wrapper}>
                                {t("common:fullname")}
                            </div>
                        </th>
                        <th scope="col" className="hidden lg:table-cell">
                            <div className={styles.table__th__wrapper}>
                                {t("common:email")}
                            </div>
                        </th>

                        <th scope="col" className="hidden lg:table-cell">
                            <div className={styles.table__th__wrapper}>
                                {t("common:role")}
                            </div>
                        </th>
                        <th className="hidden lg:table-cell">
                            <div className={styles.table__th__wrapper}></div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-slate-100 bg-opacity-75">
                    {isLoading ? (
                        <MemberSkeleton />
                    ) : (
                        res?.data?.map((employer, index) => (
                            <MemberCard
                                key={employer.id}
                                index={index}
                                employer={employer}
                            />
                        ))
                    )}
                </tbody>
            </table>
            {/* <Pagination numOfPages={10} /> */}
        </>
    );
};

export default MemberList;

const MemberSkeleton = () => {
    return new Array(4).fill("").map((_, index) => (
        <tr key={index} className="">
            <td scope="col" className="animate-pulse p-4 hidden md:table-cell">
                <div className="w-6 h-6 bg-slate-200 rounded-md"></div>
            </td>
            <td scope="col" className="animate-pulse p-4 hidden md:table-cell">
                <div className="w-full h-6 bg-slate-200 rounded-md"></div>
            </td>

            <td scope="col" className="animate-pulse p-4 hidden lg:table-cell">
                <div className="w-full h-6 bg-slate-200 rounded-md"></div>
            </td>
            <td scope="col" className="animate-pulse p-4 hidden lg:table-cell">
                <div className="w-full h-6 bg-slate-200 rounded-md"></div>
            </td>
        </tr>
    ));
};
