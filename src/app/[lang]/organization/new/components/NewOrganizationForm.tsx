"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trans } from "react-i18next";

import { SpinLoading } from "@/icons";
import organizationsServices from "@/services/organizations/organizations.service";
import {
    ICreateOrgDto,
    IOrganizationDto,
} from "@/services/organizations/organizations.interface";
import { IResponse } from "@/interfaces/service.interface";
import authServices from "@/services/auth/auth.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { UserAvatar } from "@/components";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";

import { Locale } from "../../../../../../i18n.config";

import styles from "./NewOrganizationForm.module.scss";

const NewOrganizationForm = () => {
    const router = useRouter();
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as Locale, "new-org-page", {
        keyPrefix: "new_org_form",
    });

    const { authUser } = useAppSelector(state => state.auth);

    const [newOrgFormErr, setNewOrgFormErr] = React.useState({
        nameErr: "",
        domainErr: "",
    });
    const [newOrgForm, setNewOrgForm] = React.useState<ICreateOrgDto>({
        name: "",
        subdomain: "",
    });
    const [loading, setLoading] = React.useState(false);

    const handleCreateNewOrg = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateFormInput()) return;

        setLoading(true);
        try {
            const data: IResponse<IOrganizationDto> =
                await organizationsServices.createNewOrganization(newOrgForm);

            if (data.statusCode === 200) {
                const { subdomain, id } = data.data;
                const resOrgToken = await authServices.getOrgAccessToken(id);

                toast.success(t("success.create_org"));

                router.replace(
                    `${window.location.protocol}//${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/backend?accessToken=${resOrgToken.data.accessToken}`
                );
            }
        } catch (error: any) {
            handleError(error);
            setLoading(false);
        }
    };

    const validateFormInput = () => {
        let valid = false;
        if (!newOrgForm.name) {
            setNewOrgFormErr(prev => ({
                ...prev,
                nameErr: t("error.org_name_empty"),
            }));
            valid = true;
        }

        return valid;
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="pt-6 px-6">
                    <h1 className={styles.title}>{t("title.highlight")}</h1>
                    <p className="text-sm text-gray-500">
                        <Trans t={t} i18nKey={"subtitle"}>
                            Start your {{ days: 15 }}-day trial, no credit card
                            required.
                        </Trans>
                    </p>
                </div>
                <hr className="flex-1 h-[1.5px] w-4/5 bg-gray-300 self-center" />
                <div className="px-8 py-2 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-gray-300 text-neutral-700 rounded-full overflow-hidden">
                            {<UserAvatar avatarUrl={authUser?.avatarUrl} />}
                        </div>
                        <div className="inline-flex flex-col text-sm text-left">
                            <strong>{`${authUser?.firstName} ${
                                authUser?.lastName ?? ""
                            }`}</strong>
                            <p className="text-gray-500">
                                {authUser?.emailAddress}
                            </p>
                        </div>
                    </div>
                    <p className="p-2 max-w-[280px] text-sm text-left self-center">
                        {t("almost_done")}
                    </p>
                </div>
                <hr className="flex-1 h-[1.5px] bg-gray-300" />
                <form
                    onSubmit={handleCreateNewOrg}
                    className="px-6 flex flex-col gap-4"
                >
                    <div className="mb-2 text-left">
                        <label
                            htmlFor="organization-name"
                            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            {t("label.org_name")}
                        </label>
                        <input
                            type="text"
                            id="organization-name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Hirelight Corperation"
                            onChange={e => {
                                setNewOrgForm({
                                    ...newOrgForm,
                                    name: e.target.value,
                                });
                                setNewOrgFormErr({
                                    nameErr: "",
                                    domainErr: "",
                                });
                            }}
                            required
                        />
                    </div>
                    <div className="text-left">
                        <label
                            htmlFor="domain"
                            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            {t("label.domain")}
                        </label>
                        <input
                            type="text"
                            id="domain"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newOrgForm.subdomain}
                            placeholder="hirelight-co"
                            required
                            onChange={e => {
                                setNewOrgForm({
                                    ...newOrgForm,
                                    subdomain: e.target.value,
                                });
                                setNewOrgFormErr({
                                    nameErr: "",
                                    domainErr: "",
                                });
                            }}
                        />
                    </div>
                    {newOrgFormErr.nameErr && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="w-full border-2 border-red-500 bg-red-50 p-6 rounded-md text-center text-red-700 text-sm font-medium"
                        >
                            <p>{newOrgFormErr.nameErr}</p>
                        </motion.div>
                    )}
                    <button
                        type="submit"
                        className="flex items-center gap-1 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading && <SpinLoading />}
                        <Trans t={t} i18nKey={"btn.submit"}>
                            Start a {{ days: 15 }}-day trial
                        </Trans>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewOrganizationForm;
