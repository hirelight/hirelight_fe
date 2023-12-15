import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ITracsactionDto } from "@/services";
import transactionServices from "@/services/transaction/transaction.service";

import styles from "./TrasactionDetailModal.module.scss";

export default function TransactionDetailModal({
    isOpen,
    closeModal,
    transactionId,
}: {
    isOpen: boolean;
    closeModal: () => void;
    transactionId: string;
}) {
    const { data: transaction } = useQuery({
        queryKey: ["transaction", transactionId],
        queryFn: () => {
            if (transactionId)
                return transactionServices.getById(transactionId);
        },
    });

    const getBadgeOnStatus = (status: string) => {
        switch (status) {
            case "IDLE":
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        Processing
                    </span>
                );
            case "ACTIVE":
                return (
                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Successfully
                    </span>
                );
            case "INACTIVE":
                return (
                    <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                        Failure
                    </span>
                );
            default:
                return (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Default
                    </span>
                );
        }
    };

    if (!transaction) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="uppercase font-semibold leading-6 text-gray-900 mb-2"
                                >
                                    Transaction detail
                                </Dialog.Title>
                                <section className="lg:max-w-[500px]">
                                    <div className="w-full bg-white rounded-md drop-shadow-md">
                                        <div
                                            className={
                                                styles.plan_card_container
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.plan_card_header
                                                }
                                            >
                                                <div className="uppercase text-sm font-semibold text-blue_primary_700 mt-4 mb-2">
                                                    monthly plan
                                                </div>
                                                <h4 className="text-3xl">
                                                    <strong>
                                                        {
                                                            transaction.data
                                                                .subscriptionInfo
                                                                .name
                                                        }
                                                    </strong>
                                                </h4>
                                                <p className="text-sm font-light">
                                                    Designed for occasional
                                                    hiring
                                                </p>
                                            </div>
                                            <div
                                                className={
                                                    styles.plan_card_company_size
                                                }
                                            >
                                                <div className="border border-dashed border-gray-300 p-2.5 rounded-md mb-4">
                                                    <span className="text-gray-600 text-sm">
                                                        Up to{" "}
                                                        {
                                                            transaction.data
                                                                .subscriptionInfo
                                                                .employeeCapacity
                                                        }{" "}
                                                        employees
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.plan_card_pricing
                                                }
                                            >
                                                <div className="min-h-[1.5rem] w-full flex items-center justify-end"></div>
                                                <div className="flex items-baseline justify-start">
                                                    <h1 className="text-3xl">
                                                        <strong>
                                                            {transaction.data.subscriptionInfo.amount.toLocaleString()}
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
                                                            transaction.data
                                                                .subscriptionInfo
                                                                .amount * 12
                                                        ).toLocaleString()}
                                                        VND
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <h3 className="uppercase font-semibold">
                                                    <strong>Status</strong>
                                                </h3>

                                                {getBadgeOnStatus(
                                                    transaction.data.status
                                                )}
                                            </div>

                                            <div
                                                className={
                                                    styles.plan_card_features
                                                }
                                            >
                                                <div className="uppercase text-sm font-semibold text-blue_primary_700 mb-4">
                                                    Features
                                                </div>
                                                <ul className="text-sm space-y-1">
                                                    <li>
                                                        <strong>
                                                            Async Video
                                                            Interviews
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <strong>
                                                            Multiple Choice
                                                            Assessments
                                                        </strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
