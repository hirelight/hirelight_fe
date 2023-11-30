import React from "react";

import settingStyles from "../styles.module.scss";

import CurrentPlan from "./components/CurrentPlan";
import PlanOptions from "./components/PlanOptions";

const OrganizationBilling = () => {
    return (
        <div>
            <section>
                <h3 className={settingStyles.section_title}>
                    Your current plan
                </h3>
                <CurrentPlan />
            </section>

            <section className="mt-8">
                <h3 className={settingStyles.section_title}>
                    Upgrade plan options
                </h3>
                <PlanOptions />
            </section>
        </div>
    );
};

export default OrganizationBilling;
