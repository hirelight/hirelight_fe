import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
    CheckCircleIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

import { useAppSelector } from "@/redux/reduxHooks";
import { Button } from "@/components";

type MatchSkillsModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    skills: string[];
};

const MatchSkillsModal: React.FC<MatchSkillsModalProps> = ({
    isOpen,
    closeModal,
    skills,
}) => {
    const job = useAppSelector(state => state.job.data);

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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-0 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="flex justify-between items-center p-6 py-4 border-b border-gray-300"
                                >
                                    <strong className="text-xl">
                                        Skill details
                                    </strong>
                                    <button
                                        type="button"
                                        className="text-neutral-500 hover:text-neutral-900"
                                        onClick={closeModal}
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </Dialog.Title>
                                <div className="px-6 py-4 text-sm">
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-base">
                                            Skills associated with the job
                                        </h3>
                                        <p className="text-sm font-light">
                                            {skills.length} skills found on this
                                            profile match the skills associated
                                            with the job
                                        </p>
                                    </div>
                                    <ul className="space-y-4">
                                        {job.scanKeywords &&
                                            job.scanKeywords
                                                .split(",")
                                                .sort((a, b) =>
                                                    skills.includes(a) &&
                                                    !skills.includes(b)
                                                        ? -1
                                                        : 1
                                                )
                                                .map(keyword => (
                                                    <li
                                                        key={keyword}
                                                        className="flex gap-2 items-center"
                                                    >
                                                        <CheckCircleIcon
                                                            className={`w-6 h-6 ${
                                                                skills.includes(
                                                                    keyword
                                                                )
                                                                    ? "text-green-500"
                                                                    : "text-gray-600"
                                                            }`}
                                                        />
                                                        <span>{keyword}</span>
                                                    </li>
                                                ))}
                                    </ul>
                                </div>

                                <div className="border-t border-gray-300 py-4 px-6 text-right">
                                    <Button
                                        type="button"
                                        className="!rounded-full"
                                        onClick={closeModal}
                                    >
                                        Done
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MatchSkillsModal;
