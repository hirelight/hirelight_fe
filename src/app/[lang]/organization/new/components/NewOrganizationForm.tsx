"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";

import { SpinLoading } from "@/icons";
import organizationsServices from "@/services/organizations/organizations.service";
import { ICreateOrgDto } from "@/services/organizations/organizations.interface";
import { IResponse } from "@/interfaces/service.interface";

import styles from "./NewOrganizationForm.module.scss";

const NewOrganizationForm = () => {
    const router = useRouter();
    const loginId = useSearchParams().get("loginId");

    const [newOrgFormErr, setNewOrgFormErr] = React.useState({
        nameErr: "",
        domainErr: "",
    });
    const [newOrgForm, setNewOrgForm] = React.useState<ICreateOrgDto>({
        name: "",
        domain: "",
    });
    const [loading, setLoading] = React.useState(false);

    const handleCreateNewOrg = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateFormInput()) return;

        setLoading(true);
        try {
            const data: IResponse =
                await organizationsServices.createNewOrganization(newOrgForm);

            if (data.statusCode === 200) {
                if (process.env.NODE_ENV === "development")
                    router.replace(
                        `${window.location.protocol}//${newOrgForm.domain}.${
                            process.env.NEXT_PUBLIC_ROOT_DOMAIN
                        }?loginId=${loginId}&accessToken=${Cookies.get(
                            "hirelight_access_token"
                        )}`
                    );
                else
                    router.replace(
                        `${window.location.protocol}//${newOrgForm.domain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/backend`
                    );
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const validateFormInput = () => {
        let valid = false;
        if (newOrgForm.name === "") {
            setNewOrgFormErr(prev => ({
                ...prev,
                nameErr: "Email must not empty!",
            }));
            valid = true;
        }

        return valid;
    };

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="pt-6 px-6">
                    <h1 className={styles.title}>
                        Create a organization account
                    </h1>
                    <p className="text-sm text-gray-500">
                        Start your 15-day trial, no credit card required.
                    </p>
                </div>
                <hr className="flex-1 h-[1.5px] w-4/5 bg-gray-300 self-center" />
                <div className="px-8 py-2 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-gray-300 rounded-full overflow-hidden p-3">
                            <UserIcon className="w-full h-full text-neutral-700" />
                        </div>
                        <div className="inline-flex flex-col text-sm text-left">
                            <strong>Nguyen Kien</strong>
                            <p className="text-gray-500">
                                ngkien299@hirelight.xyz
                            </p>
                        </div>
                    </div>
                    <p className="p-2 max-w-[280px] text-sm text-left self-center">
                        Almost done! Add a few details to create your company
                        account and you can start hiring.
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
                            Organization name
                        </label>
                        <input
                            type="text"
                            id="organization-name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Hirelight Corperation"
                            value={newOrgForm.name}
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
                        />
                    </div>
                    <div className="text-left">
                        <label
                            htmlFor="domain"
                            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Subdomain
                        </label>
                        <input
                            type="text"
                            id="domain"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newOrgForm.domain}
                            placeholder="hirelight-co"
                            required
                            onChange={e => {
                                setNewOrgForm({
                                    ...newOrgForm,
                                    domain: e.target.value,
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
                            <p>Opps! Something went wrong!!!</p>
                            <p>{newOrgFormErr.nameErr}</p>
                        </motion.div>
                    )}
                    <button
                        type="submit"
                        className="flex items-center gap-1 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading && <SpinLoading />}
                        Start a 15-day trial
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewOrganizationForm;
