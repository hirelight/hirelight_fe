"use client";

import React from "react";

import { AppFormView, ButtonOutline } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";

import AppFormConfiguration from "./AppFormConfiguration/AppFormConfiguration";
import AppFormMobileView from "./AppFormMobileView/AppFormMobileView";
import AppFormFooter from "./AppFormFooter/AppFormFooter";
import AppFormDesktopView from "./AppFormDesktopView/AppFormDesktopView";

type AppFormProps = {};

const AppForm: React.FC<AppFormProps> = ({}) => {
    const [previewDesktop, setPreviewDesktop] = React.useState(false);
    const job = useAppSelector(state => state.job.data);

    return (
        <div>
            <div className="w-full px-4 xl:px-0 flex justify-between items-center mb-4">
                <h3 className="text-sm uppercase font-bold text-neutral-700">
                    Customize your application form
                </h3>
                <ButtonOutline
                    className="ml-auto"
                    onClick={() => setPreviewDesktop(!previewDesktop)}
                >
                    {previewDesktop ? "View mobile mode" : "View destop mode"}
                </ButtonOutline>
            </div>
            {previewDesktop ? (
                <AppFormView data={job} />
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
