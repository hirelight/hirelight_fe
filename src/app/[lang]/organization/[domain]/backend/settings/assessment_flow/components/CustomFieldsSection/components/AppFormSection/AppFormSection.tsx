import React, { useState } from "react";
import { AnimatePresence, LazyMotion, domMax } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { IAppFormTemplateSection } from "@/interfaces/app-form-template.interface";

import styles from "./AppFormSection.module.scss";
import SectionFieldList from "./SectionFieldList";

type AppFormSectionProps = {
    data: IAppFormTemplateSection;
    onReorderFields: (newOrder: any[]) => void;
};

const AppFormSection: React.FC<AppFormSectionProps> = ({
    data,
    onReorderFields,
}) => {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className="relative border-b border-gray-300 last:border-none">
            <div
                className={`${styles.section__label__toggle} group hover:bg-blue-100`}
            >
                <div className="flex-1 flex items-center gap-2">
                    <span>{data.name}</span>
                </div>

                <button
                    type="button"
                    className={`transition-transform duration-300 ${
                        isExpand ? "rotate-180" : ""
                    }`}
                    onClick={() => {
                        setIsExpand(!isExpand);
                    }}
                >
                    <ChevronDownIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="mx-4">
                <AnimatePresence>
                    {isExpand && (
                        <SectionFieldList
                            datas={data.fields}
                            reorderFields={onReorderFields}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AppFormSection;
