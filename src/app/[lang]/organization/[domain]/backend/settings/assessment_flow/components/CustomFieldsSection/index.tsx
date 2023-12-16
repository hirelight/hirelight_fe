"use client";

import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
    AnimatePresence,
    LazyMotion,
    Reorder,
    domAnimation,
} from "framer-motion";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Logo } from "@/icons";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import {
    IAppFormTemplate,
    IAppFormTemplateProfileSection,
} from "@/interfaces/app-form-template.interface";
import { Button } from "@/components";
import { IAppFormTemplateDto } from "@/services/app-form-template/app-form-template.interface";
import { handleError } from "@/helpers";

import pageStyles from "../../styles.module.scss";

import styles from "./styles.module.scss";
import FormSectionCard from "./components/FormSectionCard";
import AppFormSection from "./components/AppFormSection/AppFormSection";
import AddProfleSectionForm from "./components/AddProfileSectionForm";

type CustomFieldsSectionState = {
    appFormTemplate: Omit<IAppFormTemplateDto, "content" | "organizationId"> & {
        content: IAppFormTemplate;
        organizationId: string | null;
    };
    setAppFormTemplate: React.Dispatch<
        React.SetStateAction<
            Omit<IAppFormTemplateDto, "content" | "organizationId"> & {
                content: IAppFormTemplate;
                organizationId: string | null;
            }
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
    const queryClient = useQueryClient();
    const {
        data: templateRes,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["appform-template"],
        queryFn: appFormTemplateServices.getDefaultAppFormTemplate,
    });
    const [appFormTemplate, setAppFormTemplate] = useState<
        Omit<IAppFormTemplateDto, "content" | "organizationId"> & {
            content: IAppFormTemplate;
            organizationId: string | null;
        }
    >({
        id: "",
        name: "",
        content: {
            app_form: [],
            profile: [],
        },
        organizationId: null,
        createdTime: new Date(),
        updatedTime: new Date(),
        updaterId: "",
    });
    const unOrderField = useMemo(() => {
        return appFormTemplate.content.app_form
            .map(item => item.fields)
            .flat(1)
            .filter(item => ["Name", "Email", "Headline"].includes(item.label));
    }, [appFormTemplate.content.app_form]);

    const [showAddSection, setShowAddSection] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const fetchAppFormTemplate = useCallback(async () => {
        try {
            const res =
                await appFormTemplateServices.getDefaultAppFormTemplate();

            const parsedContent: IAppFormTemplate = JSON.parse(
                res.data.content
            );
            setAppFormTemplate({ ...res.data, content: parsedContent });
        } catch {
            toast.error("Fetch app form template failure!");
        }
    }, []);

    const handleSaveAppFormTemplateChanges = async () => {
        setLoading(true);
        try {
            if (appFormTemplate.organizationId) {
                const res = await appFormTemplateServices.editAsync({
                    ...appFormTemplate,
                    content: JSON.stringify(appFormTemplate.content),
                });
                await queryClient.invalidateQueries({
                    queryKey: ["appform-template"],
                });
                toast.success(res.message);
            } else {
                const res = await appFormTemplateServices.createAsync({
                    name: "Org Default",
                    content: JSON.stringify(appFormTemplate.content),
                });
                await queryClient.invalidateQueries({
                    queryKey: ["appform-template"],
                });
                toast.success(res.message);
            }
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (templateRes) {
            const parsedContent: IAppFormTemplate = JSON.parse(
                templateRes.data.content
            );
            setAppFormTemplate({ ...templateRes.data, content: parsedContent });
        }
    }, [templateRes]);

    if (isError) handleError(error);

    return (
        <CustomFieldsSectionContext.Provider
            value={{ appFormTemplate, setAppFormTemplate }}
        >
            <section className={pageStyles.section__wrapper}>
                <h2 className={pageStyles.section__title}>
                    Canidate Custom Fields
                </h2>

                <div className={pageStyles.section__content__wrapper}>
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
                            {isLoading ? (
                                <AppFormTemplateSkeleton size={6} />
                            ) : (
                                appFormTemplate.content.profile?.map(
                                    section => (
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
                                    )
                                )
                            )}
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

                        {isLoading ? (
                            <AppFormTemplateSkeleton size={3} />
                        ) : (
                            appFormTemplate.content.app_form?.map(section => (
                                <AppFormSection
                                    key={section.id}
                                    data={section}
                                    onReorderFields={newOrder => {
                                        setAppFormTemplate(prev => ({
                                            ...prev,
                                            content: {
                                                ...prev.content,
                                                app_form:
                                                    prev.content.app_form.map(
                                                        item => {
                                                            if (
                                                                item.id ===
                                                                section.id
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
                            ))
                        )}
                    </section>

                    <div className="p-4 md:p-6 border-t border-gray-300">
                        <Button
                            type="submit"
                            className="mr-4"
                            disabled={loading}
                            isLoading={loading}
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

const AppFormTemplateSkeleton = ({ size }: { size: number }) => {
    return (
        <ul className="w-full">
            {new Array(size).fill("").map((_, index) => (
                <li
                    key={index}
                    className="py-6 px-4 bg-white border-b border-gray-300 last:border-b-0"
                >
                    <div className="animate-pulse">
                        <div className="inline-block h-5 w-5 rounded bg-slate-200 mr-4"></div>
                        <div className="inline-block w-3/5 h-5 rounded bg-slate-300"></div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
