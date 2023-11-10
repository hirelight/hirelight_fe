import React from "react";
import Link from "next/link";

import AssessmentFlowForm from "./components/AssessmentFlowForm";

type CreateAssessmentFlowProps = {};

const CreateAssessmentFlow: React.FC<CreateAssessmentFlowProps> = ({}) => {
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    Custom flow
                </h3>
                <Link
                    href={"select-pipeline"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4 xl:mr-6"
                >
                    Apply template
                </Link>
            </div>
            <div className="bg-white py-6 drop-shadow-md rounded-md">
                <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                    Create new flow
                </h2>

                <AssessmentFlowForm />
            </div>
        </React.Fragment>
    );
};

export default CreateAssessmentFlow;
