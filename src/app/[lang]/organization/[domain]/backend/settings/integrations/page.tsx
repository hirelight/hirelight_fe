import { Metadata } from "next";
import React from "react";

import IntegrationList from "./components/IntegrationList";

export const metadata: Metadata = {
    title: "Hirelight - Integration - Hirelight",
};

const Integrations = () => {
    return (
        <div>
            <div className="flex justify-between">
                <h2
                    className={`uppercase mb-4 text-sm text-neutral-700 font-semibold`}
                >
                    Supported Third party
                </h2>
            </div>
            <IntegrationList />
        </div>
    );
};

export default Integrations;
