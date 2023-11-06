"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
    AnimatePresence,
    LazyMotion,
    Reorder,
    domAnimation,
} from "framer-motion";
import { toast } from "react-toastify";

import { Logo } from "@/icons";
import { intialAppForm } from "@/utils/shared/initialDatas";
import { IAppFormField } from "@/interfaces";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import {
    IAppFormTemplate,
    IAppFormTemplateProfileSection,
    IAppFormTemplateSection,
} from "@/interfaces/app-form-template.interface";
import { useAppDispatch } from "@/redux/reduxHooks";
import { Button } from "@/components";
import { setAppFormTemplate } from "@/redux/slices/app-form-template.slice";
import { IAppFormTemplateDto } from "@/services/app-form-template/app-form-template.interface";

import pageStyles from "../../styles.module.scss";
import sections from "../../custom-field.json";

import styles from "./styles.module.scss";
import FormSectionCard from "./components/FormSectionCard";
import AppFormSection from "./components/AppFormSection/AppFormSection";
import AddProfleSectionForm from "./components/AddProfileSectionForm";

type CustomFieldsSectionState = {
    appFormTemplate: Omit<IAppFormTemplateDto, "content"> & {
        content: IAppFormTemplate;
    };
    setAppFormTemplate: React.Dispatch<
        React.SetStateAction<
            Omit<IAppFormTemplateDto, "content"> & { content: IAppFormTemplate }
        >
    >;
};
const CustomFieldsSectionContext =
    createContext<CustomFieldsSectionState | null>(null);

export const useAppFormTemplate = (): CustomFieldsSectionState => {
    const context = React.useContext(CustomFieldsSectionContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

type CustomFieldsSectionProps = {};

const CustomFieldsSection: React.FC<CustomFieldsSectionProps> = () => {
    const [appFormTemplate, setAppFormTemplate] = useState<
        Omit<IAppFormTemplateDto, "content"> & { content: IAppFormTemplate }
    >({
        id: 0,
        name: "",
        content: {
            app_form: [],
            profile: [],
        },
        organizationId: 0,
        createdTime: new Date(),
        updatedTime: new Date(),
        updaterId: 0,
    });
    const unOrderField = useMemo(() => {
        return appFormTemplate.content.app_form
            .map(item => item.fields)
            .flat(1)
            .filter(item => ["Name", "Email", "Headline"].includes(item.label));
    }, [appFormTemplate.content.app_form]);

    const [showAddSection, setShowAddSection] = React.useState(false);

    const handleSaveAppFormTemplateChanges = async () => {
        try {
            const res = await appFormTemplateServices.editAsync({
                ...appFormTemplate,
                content: JSON.stringify(appFormTemplate.content),
            });
            toast.success(res.message);
        } catch (error) {
            toast.error("Save failure!");
        }
    };

    useEffect(() => {
        const fetchAppFormTemplate = async () => {
            try {
                const res = await appFormTemplateServices.getListAsync();
                const parsedContent: IAppFormTemplate = JSON.parse(
                    res.data[0].content
                );
                setAppFormTemplate({ ...res.data[0], content: parsedContent });
            } catch {
                toast.error("Fetch app form template failure!");
            }
        };
        // const create = async () => {
        //     try {
        //         const res = await appFormTemplateServices.createAsync({
        //             name: "Default",
        //             content: JSON.stringify(sections),
        //         });
        //         toast.success("Success");
        //     } catch (error) {
        //         toast.error("Fialure");
        //     }
        // };
        // create();
        fetchAppFormTemplate();
    }, []);

    return (
        <CustomFieldsSectionContext.Provider
            value={{ appFormTemplate, setAppFormTemplate }}
        >
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
                                    onClick={() => setShowAddSection(true)}
                                >
                                    <PlusCircleIcon className="w-5 h-5" />
                                    <span className="hidden md:inline">
                                        Create new section
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="flex gap-1 items-center text-sm text-blue_primary_700 font-semibold hover:underline"
                                >
                                    <EyeIcon className="w-5 h-5" />
                                    <span className="hidden md:inline">
                                        Preview
                                    </span>
                                </button>
                            </div>
                        </div>
                        <Reorder.Group
                            axis="y"
                            className={styles.field__list__container}
                            values={appFormTemplate.content.profile}
                            onReorder={newOrder =>
                                setAppFormTemplate(prev => ({
                                    ...prev,
                                    content: {
                                        ...prev.content,
                                        profile: newOrder,
                                    },
                                }))
                            }
                        >
                            {appFormTemplate.content.profile?.map(section => (
                                <FormSectionCard
                                    key={section.id}
                                    data={section}
                                    reorderFields={newOrder => {
                                        setAppFormTemplate(prev => ({
                                            ...prev,
                                            content: {
                                                ...prev.content,
                                                profile:
                                                    prev.content.profile.map(
                                                        item => {
                                                            if (
                                                                item.id ===
                                                                section.id
                                                            ) {
                                                                return {
                                                                    ...section,
                                                                    fields: newOrder,
                                                                };
                                                            }

                                                            return item;
                                                        }
                                                    ),
                                            },
                                        }));
                                    }}
                                />
                            ))}
                        </Reorder.Group>
                        <LazyMotion features={domAnimation}>
                            <AnimatePresence>
                                {showAddSection && (
                                    <AddProfleSectionForm
                                        onAdd={(
                                            newSection: IAppFormTemplateProfileSection
                                        ) => {
                                            setAppFormTemplate(prev => ({
                                                ...prev,
                                                content: {
                                                    ...prev.content,
                                                    profile:
                                                        prev.content.profile.concat(
                                                            [newSection]
                                                        ),
                                                },
                                            }));
                                            setShowAddSection(false);
                                        }}
                                        onCancel={() =>
                                            setShowAddSection(false)
                                        }
                                    />
                                )}
                            </AnimatePresence>
                        </LazyMotion>
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

                        {appFormTemplate.content.app_form?.map(section => (
                            <AppFormSection
                                key={section.id}
                                data={section}
                                onReorderFields={newOrder => {
                                    setAppFormTemplate(prev => ({
                                        ...prev,
                                        content: {
                                            ...prev.content,
                                            app_form: prev.content.app_form.map(
                                                item => {
                                                    if (
                                                        item.id === section.id
                                                    ) {
                                                        return {
                                                            ...section,
                                                            fields:
                                                                item.id ===
                                                                "personal_information"
                                                                    ? unOrderField.concat(
                                                                          newOrder
                                                                      )
                                                                    : newOrder,
                                                        };
                                                    }

                                                    return item;
                                                }
                                            ),
                                        },
                                    }));
                                }}
                            />
                        ))}
                    </section>

                    <div className="p-4 md:p-6 border-t border-gray-300">
                        <Button
                            type="submit"
                            className="mr-4"
                            onClick={handleSaveAppFormTemplateChanges}
                        >
                            Save changes
                        </Button>
                        <button
                            type="button"
                            className="text-neutral-500 font-semibold text-sm hover:text-neutral-600 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </section>
        </CustomFieldsSectionContext.Provider>
    );
};

export default CustomFieldsSection;
