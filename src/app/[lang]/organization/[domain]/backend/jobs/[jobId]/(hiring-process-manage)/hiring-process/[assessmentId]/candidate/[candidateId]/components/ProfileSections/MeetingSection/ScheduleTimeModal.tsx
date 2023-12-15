"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

type ScheduleTimeModalProps = {
    show: boolean;
    close: () => void;
    scheduleTime: {
        from: string;
        to: string;
    }[];
};

const ScheduleTimeModal: React.FC<ScheduleTimeModalProps> = ({
    show,
    close,
    scheduleTime,
}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
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
                            <Dialog.Panel className="w-full max-w-2xl max-h-[640px] overflow-y-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {t("free_time")}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <ul>
                                        {scheduleTime?.map((item, index) => (
                                            <li
                                                key={index}
                                                className="text-sm py-4 border-t border-gray-300 first:border-t-0"
                                            >
                                                <h3 className="text-neutral-700 font-semibold mb-2">
                                                    Slot:
                                                </h3>
                                                <div className="flex gap-4">
                                                    <p className="flex flex-1 gap-4 font-medium">
                                                        <span>
                                                            {moment
                                                                .utc(item.from)
                                                                .local()
                                                                .locale(lang)
                                                                .format(
                                                                    "MM/DD/yyyy hh:mm A"
                                                                )}
                                                        </span>
                                                        -
                                                        <span>
                                                            {moment
                                                                .utc(item.to)
                                                                .local()
                                                                .locale(lang)
                                                                .format(
                                                                    "MM/DD/yyyy hh:mm A"
                                                                )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ScheduleTimeModal;
