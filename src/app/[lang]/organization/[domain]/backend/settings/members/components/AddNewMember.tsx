"use client";

import React, { FormEvent, useState } from "react";
import { m } from "framer-motion";
import { toast } from "react-toastify";

import { Button, CustomInput } from "@/components";
import employerOrgServices from "@/services/employer-organization/employer-organization.service";
import { SpinLoading } from "@/icons";

const roles = [
    {
        id: "1701763156138693",
        name: "ASSESSOR",
        permissions: [
            {
                id: "797291848576587",
                name: "CRUD_QUESTION",
            },
            {
                id: "7967986238133776",
                name: "CRUD_TAG",
            },
        ],
    },
    {
        id: "9589275051596120",
        name: "RECRUITER",
        permissions: [
            {
                id: "797291848576587",
                name: "CRUD_QUESTION",
            },
            {
                id: "181534528092540",
                name: "CREATE_JOB_POST",
            },
            {
                id: "5993076413323132",
                name: "CRUD_TEMPLATE_APPLICATION_FORM",
            },
            {
                id: "6923532849280069",
                name: "CRUD_TEMPLATE_ASSESSMENT_FLOW",
            },
            {
                id: "7967986238133776",
                name: "CRUD_TAG",
            },
        ],
    },
    {
        id: "9948957641178824",
        name: "ORGANIZATION_ADMIN",
        permissions: [
            {
                id: "5993076413323132",
                name: "CRUD_TEMPLATE_APPLICATION_FORM",
            },
            {
                id: "8274102886046760",
                name: "CRUD_TEMPLATE_EMAIL",
            },
            {
                id: "6923532849280069",
                name: "CRUD_TEMPLATE_ASSESSMENT_FLOW",
            },
            {
                id: "181534528092540",
                name: "CREATE_JOB_POST",
            },
            {
                id: "7967986238133776",
                name: "CRUD_TAG",
            },
            {
                id: "797291848576587",
                name: "CRUD_QUESTION",
            },
        ],
    },
];

const AddNewMember = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        employerEmail: "",
        roleId: roles[0].id,
    });

    const handleAddEmployer = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res =
                await employerOrgServices.inviteEmployerAsync(formState);
            setFormState({
                ...formState,
                employerEmail: "",
            });
            toast.success(res.message);
            setIsLoading(false);
        } catch (error) {
            toast.error("Add new member failure");
            setIsLoading(false);
        }
    };

    return (
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
                        title="Email"
                        type="email"
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
                            User permissions
                        </h3>
                        <div className="flex items-center gap-4">
                            {roles.map(role => (
                                <div
                                    key={role.id}
                                    className="flex items-center"
                                >
                                    <input
                                        id={`role-${role.id}`}
                                        type="radio"
                                        value={role.id}
                                        checked={formState.roleId === role.id}
                                        name="default-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={e => {
                                            if (e.currentTarget.checked)
                                                setFormState({
                                                    ...formState,
                                                    roleId: role.id,
                                                });
                                        }}
                                    />
                                    <label
                                        htmlFor={`role-${role.id}`}
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {role.name.charAt(0) +
                                            role.name
                                                .slice(1)
                                                .toLowerCase()
                                                .replace("_", " ")}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-neutral-500">
                            This is the most versatile option. Based on job or
                            department these users can: create jobs and hiring
                            teams, assign roles in a team, move and comment on
                            candidates.
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
                        Invite member
                    </Button>

                    <button
                        type="button"
                        className="text-sm text-neutral-600 font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </m.div>
    );
};

export default AddNewMember;
