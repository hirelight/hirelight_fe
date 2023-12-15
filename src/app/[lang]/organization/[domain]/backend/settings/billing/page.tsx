import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import settingStyles from "../styles.module.scss";

import CurrentPlan from "./components/CurrentPlan";
import PlanOptions from "./components/PlanOptions";

export const metadata: Metadata = {
    title: "Hirelight | Organization Plan",
};

const OrganizationBilling = () => {
    return (
        <div>
            <section>
                <h3
                    className={
                        settingStyles.section_title +
                        " flex justify-between items-center md:w-2/3"
                    }
                >
                    Your current plan
                    <Link
                        href={"transactions"}
                        className="text-sm normal-case font-normal text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                    >
                        View purchases
                    </Link>
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
