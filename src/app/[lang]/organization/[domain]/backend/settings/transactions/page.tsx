"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import transactionServices from "@/services/transaction/transaction.service";

const TransactionsPage = () => {
    const { lang } = useParams();

    const { authUser } = useAppSelector(state => state.auth);
    const { data: transactionRes } = useQuery({
        queryKey: ["transactions"],
        queryFn: () =>
            transactionServices.getListTransactionByOrgId(
                authUser?.organizationId ?? ""
            ),
    });

    console.log(transactionRes);

    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Id
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Plan name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Ammount
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Purchase time
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 whitespace-nowrap"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionRes?.data.map(transaction => (
                            <tr
                                key={transaction.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4">#{transaction.id}</td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white whitespace-nowrap"
                                >
                                    {transaction.subscriptionInfo.name}
                                </th>
                                <td className="px-6 py-4">
                                    {transaction.subscriptionInfo.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {moment
                                        .utc(transaction.createdTime)
                                        .locale(lang)
                                        .fromNow()}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.status === "IDLE"
                                        ? "ZaloPay is processing your trasaction within 15 minutes! Please get back later"
                                        : transaction.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsPage;
