"use client";

import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";

import Portal from "@/components/Portal";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import AppFormSection from "./AppFormSection";
import AddQuestionModal from "./AddQuestionModal";
import CustomFieldOnType from "./CustomFieldOnType";

type AppFormConfigurationProps = {};

const AppFormConfiguration: React.FC<AppFormConfigurationProps> = ({}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "app-form");

    const [show, setShow] = React.useState(false);
    const appFormSections = useAppSelector(
        state => state.job.data.applicationForm
    );
    return (
        <React.Fragment>
            <Portal>
                {show && <AddQuestionModal closeModal={() => setShow(false)} />}
            </Portal>
            <div className="flex-1 flex-shrink-0 bg-white drop-shadow-lg pb-4 rounded-tr-md rounded-tl-md overflow-hidden">
                <div>
                    {appFormSections.form_structure?.map(section => (
                        <AppFormSection key={section.name} data={section} />
                    ))}
                    <ul className="px-4 xl:px-6 text-neutral-700 font-medium text-sm">
                        {appFormSections.questions.map(field => (
                            <li
                                key={field.label}
                                className="border-b last-of-type:border-none border-gray-300"
                            >
                                <CustomFieldOnType field={field} />
                            </li>
                        ))}
                    </ul>

                    <div className="px-4" onClick={() => setShow(true)}>
                        <button
                            type="button"
                            className="flex items-center text-blue_primary_800 hover:underline font-medium"
                        >
                            <span>
                                <PlusCircleIcon className="w-5 h-5 mr-1" />
                            </span>
                            {t("add_a_question")}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AppFormConfiguration;
