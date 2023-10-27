"use client";

import React from "react";
import { EyeIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";

import { Logo } from "@/icons";

import pageStyles from "../../styles.module.scss";
import sections from "../../custom-field.json";

import styles from "./styles.module.scss";
import FormSectionCard from "./components/FormSectionCard";

type CustomFieldsSectionProps = {};

const CustomFieldsSection: React.FC<CustomFieldsSectionProps> = () => {
    const [profile, setProfile] = React.useState(sections.profile);
    const [appForm, setAppForm] = React.useState(sections.app_form);

    return (
        <section className={pageStyles.section__wrapper}>
            <h2 className={pageStyles.section__title}>
                Canidate Custom Fields
            </h2>

            <div className={pageStyles.section__content__wrapper}>
                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h4 className={`${pageStyles.content__h4} mb-1`}>
                            Manage your account’s candidate custom fields
                        </h4>
                        <p className={pageStyles.content__subheading}>
                            Edit, disable or change the order of the custom
                            fields that appear in the candidate profile and
                            application form.
                        </p>
                    </div>
                    <label className="relative w-full flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="inline-block w-full ml-3 font-medium text-sm text-neutral-700 dark:text-gray-300">
                            Show disabled fields
                        </span>
                    </label>
                </div>
                <section className={styles.fields__container}>
                    <div className={styles.fields__header__container}>
                        <h5 className="text-neutral-700 text-xl font-semibold flex items-center gap-2">
                            <Logo className="text-blue_primary_300 h-6 w-6" />
                            Candidate profile
                        </h5>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                className="flex gap-1 items-center text-sm text-blue_primary_700 font-semibold hover:underline"
                            >
                                <PlusCircleIcon className="w-4 h-4" />
                                <span>Create new section</span>
                            </button>

                            <button
                                type="button"
                                className="flex gap-1 items-center text-sm text-blue_primary_700 font-semibold hover:underline"
                            >
                                <EyeIcon className="w-4 h-4" />
                                <span>Preview</span>
                            </button>
                        </div>
                    </div>
                    <Reorder.Group
                        axis="y"
                        className={styles.field__list__container}
                        values={profile}
                        onReorder={setProfile}
                    >
                        {profile.map(field => (
                            <FormSectionCard
                                key={field.id}
                                data={field}
                                reorderFields={newOrder =>
                                    setProfile(prev =>
                                        prev.map(item => {
                                            if (item.id === field.id) {
                                                return {
                                                    ...field,
                                                    fields: newOrder,
                                                };
                                            }

                                            return item;
                                        })
                                    )
                                }
                            />
                        ))}
                    </Reorder.Group>
                </section>

                <section className={styles.app__form__section}>
                    <div
                        className={`${styles.fields__header__container} border-t border-gray-300`}
                    >
                        <h5 className="text-neutral-700 text-xl font-semibold flex items-center gap-2">
                            <Logo className="text-blue_primary_300 h-6 w-6" />
                            Application form
                        </h5>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                className="flex gap-1 items-center text-sm text-blue_primary_700 font-semibold hover:underline"
                            >
                                <EyeIcon className="w-4 h-4" />
                                <span>Preview</span>
                            </button>
                        </div>
                    </div>
                    <Reorder.Group
                        axis="y"
                        className={styles.field__list__container}
                        values={appForm}
                        onReorder={setAppForm}
                    >
                        {appForm.map((field, fieldIndex) => (
                            <FormSectionCard
                                key={field.id}
                                data={field}
                                reorderFields={newOrder =>
                                    setProfile(prev =>
                                        prev.map(item => {
                                            if (item.id === field.id) {
                                                return {
                                                    ...field,
                                                    fields: newOrder,
                                                };
                                            }

                                            return item;
                                        })
                                    )
                                }
                            />
                        ))}
                    </Reorder.Group>
                </section>
            </div>
        </section>
    );
};

export default CustomFieldsSection;
