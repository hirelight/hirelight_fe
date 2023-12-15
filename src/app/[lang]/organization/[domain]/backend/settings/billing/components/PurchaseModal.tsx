"use client";

import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { IPlanDto } from "@/services";
import bankDatas from "@/utils/shared/support-bank.json";
import { Button } from "@/components";
import transactionServices from "@/services/transaction/transaction.service";
import { handleError } from "@/helpers";

import styles from "./PurchaseModal.module.scss";

const PurchaseModal = ({
    plan,
    close,
}: {
    plan: IPlanDto;
    close: () => void;
}) => {
    const router = useRouter();

    const [showBanks, setShowBanks] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");

    const handlePurchase = async () => {
        if (!selectedBank)
            return toast.error("Please select a payment method!");
        try {
            const res = await transactionServices.createPayment({
                bankCode: selectedBank,
                planId: plan.id,
                redirectUrl: window.location.href.replace(
                    "billing",
                    "transactions"
                ),
            });
            close();
            router.replace(res.data.order_url);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                className="absolute inset-0 bg-gray-600 bg-opacity-70"
            ></motion.div>
            <motion.div
                initial={{
                    height: "calc(100vh - 400px)",
                }}
                animate={{
                    height: "calc(100vh - 48px)",
                }}
                exit={{
                    height: "calc(100vh - 400px)",
                }}
                className={styles.modal__wrapper}
            >
                <div className="flex flex-col-reverse lg:justify-between lg:items-stretch lg:flex-row gap-6 p-12 overflow-y-auto max-w-screen relative">
                    <section className="flex-1 flex-shrink-0">
                        <h3 className="uppercase mb-6">
                            <strong>Select payment method</strong>
                        </h3>
                        <div className="bg-white rounded-md drop-shadow-md border border-gray-300 h-full w-full">
                            <div className="mx-6 my-4 border border-gray-300">
                                {Object.keys(bankDatas).map(key => {
                                    if (
                                        bankDatas[key as keyof typeof bankDatas]
                                            .length === 1
                                    ) {
                                        return (
                                            <label
                                                key={key}
                                                htmlFor={
                                                    bankDatas[
                                                        key as keyof typeof bankDatas
                                                    ][0].bankcode
                                                }
                                                className="py-4 px-6 block border-b border-gray-300 last:border-b-0 relative hover:bg-slate-100 transition-all cursor-pointer"
                                            >
                                                <span>
                                                    {
                                                        bankDatas[
                                                            key as keyof typeof bankDatas
                                                        ][0].name
                                                    }
                                                </span>
                                                <input
                                                    id={
                                                        bankDatas[
                                                            key as keyof typeof bankDatas
                                                        ][0].bankcode
                                                    }
                                                    type="radio"
                                                    name="select-bank"
                                                    checked={
                                                        bankDatas[
                                                            key as keyof typeof bankDatas
                                                        ][0].bankcode ===
                                                        selectedBank
                                                    }
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setSelectedBank(
                                                                bankDatas[
                                                                    key as keyof typeof bankDatas
                                                                ][0].bankcode
                                                            );
                                                        }
                                                    }}
                                                    className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                                                />
                                            </label>
                                        );
                                    }
                                    return (
                                        <React.Fragment key={key}>
                                            <div
                                                role="button"
                                                className=" py-4 px-6 border-b border-gray-300 last:border-b-0 relative hover:bg-slate-100 transition-all cursor-pointer"
                                                onClick={() =>
                                                    setShowBanks(!showBanks)
                                                }
                                            >
                                                <span>Ngân hàng nội địa</span>
                                                <div
                                                    className={`absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                                                        showBanks
                                                            ? "rotate-90"
                                                            : ""
                                                    }`}
                                                >
                                                    <ChevronRightIcon className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {showBanks && (
                                                    <motion.ul
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "480px",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        className="grid grid-cols-3 overflow-y-auto"
                                                    >
                                                        {bankDatas[
                                                            key as keyof typeof bankDatas
                                                        ].map(item => (
                                                            <li
                                                                key={
                                                                    item.bankcode
                                                                }
                                                                className="w-full border-b border-gray-200 sm:border-r dark:border-gray-600"
                                                            >
                                                                <div className="flex items-center py-2 px-3.5">
                                                                    <input
                                                                        id={
                                                                            item.bankcode
                                                                        }
                                                                        type="radio"
                                                                        value=""
                                                                        name="select-bank"
                                                                        checked={
                                                                            item.bankcode ===
                                                                            selectedBank
                                                                        }
                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                                                                        onChange={e => {
                                                                            if (
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                            ) {
                                                                                setSelectedBank(
                                                                                    item.bankcode
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    <label
                                                                        htmlFor={
                                                                            item.bankcode
                                                                        }
                                                                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                    <section className="flex-1 lg:max-w-[500px]">
                        <h3 className="uppercase mb-6">
                            <strong>Order summary</strong>
                        </h3>
                        <div className="w-full bg-white rounded-md drop-shadow-md">
                            <div className={styles.plan_card_container}>
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
                                </div>

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
                            </div>
                        </div>
                        <Button
                            className="!w-full mt-6"
                            onClick={handlePurchase}
                        >
                            Purchase
                        </Button>
                    </section>
                </div>

                <button
                    type="button"
                    className="absolute -top-3 right-3 -translate-y-full"
                    onClick={close}
                >
                    <XMarkIcon className="w-8 h-8 text-white" />
                </button>
            </motion.div>
        </div>
    );
};

export default PurchaseModal;
