"use client";

import { error } from "console";

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
import { Button, CustomInput, UserAvatar, WarningModal } from "@/components";
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
    const [showWarning, setShowWarning] = React.useState(false);

    const handleCreateNewOrg = async () => {
        if (validateFormInput())
            return toast.error(t("common:error.invalid_input"));

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
        const regex = /[`~,<>;':"\[\]\|{}()=_#\.+]/;
        if (regex.test(newOrgForm.subdomain)) {
            setNewOrgFormErr(prev => ({
                ...prev,
                domainErr: t("subdomain_not_contain_special"),
            }));
            valid = true;
        }
        if (
            ["-"].includes(
                newOrgForm.subdomain.charAt(newOrgForm.subdomain.length - 1)
            )
        ) {
            setNewOrgFormErr(prev => ({
                ...prev,
                domainErr: t("subdomain_not_end_with"),
            }));
            valid = true;
        }

        if (!newOrgForm.name) {
            setNewOrgFormErr(prev => ({
                ...prev,
                nameErr: t("error.org_name_empty"),
            }));
            valid = true;
        }

        if (!newOrgForm.subdomain) {
            setNewOrgFormErr(prev => ({
                ...prev,
                domainErr: "Domain cannot empty",
            }));
            valid = true;
        }

        return valid;
    };

    return (
        <div>
            <WarningModal
                isOpen={showWarning}
                isLoading={loading}
                closeModal={() => setShowWarning(false)}
                onConfirm={handleCreateNewOrg}
                content={t("create_new_org_warning")}
                title={t("create_new_org")}
            />
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
                <div className="px-6 flex flex-col gap-4">
                    <div className="mb-2 text-left">
                        <CustomInput
                            title={t("label.org_name")}
                            type="text"
                            id="organization-name"
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
                            errorText={newOrgFormErr.nameErr}
                        />
                    </div>
                    <div className="text-left">
                        <CustomInput
                            title={t("label.domain")}
                            type="text"
                            id="domain"
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
                            errorText={newOrgFormErr.domainErr}
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
                    <Button
                        disabled={loading}
                        onClick={() => setShowWarning(true)}
                    >
                        <Trans t={t} i18nKey={"btn.submit"}>
                            Start a {{ days: 14 }}-day trial
                        </Trans>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewOrganizationForm;
