import React, { useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";

import { IPermissionDto } from "@/services";
import permissionServices from "@/services/permission/permission.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

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
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "job-member");

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
                    {t("user_permissions")}
                </span>
            </div>

            <div className="border border-blue-500 rounded-sm p-2 items-start gap-2 my-2 hidden md:flex">
                <span>
                    <LightBulbIcon className="text-blue-700 w-6 h-6" />
                </span>
                <p className="flex-1 text-sm text-neutral-700">
                    {t("invited_members_will_automatically")}
                </p>
            </div>

            {loading ? (
                <PermissionLoadingTable />
            ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">
                                {t("capabilities")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                {t("common:view")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                {t("common:manage")}
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
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PermissionTable;
