import React from "react";

import PlanOptions from "./components/PlanOptions";

const HirelightSubscription = () => {
    return (
        <div className="px-6 py-4">
            <h3 className="uppercase font-semibold text-sm text-neutral-700 mb-4">
                System plans
            </h3>
            <PlanOptions />
        </div>
    );
};

export default HirelightSubscription;
