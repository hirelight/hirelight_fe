import React from "react";
import Link from "next/link";

import CreateAssessmentFlowForm from "./components/CreateAssessmentFlowForm";

type CreateAssessmentFlowProps = {};

const CreateAssessmentFlow: React.FC<CreateAssessmentFlowProps> = ({}) => {
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    Default pipeline
                </h3>
                <Link
                    href={"create-flow"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4"
                >
                    Create new flow
                </Link>
                <Link
                    href={"select-pipeline"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4 xl:mr-6"
                >
                    Change flow
                </Link>
            </div>
            <div className="bg-white py-6 drop-shadow-md rounded-md">
                <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                    Create new flow
                </h2>

                <CreateAssessmentFlowForm />
            </div>
        </React.Fragment>
    );
};

export default CreateAssessmentFlow;
