import React, { useState } from "react";
import { LightBulbIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

import { IPermissionDto } from "@/services";
import permissionServices from "@/services/permission/permission.service";

import PermissionLoadingTable from "./PermissionLoadingTable";

const permissionLabel = new Map<string, string>([
    ["UPDATE_JOB_POST", "Job post"],
    ["CREATE_UPDATE_ASSESSMENT_FLOW", "Assessment flow"],
    ["UPDATE_ASSESSMENT", "Assessment"],
    ["UPDATE_APPLICANT_STATUS", "Applicant"],
]);

type PermissionTableProps = {
    curPemissions: IPermissionDto[];
    onChange: (newPermissions: IPermissionDto[]) => void;
};

const PermissionTable: React.FC<PermissionTableProps> = ({
    curPemissions,
    onChange,
}) => {
    const [permissions, setPermissions] = useState<IPermissionDto[]>([]);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const fetchPermissions = async () => {
            try {
                setLoading(true);
                const res = await permissionServices.getJobPostPermission();

                setPermissions(res.data);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchPermissions();
    }, []);
    return (
        <div className="relative">
            <div className="mb-4">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User permissions
                </span>
                {/* <div className="flex flex-col gap-4 md:flex-row md:gap-6 mb-2">
                    {templatePermissions.map((template, index) => (
                        <div key={template.label} className="flex items-center">
                            <input
                                id={`permission-${template.label}`}
                                type="radio"
                                name="hiring-process-member-permission"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={e => {
                                    if (e.currentTarget.checked)
                                        onChange(template.permissions);
                                }}
                            />
                            <label
                                htmlFor={`permission-${template.label}`}
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {template.label}
                            </label>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 hidden md:block">
                    This is the most versatile option. Based on job or
                    department these users can: create jobs and hiring teams,
                    assign roles in a team, move and comment on candidates.
                </p> */}
            </div>

            <div className="border border-blue-500 rounded-sm p-2 items-start gap-2 my-2 hidden md:flex">
                <span>
                    <LightBulbIcon className="text-blue-700 w-6 h-6" />
                </span>
                <p className="flex-1 text-sm text-neutral-700">
                    Invited members will automatically become collaborators for
                    this job, once they sign up.
                </p>
            </div>

            {loading ? (
                <PermissionLoadingTable />
            ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">
                                Capabilities
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                View
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Manage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map(permission => (
                            <tr
                                key={permission.id}
                                className="bg-white dark:bg-gray-800"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {permissionLabel.get(permission.name)}
                                </th>
                                <td
                                    // key={index}
                                    className="px-6 py-4 text-center"
                                >
                                    <CheckIcon className="w-5 h-5 text-green-500 inline-block" />
                                </td>
                                <td
                                    // key={index}
                                    className="px-6 py-4 text-center"
                                >
                                    <input
                                        id={permission.id}
                                        type="checkbox"
                                        value={permission.name}
                                        checked={
                                            curPemissions.find(
                                                _ => _.name === permission.name
                                            ) !== undefined
                                        }
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {
                                            if (e.currentTarget.checked)
                                                onChange(
                                                    curPemissions.concat(
                                                        permission
                                                    )
                                                );
                                            else
                                                onChange(
                                                    curPemissions.filter(
                                                        _ =>
                                                            _.id !==
                                                            permission.id
                                                    )
                                                );
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}

                        {/* {fields.map(field => (
                            <tr
                                key={field}
                                className="bg-white dark:bg-gray-800"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {field}
                                </th>
                                {sortOrder.map((action, index) => {
                                    const isHaving = permissions.find(
                                        item =>
                                            item.name ===
                                            `${action}_${field
                                                .toUpperCase()
                                                .replace(" ", "_")}`
                                    );
                                    return isHaving ? (
                                        <td
                                            key={index}
                                            className="px-6 py-4 text-center"
                                        >
                                            <input
                                                id={isHaving.id.toString()}
                                                type="checkbox"
                                                value={isHaving.name}
                                                checked={
                                                    curPemissions.find(
                                                        _ =>
                                                            _.name ===
                                                            isHaving.name
                                                    ) !== undefined
                                                }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={e => {
                                                    if (e.currentTarget.checked)
                                                        onChange(
                                                            curPemissions.concat(
                                                                isHaving
                                                            )
                                                        );
                                                    else
                                                        onChange(
                                                            curPemissions.filter(
                                                                _ =>
                                                                    _.id !==
                                                                    isHaving.id
                                                            )
                                                        );
                                                }}
                                            />
                                        </td>
                                    ) : (
                                        <td
                                            key={index}
                                            className="px-6 py-4 text-center"
                                        >
                                            <NoSymbolIcon className="w-4 h-4 inline" />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PermissionTable;
