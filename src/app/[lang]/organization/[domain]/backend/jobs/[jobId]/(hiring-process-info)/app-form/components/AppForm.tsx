"use client";

import React from "react";
import {
    ComputerDesktopIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

import { AppFormView, ButtonOutline } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import AppFormConfiguration from "./AppFormConfiguration/AppFormConfiguration";
import AppFormMobileView from "./AppFormMobileView/AppFormMobileView";
import AppFormFooter from "./AppFormFooter/AppFormFooter";

type AppFormProps = {};

const AppForm: React.FC<AppFormProps> = ({}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "app-form");
    const [previewDesktop, setPreviewDesktop] = React.useState(false);
    const job = useAppSelector(state => state.job.data);

    return (
        <div>
            <div className="w-full px-4 xl:px-0 flex justify-between items-center mb-4">
                <h3 className="text-sm uppercase font-bold text-neutral-700">
                    {t("customize_your_app_form")}
                </h3>
                <ButtonOutline
                    className="ml-auto"
                    onClick={() => setPreviewDesktop(!previewDesktop)}
                >
                    {previewDesktop ? (
                        <div>
                            <span className="hidden md:inline">
                                {t("view_mobile_mode")}
                            </span>
                            <span className="inline md:hidden">
                                <DocumentTextIcon className="w-6 h-6" />
                            </span>
                        </div>
                    ) : (
                        <div>
                            <span className="hidden md:inline">
                                {t("view_desktop_mode")}
                            </span>
                            <span className="inline md:hidden">
                                <ComputerDesktopIcon className="w-6 h-6" />
                            </span>
                        </div>
                    )}
                </ButtonOutline>
            </div>
            {previewDesktop ? (
                <AppFormView data={job} viewOnly={true} />
            ) : (
                <form className="drop-shadow-lg">
                    <div className="flex">
                        <AppFormConfiguration />
                        <AppFormMobileView />
                    </div>
                    <AppFormFooter />
                </form>
            )}
        </div>
    );
};

export default AppForm;
