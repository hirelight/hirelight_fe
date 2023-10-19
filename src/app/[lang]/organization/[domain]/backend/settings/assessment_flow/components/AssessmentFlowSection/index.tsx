import React from "react";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

import pageStyles from "../../styles.module.scss";

import AssessmentsSlider from "./AssessmentsSlider";

const AssessmentFlowSection = () => {
    return (
        <section className={pageStyles.section__wrapper}>
            <h2 className={pageStyles.section__title}>Assessments Flow</h2>

            <div className={pageStyles.section__content__wrapper}>
                <div className="p-6">
                    <div className="mb-4">
                        <h4
                            className={`${pageStyles.content__h4} flex items-center gap-2`}
                        >
                            Reporting pipeline
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 text-blue_primary_700 font-semibold text-sm hover:text-blue_primary_800 hover:underline"
                            >
                                <PencilIcon className="w-4 h-4" />
                                <span>Edit</span>
                            </button>
                        </h4>
                        <p className={pageStyles.content__subheading}>
                            This pipeline includes common recruiting stages. You
                            can move, edit and rename the stages to suit your
                            hiring needs.
                        </p>
                    </div>

                    <AssessmentsSlider />

                    <hr className="my-8 border-gray-300" />
                    <div>
                        <h4
                            className={`${pageStyles.content__h4} flex items-center gap-2`}
                        >
                            Recruiting pipeline
                        </h4>
                        <div className="flex justify-between mb-6">
                            <p className={pageStyles.content__subheading}>
                                New pipelines can be created for jobs,
                                departments or locations.
                            </p>
                            <button
                                type="button"
                                className="flex items-center gap-1 text-blue_primary_700 hover:text-blue_primary_800 hover:underline"
                            >
                                <PlusCircleIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold whitespace-nowrap">
                                    Create new assessment flow
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-col"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssessmentFlowSection;
