"use client";

import React from "react";

import { Button } from "@/components";
import interceptor from "@/services/interceptor";

import styles from "./PlanOptions.module.scss";

const plans = [
    {
        type: "Monthly",
        name: "Starter",
        helper: "Designed for occasional hiring",
        numOfEmployees: {
            min: 0,
            max: 50,
        },

        price: 149,
        features: {
            jobSlots: 2,
            asyncInterview: true,
            assessment: true,
        },
    },
    {
        type: "Monthly",
        name: "Standard",
        helper: "Designed for consistent hiring",
        numOfEmployees: {
            min: 50,
            max: 100,
        },

        price: 299,
        features: {
            jobSlots: -1,
            asyncInterview: true,
            assessment: true,
        },
    },
    {
        type: "Annual",
        name: "Premier",
        helper: "Designed for strategic hiring",
        numOfEmployees: {
            max: 500,
        },

        price: 459,
        features: {
            jobSlots: -1,
            asyncInterview: true,
            assessment: true,
        },
    },
];

const PlanOptions = () => {
    const handlePurchase = async () => {
        try {
            const res = await interceptor.post(
                "/payemnt/createPayment",
                {},
                {
                    params: {
                        bankCode: "ABB",
                        planId: 3381025271316480,
                    },
                }
            );
        } catch (error) {}
    };

    return (
        <div className="w-full bg-white rounded-md drop-shadow-md border border-gray-300">
            <article className={styles.plan_wrapper}>
                <ul className={styles.card_list}>
                    {plans.map((plan, index) => (
                        <li key={index} className={styles.plan_card_container}>
                            <div className={styles.plan_card_header}>
                                <div className="uppercase text-sm font-semibold text-blue_primary_700 mt-4 mb-2">
                                    {plan.type} plan
                                </div>
                                <h4 className="text-3xl">
                                    <strong>{plan.name}</strong>
                                </h4>
                                <p className="text-sm font-light">
                                    {plan.helper}
                                </p>
                            </div>
                            <div className={styles.plan_card_company_size}>
                                <div className="border border-dashed border-gray-300 p-2.5 rounded-md mb-4">
                                    <span className="text-gray-600 text-sm">
                                        Up to{" "}
                                        {plan.numOfEmployees.min !== undefined
                                            ? plan.numOfEmployees.min === 0
                                                ? `up to ${plan.numOfEmployees.max}`
                                                : `${plan.numOfEmployees.min}-${plan.numOfEmployees.max}`
                                            : `${plan.numOfEmployees.max}+`}{" "}
                                        employees
                                    </span>
                                </div>

                                <div className="border-[1.5px] border-gray-400 rounded-md bg-slate-200/60 flex justify-center items-center py-2">
                                    <span className="text-sm">Pay monthly</span>
                                </div>
                            </div>
                            <div className={styles.plan_card_pricing}>
                                <div className="min-h-[1.5rem] w-full flex items-center justify-end"></div>
                                <div className="flex items-baseline justify-start">
                                    <h1 className="text-3xl">
                                        <strong>${plan.price}</strong>
                                    </h1>
                                    <h3 className="text-lg font-light">
                                        /month
                                    </h3>
                                </div>
                                <div className="py-1 px-2 mt-2 bg-slate-100 flex justify-between items-baseline text-sm font-light">
                                    <p>Total cost per year</p>
                                    <span>
                                        ${(plan.price * 12).toLocaleString()}
                                    </span>
                                </div>

                                <Button
                                    className="!w-full mt-4"
                                    onClick={handlePurchase}
                                >
                                    Purchase
                                </Button>
                                <p className="mt-4 text-center text-xs text-gray-500">
                                    Priced for a company{" "}
                                    {plan.numOfEmployees.min !== undefined
                                        ? plan.numOfEmployees.min === 0
                                            ? `up to ${plan.numOfEmployees.max}`
                                            : `${plan.numOfEmployees.min}-${plan.numOfEmployees.max}`
                                        : `${plan.numOfEmployees.max}+`}{" "}
                                    employees
                                </p>
                            </div>

                            <div className="min-h-[1px] max-h-[1px] w-full bg-gray-300" />
                            <div className={styles.plan_card_features}>
                                <div className="uppercase text-sm font-semibold text-blue_primary_700 mb-4">
                                    Features
                                </div>
                                <ul className="text-sm space-y-1">
                                    <li>
                                        <strong>
                                            {plan.features.jobSlots < 0
                                                ? "Unlimited"
                                                : plan.features.jobSlots}{" "}
                                            job slots
                                        </strong>
                                    </li>
                                    {plan.features.assessment && (
                                        <li>
                                            <strong>
                                                Async Video Interviews
                                            </strong>
                                        </li>
                                    )}
                                    {plan.features.asyncInterview && (
                                        <li>
                                            <strong>
                                                Multiple Choice Assessments
                                            </strong>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    );
};

export default PlanOptions;
