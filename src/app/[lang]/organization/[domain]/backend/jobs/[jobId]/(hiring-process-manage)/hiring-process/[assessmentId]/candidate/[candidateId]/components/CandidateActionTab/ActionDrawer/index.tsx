"use client";

import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { toast } from "react-toastify";
import moment from "moment";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";

import {
    Button,
    CustomInput,
    CustomTextArea,
    DatePicker,
    TimerPicker,
} from "@/components";
import { CloseIcon } from "@/icons";
import { useAppSelector } from "@/redux/reduxHooks";
import { ApplicationFormJSON, ICreateMeetings } from "@/services";
import { AppFormDefaultSection, IAppFormField } from "@/interfaces";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import meetingServices from "@/services/meeting/meeting.service";
import { isInvalidForm } from "@/helpers";

import SelectAttendeeList from "./SelectAttendeeList";

const backdropVariants = {
    backdropOpen: { opacity: 1 },
    backdropClose: { opacity: 0 },
};

const drawerVariants = {
    drawerEnter: { translateX: 0 },
    drawerLeave: { translateX: "100%" },
};

interface IActionDrawer {
    title?: string;
    description?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    show?: boolean;
    onClose: () => void;
    loading?: boolean;
}

const people = [
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
];

const ActionDrawer = ({ onClose, show }: IActionDrawer) => {
    const { jobId, assessmentId, candidateId } = useParams();

    const authUser = useAppSelector(state => state.auth.authUser);
    const { data: applicantAssessmentDetail } = useAppSelector(
        state => state.applicantAssessmentDetail
    );
    const avaterDetail = useRef<IAppFormField | undefined>(
        (
            JSON.parse(
                applicantAssessmentDetail!!.applicantProfile.content
            ) as ApplicationFormJSON
        ).form_structure
            .find(
                item => item.id === AppFormDefaultSection.PERSONAL_INFORMATION
            )!!
            .fields.find(field => field.id === "avatar")
    );
    const queryClient = useQueryClient();

    const [formErr, setFormErr] = useState({
        nameErr: "",
        meetingLinkErr: "",
        locationErr: "",
        timeErr: "",
        dateErr: "",
    });
    const [formState, setFormState] = useState<ICreateMeetings>({
        assessmentId: assessmentId as string,
        candidateId: null,
        startTime: moment.utc().toDate(),
        endTime: moment.utc().toDate(),
        name: "",
        description: "",
        meetingLink: "",
        location: "",
        employerIds: [],
    });
    const [meetingTime, setMeetingTime] = useState({
        startTime: moment.utc().toDate(),
        endTime: moment.utc().add(1, "hours").toDate(),
    });
    const [loading, setLoading] = useState(false);

    const [selected, setSelected] = useState<ICollaboratorDto[]>([]);

    const isInvalidFormInput = (): boolean => {
        const { name, meetingLink, description, startTime } = formState;

        let errors = formErr;

        if (name.length === 0) {
            errors.nameErr = "Subject is required";
        }

        if (meetingLink.length === 0) {
            errors.meetingLinkErr = "Meeting link is required";
        }

        if (moment(meetingTime.startTime).isAfter(meetingTime.endTime)) {
            errors.timeErr = "Start time must not greator than end time";
        }

        const statusErr = isInvalidForm(errors);

        if (statusErr) {
            setFormErr({ ...errors });
            toast.error(
                <div>
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
        }

        return statusErr;
    };

    const handleCreateMeeting = async () => {
        if (isInvalidFormInput()) return;

        setLoading(true);
        try {
            const res = await meetingServices.createMeetings([
                {
                    ...formState,
                    employerIds: selected.map(item => item.employerDto.id),
                    startTime: moment
                        .parseZone(
                            moment(formState.startTime)
                                .minutes(
                                    moment(meetingTime.startTime).minutes()
                                )
                                .hours(moment(meetingTime.startTime).hours())
                                .format()
                        )
                        .utc()
                        .format(),
                    endTime: moment
                        .parseZone(
                            moment(formState.endTime)
                                .minutes(moment(meetingTime.endTime).minutes())
                                .hours(moment(meetingTime.endTime).hours())
                                .format()
                        )
                        .utc()
                        .format(),
                },
            ]);

            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: ["meeting-list", assessmentId, candidateId],
            });
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
        }

        setLoading(false);
    };

    const handleResetErr = (key: string) => {
        setFormErr(prev => ({
            ...prev,
            [key]: "",
        }));
    };

    const handleRemoveAttendee = (id: string) => {
        setSelected(prev =>
            prev.filter(person => person.employerDto.id !== id)
        );
    };

    return (
        <Transition appear show={show} as={React.Fragment}>
            <Dialog as="div" onClose={onClose} className="relative z-[9999]">
                <Transition.Child
                    as={React.Fragment}
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
                    <div>
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="fixed top-0 right-0 z-40 w-[640px] h-screen flex flex-col overflow-y-auto bg-white dark:bg-gray-800">
                                <Dialog.Title
                                    as="h3"
                                    className="p-6 border-b border-gray-300 flex-shrink-0 flex justify-between items-center"
                                >
                                    <strong className="inline-flex items-center gap-1 text-2xl font-semibold text-neutral-700 dark:text-gray-400 ">
                                        <span id="drawer-label">
                                            Schedule face-to-face interview
                                        </span>
                                    </strong>
                                    <button type="button" onClick={onClose}>
                                        <CloseIcon className="w-6 h-6" />
                                    </button>
                                </Dialog.Title>
                                <div className="p-6 flex-1 overflow-y-auto">
                                    <div className="mb-6">
                                        <CustomInput
                                            title="Subject"
                                            placeholder="Interview with candidate - Position"
                                            value={formState.name}
                                            onChange={e => {
                                                setFormState(prev =>
                                                    produce(prev, draft => {
                                                        draft.name =
                                                            e.target.value;
                                                    })
                                                );
                                                handleResetErr("nameErr");
                                            }}
                                            errorText={formErr.nameErr}
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <DatePicker
                                            title="Date"
                                            value={formState.startTime}
                                            minDate={new Date()}
                                            onChange={date => {
                                                setFormState(prev =>
                                                    produce(prev, draft => {
                                                        draft.startTime = date;
                                                        draft.endTime = date;
                                                    })
                                                );
                                                handleResetErr("dateErr");
                                            }}
                                            required
                                            errorText={formErr.dateErr}
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <CustomInput
                                            title="Meeting link"
                                            placeholder="Example: meet.google.com"
                                            value={formState.meetingLink}
                                            onChange={e => {
                                                setFormState(prev =>
                                                    produce(prev, draft => {
                                                        draft.meetingLink =
                                                            e.target.value;
                                                    })
                                                );
                                                handleResetErr(
                                                    "meetingLinkErr"
                                                );
                                            }}
                                            errorText={formErr.meetingLinkErr}
                                            required
                                        />
                                    </div>

                                    <hr className="h-[1px] w-full my-8 bg-gray-300" />

                                    <h4 className="block mb-6 text-sm font-medium text-neutral-900 dark:text-white">
                                        Schedule
                                    </h4>
                                    <div>
                                        <div className="w-full flex items-center gap-2 mb-6">
                                            <TimerPicker
                                                value={moment(
                                                    meetingTime.startTime
                                                )}
                                                onChange={value => {
                                                    setMeetingTime(prev =>
                                                        produce(prev, draft => {
                                                            draft.startTime =
                                                                value.toDate();
                                                        })
                                                    );
                                                    handleResetErr("timeErr");
                                                }}
                                            />
                                            <span>-</span>
                                            <TimerPicker
                                                value={moment(
                                                    meetingTime.endTime
                                                )}
                                                onChange={value => {
                                                    setMeetingTime(prev =>
                                                        produce(prev, draft => {
                                                            draft.endTime =
                                                                value.toDate();
                                                        })
                                                    );
                                                    handleResetErr("timeErr");
                                                }}
                                            />
                                        </div>
                                        {formErr.timeErr && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                <span className="font-medium">
                                                    {formErr.timeErr}{" "}
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-4">
                                        {/* <li>
                                            <div className="flex items-center gap-2">
                                                {avaterDetail.current &&
                                                avaterDetail.current.value ? (
                                                    <Image
                                                        src={
                                                            avaterDetail.current
                                                                .value.value
                                                        }
                                                        alt="Collaborator avatar"
                                                        width={30}
                                                        height={30}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full text-neutral-600">
                                                        <UserCircleIcon />
                                                    </div>
                                                )}
                                                <div className="flex-1 text-sm">
                                                    <h3 className="font-semibold">
                                                        {applicantAssessmentDetail
                                                            ?.applicantProfile
                                                            .firstName +
                                                            " " +
                                                            applicantAssessmentDetail
                                                                ?.applicantProfile
                                                                .lastName}
                                                    </h3>
                                                    <p className="text-gray-500">
                                                        Candidate
                                                    </p>
                                                </div>
                                            </div>
                                        </li> */}
                                        {selected.map(selectAttendee => (
                                            <li key={selectAttendee.id}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-full text-neutral-600">
                                                        <UserCircleIcon />
                                                    </div>
                                                    <div className="flex-1 text-sm">
                                                        <h3 className="font-semibold">
                                                            {selectAttendee
                                                                .employerDto
                                                                .firstName +
                                                                " " +
                                                                (selectAttendee
                                                                    .employerDto
                                                                    .lastName ??
                                                                    "")}
                                                        </h3>
                                                        {authUser &&
                                                            selectAttendee
                                                                .employerDto
                                                                .id ===
                                                                authUser.userId && (
                                                                <p className="text-gray-500">
                                                                    Organizer
                                                                </p>
                                                            )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="p-1 rounded hover:bg-slate-300/80 transition-all duration-500"
                                                        onClick={handleRemoveAttendee.bind(
                                                            null,
                                                            selectAttendee
                                                                .employerDto.id
                                                        )}
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <SelectAttendeeList
                                        selected={selected}
                                        onSelect={value => setSelected(value)}
                                    />

                                    <hr className="h-[1px] w-full my-8 bg-gray-300" />

                                    <CustomTextArea
                                        title="Description"
                                        className="mt-6 overflow-y-auto ql-editor"
                                        rows={4}
                                        value={formState.description}
                                        onChange={e =>
                                            setFormState(prev =>
                                                produce(prev, draft => {
                                                    draft.description =
                                                        e.target.value;
                                                })
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="p-6 border-t border-gray-300 flex-shrink-0 flex justify-end">
                                    <Button
                                        disabled={loading}
                                        isLoading={loading}
                                        onClick={handleCreateMeeting}
                                    >
                                        Create meeting
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

export default ActionDrawer;
