"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { Button, Portal } from "@/components";
import transactionServices from "@/services/transaction/transaction.service";
import { handleError } from "@/helpers";
import { IPlanDto } from "@/services";

import styles from "./PlanOptions.module.scss";
import PurchaseModal from "./PurchaseModal";

const PlanOptions = () => {
    const router = useRouter();

    const { data: plansRes, isLoading } = useQuery({
        queryKey: ["plans"],
        queryFn: transactionServices.getPlans,
    });
    const [selected, setSelected] = useState<IPlanDto>();

    const handlePurchase = async (plan: IPlanDto) => {
        try {
            const res = await transactionServices.createPayment({
                bankCode: "zalopayapp",
                planId: 0,
                redirectUrl: "",
            });
            router.replace(res.data.order_url);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="w-full bg-white rounded-md drop-shadow-md border border-gray-300">
            <Portal>
                <AnimatePresence>
                    {selected && (
                        <PurchaseModal
                            plan={selected}
                            close={() => setSelected(undefined)}
                        />
                    )}
                </AnimatePresence>
            </Portal>
            <article className={styles.plan_wrapper}>
                <ul className={styles.card_list}>
                    {plansRes?.data
                        .sort((a, b) =>
                            a.employeeCapacity > b.employeeCapacity ? 1 : -1
                        )
                        .map((plan, index) => (
                            <li
                                key={index}
                                className={styles.plan_card_container}
                            >
                                <div className={styles.plan_card_header}>
                                    <div className="uppercase text-sm font-semibold text-blue_primary_700 mt-4 mb-2">
                                        monthly plan
                                    </div>
                                    <h4 className="text-3xl">
                                        <strong>{plan.name}</strong>
                                    </h4>
                                    <p className="text-sm font-light">
                                        Designed for occasional hiring
                                    </p>
                                </div>
                                <div className={styles.plan_card_company_size}>
                                    <div className="border border-dashed border-gray-300 p-2.5 rounded-md mb-4">
                                        <span className="text-gray-600 text-sm">
                                            Up to {plan.employeeCapacity}{" "}
                                            employees
                                        </span>
                                    </div>

                                    <div className="border-[1.5px] border-gray-400 rounded-md bg-slate-200/60 flex justify-center items-center py-2">
                                        <span className="text-sm">
                                            Pay monthly
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.plan_card_pricing}>
                                    <div className="min-h-[1.5rem] w-full flex items-center justify-end"></div>
                                    <div className="flex items-baseline justify-start">
                                        <h1 className="text-3xl">
                                            <strong>
                                                {plan.amount.toLocaleString()}
                                                VND
                                            </strong>
                                        </h1>
                                        <h3 className="text-lg font-light">
                                            /month
                                        </h3>
                                    </div>
                                    <div className="py-1 px-2 mt-2 bg-slate-100 flex justify-between items-baseline text-sm font-light">
                                        <p>Total cost per year</p>
                                        <span>
                                            {(
                                                plan.amount * 12
                                            ).toLocaleString()}
                                            VND
                                        </span>
                                    </div>

                                    <Button
                                        className="!w-full mt-4"
                                        onClick={() => setSelected(plan)}
                                    >
                                        Purchase
                                    </Button>
                                    <p className="mt-4 text-center text-xs text-gray-500">
                                        Priced for a company{" "}
                                        {plan.employeeCapacity} employees
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
                                                Async Video Interviews
                                            </strong>
                                        </li>
                                        <li>
                                            <strong>
                                                Multiple Choice Assessments
                                            </strong>
                                        </li>
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
