"use client";

import React, { FormEvent, useState } from "react";
import { produce } from "immer";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import {
    Button,
    CustomInput,
    LocationAutocomplete,
    Selection,
} from "@/components";
import { industries } from "@/utils/shared/initialDatas";
import organizationsServices from "@/services/organizations/organizations.service";
import { IEditOrganizationDto } from "@/services";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "../styles.module.scss";

import { useOrgProfileForm } from "./OrgProfileForm";

const ProfileSection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale);

    const { orgData, setOrgData } = useOrgProfileForm();
    const [loading, setLoading] = useState(false);

    const handleSaveProfileChanges = async (e: FormEvent) => {
        e.preventDefault();
        const regex = /[`~,<>;':"\[\]\|{}()=_#\.+]/;

        if (regex.test(orgData.subdomain))
            return toast.error("Subdomain cannot contain special characters!");
        if (
            ["-"].includes(
                orgData.subdomain.charAt(orgData.subdomain.length - 1)
            )
        )
            return toast.error("Subdomain cannot end with special characters!");

        setLoading(true);
        try {
            const res = await organizationsServices.editOrgProfile({
                ...(orgData as IEditOrganizationDto),
            });

            toast.success(res.message);
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    return (
        <section>
            <h2 className={styles.section__title}>Organization Profile</h2>
            <form
                className={styles.section__content__wrapper}
                onSubmit={handleSaveProfileChanges}
            >
                <div className="grid md:grid-cols-2 gap-4 p-6">
                    <div>
                        <CustomInput
                            type="text"
                            id="org-name"
                            title="Organization name"
                            value={orgData.name}
                            onChange={e =>
                                setOrgData(
                                    produce(orgData, draft => {
                                        draft.name = e.target.value;
                                    })
                                )
                            }
                            required
                        />
                    </div>

                    <div>
                        <LocationAutocomplete
                            type="text"
                            id="organization-location"
                            title="Location"
                            value={orgData.address ?? ""}
                            placeholder="Organization location"
                            autoComplete="street-address"
                            handlePlaceChange={value =>
                                setOrgData(
                                    produce(orgData, draft => {
                                        draft.address = value;
                                    })
                                )
                            }
                        />
                    </div>

                    <div>
                        <div className="relative mb-1">
                            <CustomInput
                                type="text"
                                id="org-domain"
                                title="Domain"
                                value={orgData.subdomain ?? ""}
                                className="pr-20"
                                required
                                readOnly
                            />
                            <div className="absolute right-2.5 bottom-2.5 text-sm text-gray-500">
                                <span>.hirelight.xyz</span>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500">
                            You can use letters, numbers, and dashes. It just
                            can&apos;t end with a dash
                        </p>
                    </div>
                    <div>
                        <Selection
                            title="Industry"
                            value={orgData.industry ?? ""}
                            items={industries.map(industry => ({
                                label: industry,
                                value: industry,
                            }))}
                            onChange={value =>
                                setOrgData({
                                    ...orgData,
                                    industry: value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="p-6 border-t border-gray-300">
                    <Button
                        type="submit"
                        isLoading={loading}
                        disabled={loading}
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default ProfileSection;
