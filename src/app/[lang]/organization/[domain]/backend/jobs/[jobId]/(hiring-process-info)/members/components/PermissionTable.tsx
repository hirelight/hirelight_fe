import React, { useState } from "react";
import { LightBulbIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

import { IPermissionDto } from "@/services";
import permissionServices from "@/services/permission/permission.service";

import PermissionLoadingTable from "./PermissionLoadingTable";

const sortOrder = ["READ", "CREATE", "DELETE", "UPDATE"];
const fields = [
    "Job post",
    "Application form",
    "Assessment flow",
    "Assessment",
    "Evaluation",
    "Applicant status",
];

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
    const [templatePermissions, setTemplatePermissions] = useState<
        {
            label: string;
            permissions: IPermissionDto[];
        }[]
    >([
        {
            label: "Limited access",
            permissions: [],
        },
        {
            label: "Standard access",
            permissions: [],
        },
        {
            label: "All access",
            permissions: [],
        },
    ]);

    const [selectedTemplate, setSeletedTemplate] = useState<{
        label: string;
        permissions: IPermissionDto[];
    }>(templatePermissions[0]);
    React.useEffect(() => {
        const fetchPermissions = async () => {
            try {
                setLoading(true);
                const res = await permissionServices.getJobPostPermission();

                setPermissions(res.data);
                setTemplatePermissions([
                    {
                        label: "Limited access",
                        permissions: res.data.filter(item =>
                            item.name.includes("READ")
                        ),
                    },
                    {
                        label: "Standard access",
                        permissions: res.data.filter(
                            item =>
                                item.name.includes("READ") ||
                                item.name.includes("CREATE")
                        ),
                    },
                    {
                        label: "All access",
                        permissions: res.data,
                    },
                ]);
                setSeletedTemplate({
                    label: "Standard access",
                    permissions: res.data.filter(
                        item =>
                            item.name.includes("READ") ||
                            item.name.includes("CREATE")
                    ),
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchPermissions();
    }, []);
    return (
        <div className="relative overflow-x-auto">
            <div className="mb-4">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User permissions
                </span>
                <div className="flex gap-6 mb-2">
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
                <p className="text-xs text-gray-500">
                    This is the most versatile option. Based on job or
                    department these users can: create jobs and hiring teams,
                    assign roles in a team, move and comment on candidates.
                </p>
            </div>

            <div className="border border-blue-500 rounded-sm p-2 flex items-start gap-2">
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
                                                id={isHaving.name}
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
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PermissionTable;
