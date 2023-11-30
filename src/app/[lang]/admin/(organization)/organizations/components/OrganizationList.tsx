"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import organizationsServices from "@/services/organizations/organizations.service";

const OrganizationList = () => {
    const { lang } = useParams();
    const { data: orgRes } = useQuery({
        queryKey: ["organizations"],
        queryFn: organizationsServices.getListOrganizations,
    });
    return (
        <div>
            <div className="mb-6"></div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-blue_primary_100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Subdomain
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Industry
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Created Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Employees
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {orgRes?.data.map((org, orgIndex) => (
                        <tr
                            key={org.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {orgIndex + 1}
                            </td>
                            <td className="px-6 py-4">{org.name}</td>
                            <td className="px-6 py-4">{org.subdomain}</td>
                            <td className="px-6 py-4">{org.industry ?? ""}</td>
                            <td className="px-6 py-4">
                                {moment
                                    .utc(org.createdTime)
                                    .local()
                                    .locale(lang)
                                    .format()}
                            </td>
                            <td className="px-6 py-4">{0}</td>
                            <td className="px-6 py-4">
                                <button type="button">Disable</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrganizationList;
