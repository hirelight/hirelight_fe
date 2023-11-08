import React from "react";

import { SpinLoading } from "@/icons";

const fields = [
    "Job post",
    "Application form",
    "Assessment flow",
    "Assessment",
    "Evaluation",
    "Applicant status",
];
const PermissionLoadingTable = () => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 rounded-l-lg">
                        Capabilities
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Read
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Create
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-r-lg">
                        Update
                    </th>
                </tr>
            </thead>
            <tbody>
                {fields.map(field => (
                    <tr key={field} className="bg-white dark:bg-gray-800">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {field}
                        </th>
                        {new Array(4).fill("").map((_, index) => {
                            return (
                                <td
                                    key={index}
                                    className="px-6 py-4 text-center"
                                >
                                    <SpinLoading className="w-5 h-5 inline" />
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PermissionLoadingTable;
