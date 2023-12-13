"use client";

import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PencilIcon } from "@heroicons/react/24/solid";

import { Button, ButtonOutline, CustomInput } from "@/components";
import { handleError, isInvalidForm } from "@/helpers";
import meetingServices from "@/services/meeting/meeting.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { Roles } from "@/services";

type RescheduleModalProps = {
    meetingId: string;
    show: boolean;
    close: () => void;
    scheduleTime:
        | {
              from: string;
              to: string;
          }[]
        | null;
};

const RescheduleModal: React.FC<RescheduleModalProps> = ({
    meetingId,
    show,
    close,
    scheduleTime,
}) => {
    const { eventId } = useParams();

    const { authUser } = useAppSelector(state => state.auth);
    const queryClient = useQueryClient();

    const [sections, setSections] = useState<
        {
            from: string;
            to: string;
        }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        from: new Date(),
        to: new Date(),
    });
    const [formErr, setFormErr] = useState({
        fromErr: "",
        toErr: "",
        durationErr: "",
    });

    const inValidInput = (): boolean => {
        const errors = { ...formErr };
        const { from, to } = formState;

        if (moment(to).isSameOrBefore(from))
            errors.toErr = "The from time must greator than to time";

        if (moment(from).isSameOrBefore(moment()))
            errors.fromErr = "Free time must start in the future";

        if (
            Math.abs(moment(from).diff(to, "milliseconds")) >
            24 * 60 * 60 * 1000
        ) {
            errors.durationErr = "Meeting duration must within 24 hours!";
        }

        if (isInvalidForm(errors)) {
            toast.error("Invalid input");
            setFormErr(errors);
            return true;
        }

        return false;
    };

    const handleSaveSection = () => {
        if (inValidInput()) return;

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
        if (sections.length === 0)
            return toast.error(
                "Please provide information about your free time!"
            );
        setLoading(true);
        try {
            let res;
            if (authUser!!.role === Roles.CANDIDATE) {
                res = await meetingServices.candidateReScheduleMeeting(
                    meetingId,
                    JSON.stringify(sections)
                );
            } else {
                res = await meetingServices.employerReScheduleMeeting(
                    meetingId,
                    JSON.stringify(sections)
                );
            }

            await queryClient.invalidateQueries({
                queryKey: ["meeting", eventId],
            });

            toast.success(res.message);
            close();
        } catch (error: any) {
            handleError(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (scheduleTime) {
            setSections(scheduleTime);
        }
    }, [scheduleTime]);

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
                                    <ul>
                                        {sections.map((item, index) => (
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

                                                    {/* <button
                                                        type="button"
                                                        className="p-1 rounded hover:bg-slate-200/80"
                                                        onClick={() =>
                                                            setFormState({
                                                                from: moment
                                                                    .utc(
                                                                        item.from
                                                                    )
                                                                    .toDate(),
                                                                to: moment
                                                                    .utc(
                                                                        item.to
                                                                    )
                                                                    .toDate(),
                                                            })
                                                        }
                                                    >
                                                        <PencilIcon className="text-neutral-700 w-5 h-5" />
                                                    </button> */}

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
                                                                setFormErr({
                                                                    ...formErr,
                                                                    fromErr: "",
                                                                    durationErr:
                                                                        "",
                                                                });
                                                            }}
                                                            required
                                                            errorText={
                                                                formErr.fromErr
                                                            }
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
                                                                setFormErr({
                                                                    ...formErr,
                                                                    toErr: "",
                                                                    durationErr:
                                                                        "",
                                                                });
                                                            }}
                                                            required
                                                            errorText={
                                                                formErr.toErr
                                                            }
                                                        />
                                                        {formErr.durationErr && (
                                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                                <span className="font-medium">
                                                                    {
                                                                        formErr.durationErr
                                                                    }{" "}
                                                                </span>
                                                            </p>
                                                        )}

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
                                        <Button
                                            type="button"
                                            disabled={loading}
                                            isLoading={loading}
                                            onClick={handleSendReschedule}
                                        >
                                            Send request
                                        </Button>
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
