"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Button, CustomInput } from "@/components";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import roleServices from "@/services/role/role.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

const AddNewMember = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "org-members");
    const [showAdd, setShowAdd] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        employerEmail: "",
        roleId: "",
    });
    const { data: roleRes } = useQuery({
        queryKey: ["roles"],
        queryFn: roleServices.getListAsync,
    });

    const handleAddEmployer = async (e: FormEvent) => {
        e.preventDefault();

        if (!formState.roleId) return toast.error(t("please_select_role"));

        setIsLoading(true);
        try {
            const res =
                await employerOrgServices.inviteEmployerAsync(formState);
            setFormState({
                ...formState,
                employerEmail: "",
            });
            toast.success(res.message);
        } catch (error) {
            toast.error(t("add_member_failure"));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (roleRes) {
            setFormState(prev => ({
                ...prev,
                roleId: roleRes.data[0].id,
            }));
        }
    }, [roleRes]);

    return (
        <React.Fragment>
            <button
                type="button"
                className="flex gap-2 text-blue_primary_700 font-medium mb-4 hover:underline"
                onClick={() => setShowAdd(!showAdd)}
            >
                <PlusCircleIcon className="w-5 h-5" />
                <span>{t("invite_new_member")}</span>
            </button>

            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {showAdd && (
                        <m.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                transition: {
                                    ease: "easeInOut",
                                    duration: 0.3,
                                    opacity: {
                                        delay: 0.3,
                                        duration: 0.3,
                                    },
                                },
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                transition: {
                                    ease: "easeInOut",
                                    duration: 0.3,
                                    height: {
                                        delay: 0.3,
                                        duration: 0.3,
                                    },
                                },
                            }}
                            layout
                            className="mb-4"
                        >
                            <form onSubmit={handleAddEmployer}>
                                <div className="grid grid-cols-2 gap-6">
                                    <CustomInput
                                        title={t("common:email")}
                                        type="email"
                                        autoComplete="email"
                                        value={formState.employerEmail}
                                        onChange={e =>
                                            setFormState({
                                                ...formState,
                                                employerEmail: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                    <div className="mb-2">
                                        <h3 className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">
                                            {t("common:role")}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            {roleRes?.data?.map(role => (
                                                <div
                                                    key={role.id}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        id={role.id}
                                                        type="radio"
                                                        value={role.id}
                                                        defaultChecked={
                                                            formState.roleId ===
                                                            role.id
                                                        }
                                                        name="organization-role"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        onChange={e => {
                                                            if (
                                                                e.currentTarget
                                                                    .checked
                                                            )
                                                                setFormState({
                                                                    ...formState,
                                                                    roleId: role.id,
                                                                });
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={role.id}
                                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        {role.name.charAt(0) +
                                                            role.name
                                                                .slice(1)
                                                                .toLowerCase()
                                                                .replace(
                                                                    "_",
                                                                    " "
                                                                )}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-neutral-500">
                                            {t("this_the_most_versatile")}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        className="mr-2 inline-flex items-center justify-center"
                                        disabled={isLoading}
                                        isLoading={isLoading}
                                    >
                                        {t("invite_member")}
                                    </Button>
                                    <button
                                        type="button"
                                        className="text-sm text-neutral-600 font-semibold disabled:opacity-80 disabled:cursor-not-allowed"
                                        onClick={() => setShowAdd(false)}
                                        disabled={isLoading}
                                    >
                                        {t("common:cancel")}
                                    </button>
                                </div>
                            </form>
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </React.Fragment>
    );
};

export default AddNewMember;
