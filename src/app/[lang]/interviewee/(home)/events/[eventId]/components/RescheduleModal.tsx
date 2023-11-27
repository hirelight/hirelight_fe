"use client";

import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

import { ButtonOutline, CustomInput } from "@/components";
import { handleError } from "@/helpers";
import meetingServices from "@/services/meeting/meeting.service";

type RescheduleModalProps = {
    meetingId: string;
    show: boolean;
    close: () => void;
};

const RescheduleModal: React.FC<RescheduleModalProps> = ({
    meetingId,
    show,
    close,
}) => {
    const [sections, setSections] = useState<
        {
            from: string;
            to: string;
        }[]
    >([]);
    const [formState, setFormState] = useState({
        from: new Date(),
        to: new Date(),
    });

    const handleSaveSection = () => {
        const { from, to } = formState;
        const utcFrom = moment.parseZone(from).utc().format();
        const utcTo = moment.parseZone(to).utc().format();
        setSections(prev =>
            prev.concat([
                {
                    from: utcFrom,
                    to: utcTo,
                },
            ])
        );
    };

    const handleSendReschedule = async () => {
        try {
            const res = await meetingServices.candidateReScheduleMeeting(
                meetingId,
                JSON.stringify(sections)
            );

            toast.success(res.message);
        } catch (error: any) {
            handleError(error);
        }
    };

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
                                    Reschedule
                                </Dialog.Title>
                                <div className="mt-2">
                                    <ul className="space-y-4">
                                        {sections.map((item, index) => (
                                            <li key={index} className="text-sm">
                                                <h3 className="text-neutral-700 font-semibold mb-2">
                                                    Slot:
                                                </h3>
                                                <div className="flex gap-4">
                                                    <p className="flex flex-1 gap-4">
                                                        <span>
                                                            {moment
                                                                .utc(item.from)
                                                                .local()
                                                                .format(
                                                                    "MM/DD/yyy hh:mm A"
                                                                )}
                                                        </span>
                                                        -
                                                        <span>
                                                            {moment
                                                                .utc(item.to)
                                                                .local()
                                                                .format(
                                                                    "MM/DD/yyy hh:mm A"
                                                                )}
                                                        </span>
                                                    </p>

                                                    <button
                                                        type="button"
                                                        className="p-1 rounded hover:bg-slate-200/80"
                                                        onClick={() =>
                                                            setSections(prev =>
                                                                prev.filter(
                                                                    (
                                                                        sec,
                                                                        secI
                                                                    ) =>
                                                                        secI !==
                                                                        index
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <TrashIcon className="text-red-500 w-5 h-5" />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Disclosure as="section" className="mt-6">
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="text-sm text-neutral-700 font-semibold hover:underline">
                                                    Add free time slot
                                                </Disclosure.Button>
                                                <Transition
                                                    enter="transition duration-100 ease-out"
                                                    enterFrom="transform scale-95 opacity-0"
                                                    enterTo="transform scale-100 opacity-100"
                                                    leave="transition duration-75 ease-out"
                                                    leaveFrom="transform scale-100 opacity-100"
                                                    leaveTo="transform scale-95 opacity-0"
                                                >
                                                    <Disclosure.Panel className="pt-4 text-sm text-gray-500 space-y-4">
                                                        <CustomInput
                                                            title="From"
                                                            type="datetime-local"
                                                            value={moment(
                                                                formState.from
                                                            ).format(
                                                                "YYYY-MM-DDTHH:mm"
                                                            )}
                                                            onChange={e => {
                                                                setFormState(
                                                                    prev => ({
                                                                        ...prev,
                                                                        from: new Date(
                                                                            e.target.value
                                                                        ),
                                                                    })
                                                                );
                                                            }}
                                                        />
                                                        <CustomInput
                                                            title="To"
                                                            type="datetime-local"
                                                            value={moment(
                                                                formState.to
                                                            ).format(
                                                                "YYYY-MM-DDTHH:mm"
                                                            )}
                                                            onChange={e => {
                                                                setFormState(
                                                                    prev => ({
                                                                        ...prev,
                                                                        to: new Date(
                                                                            e.target.value
                                                                        ),
                                                                    })
                                                                );
                                                            }}
                                                        />

                                                        <div>
                                                            <ButtonOutline
                                                                onClick={
                                                                    handleSaveSection
                                                                }
                                                            >
                                                                Save section
                                                            </ButtonOutline>

                                                            <Disclosure.Button>
                                                                <span className="text-sm font-semibold text-neutral-700 hover:underline ml-4">
                                                                    Close
                                                                </span>
                                                            </Disclosure.Button>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Disclosure>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleSendReschedule}
                                        >
                                            Send request
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default RescheduleModal;
