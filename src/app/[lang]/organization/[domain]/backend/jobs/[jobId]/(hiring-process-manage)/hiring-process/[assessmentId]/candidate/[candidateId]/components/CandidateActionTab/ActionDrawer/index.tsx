"use client";

import React, { FormEvent, useState } from "react";
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
    SelectCollaborators,
    TimerPicker,
} from "@/components";
import { CloseIcon } from "@/icons";
import { useAppSelector } from "@/redux/reduxHooks";
import { ICreateMeetings } from "@/services";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import meetingServices from "@/services/meeting/meeting.service";
import { handleError, isInvalidForm } from "@/helpers";

import zoomLogo from "/public/images/zoom-logo.svg";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

interface IActionDrawer {
    title?: string;
    description?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    show?: boolean;
    onClose: () => void;
    loading?: boolean;
}

const ActionDrawer = ({ onClose, show }: IActionDrawer) => {
    const { assessmentId, candidateId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    const queryClient = useQueryClient();

    const [formErr, setFormErr] = useState({
        nameErr: "",
        meetingLinkErr: "",
        locationErr: "",
        timeErr: "",
        dateErr: "",
        attendeeErr: "",
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
        isZoomCreated: false,
    });
    const [isOffline, setIsOffline] = useState(false);
    const [meetingTime, setMeetingTime] = useState({
        startTime: moment
            .utc()
            .minutes(Math.ceil(moment.utc().minutes() / 15) * 15)
            .toDate(),
        endTime: moment
            .utc()
            .add(1, "hours")
            .minutes(Math.ceil(moment.utc().minutes() / 15) * 15)
            .toDate(),
    });
    const [loading, setLoading] = useState(false);

    const [selected, setSelected] = useState<ICollaboratorDto[]>([]);

    const isInvalidFormInput = (): boolean => {
        const {
            name,
            meetingLink,
            startTime,
            endTime,
            isZoomCreated,
            location,
        } = formState;

        let errors = formErr;

        if (name.length === 0) {
            errors.nameErr = t("subject_required");
        }
        if (isOffline) {
            if (!location) {
                errors.locationErr = t("location_required");
            }
        } else {
            if (meetingLink.length === 0 && !isZoomCreated) {
                errors.meetingLinkErr = t("meeting_link_required");
            }
        }

        const sTime = moment(startTime)
            .hours(moment(meetingTime.startTime).hours())
            .minutes(moment(meetingTime.startTime).minutes());
        const eTime = moment(endTime)
            .hours(moment(meetingTime.endTime).hours())
            .minutes(moment(meetingTime.endTime).minutes());

        if (sTime.isAfter(eTime)) {
            errors.timeErr = t("common:error.start_time_earlier");
        } else if (eTime.diff(sTime, "minutes") < 15) {
            errors.timeErr = t("meeting_at_least_10_mins");
        } else if (
            Math.abs(sTime.diff(eTime, "milliseconds")) >
            24 * 60 * 60 * 1000
        ) {
            errors.timeErr = t("meeting_within_24_hours");
        } else if (sTime.isBefore(moment()))
            errors.timeErr = t("common:error.time_after_present");

        if (selected.length === 0)
            errors.attendeeErr = t("selct_at_least_one_employer");

        if (isInvalidForm(errors)) {
            setFormErr({ ...errors });
            return true;
        }

        return false;
    };

    const handleResetForm = () => {
        setFormState({
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
        setSelected([]);

        setMeetingTime({
            startTime: moment.utc().toDate(),
            endTime: moment.utc().add(1, "hours").toDate(),
        });
    };
    const handleResetErr = (key: string) => {
        setFormErr({
            ...formErr,
            [key]: "",
        });
    };

    const handleCreateMeeting = async (e: FormEvent) => {
        e.preventDefault();

        if (isInvalidFormInput()) return;

        setLoading(true);
        try {
            const dto = { ...formState };
            if (isOffline) {
                dto.isZoomCreated = false;
                dto.meetingLink = "";
            } else dto.location = "";

            const res = await meetingServices.createMeetings([
                {
                    ...dto,

                    employerIds: selected.map(item => item.employerDto.id),
                    startTime: moment
                        .parseZone(
                            moment(dto.startTime)
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
                            moment(dto.endTime)
                                .minutes(moment(meetingTime.endTime).minutes())
                                .hours(moment(meetingTime.endTime).hours())
                                .format()
                        )
                        .utc()
                        .format(),
                },
            ]);

            await queryClient.invalidateQueries({
                queryKey: ["meeting-list", assessmentId, candidateId],
            });
            toast.success(res.message);
            handleResetForm();
            onClose();
        } catch (error: any) {
            handleError(error);
        }

        setLoading(false);
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
                    <form onSubmit={handleCreateMeeting}>
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
                                            {t("schedule_ftf_interview")}
                                        </span>
                                    </strong>
                                    <button type="button" onClick={onClose}>
                                        <CloseIcon className="w-6 h-6" />
                                    </button>
                                </Dialog.Title>
                                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                                    <div>
                                        <CustomInput
                                            title={t("common:subject")}
                                            placeholder={t(
                                                "subject_placeholder"
                                            )}
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

                                    <div className="w-full flex items-center justify-between">
                                        <label
                                            htmlFor="offline-enable"
                                            className="cursor-pointer"
                                        >
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {t("meeting_offline")}
                                            </span>
                                        </label>
                                        <label className="relative cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value=""
                                                id="offline-enable"
                                                className="sr-only peer"
                                                defaultChecked={isOffline}
                                                onChange={e => {
                                                    setIsOffline(
                                                        e.target.checked
                                                    );
                                                }}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    {!isOffline ? (
                                        <React.Fragment>
                                            <div>
                                                <h3 className="text-sm font-semibold text-neutral-700 mb-2">
                                                    {t("zoom_enable")}
                                                </h3>
                                                <div className="flex items-center">
                                                    <Image
                                                        alt="Zoom logo"
                                                        src={zoomLogo}
                                                        width={500}
                                                        height={300}
                                                        className="w-40 h-auto object-contain mr-3"
                                                    />
                                                    <div>
                                                        <label
                                                            htmlFor="zoom-enable"
                                                            className="relative inline-flex items-center cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                value=""
                                                                id="zoom-enable"
                                                                className="sr-only peer"
                                                                defaultChecked={
                                                                    formState.isZoomCreated
                                                                }
                                                                onChange={e =>
                                                                    setFormState(
                                                                        {
                                                                            ...formState,
                                                                            isZoomCreated:
                                                                                e
                                                                                    .currentTarget
                                                                                    .checked,
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {!formState.isZoomCreated && (
                                                <div>
                                                    <CustomInput
                                                        title="Meeting link"
                                                        type="url"
                                                        id="meeting-link"
                                                        placeholder="Example: meet.google.com"
                                                        value={
                                                            formState.meetingLink
                                                        }
                                                        onChange={e => {
                                                            setFormState(prev =>
                                                                produce(
                                                                    prev,
                                                                    draft => {
                                                                        draft.meetingLink =
                                                                            e.target.value;
                                                                    }
                                                                )
                                                            );
                                                            handleResetErr(
                                                                "meetingLinkErr"
                                                            );
                                                        }}
                                                        errorText={
                                                            formErr.meetingLinkErr
                                                        }
                                                        required
                                                    />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <div>
                                            <CustomInput
                                                title={t("common:location")}
                                                id="location"
                                                type="text"
                                                placeholder="Ho Chi Minh"
                                                autoComplete="street-address"
                                                value={formState.location}
                                                onChange={e => {
                                                    setFormState(prev =>
                                                        produce(prev, draft => {
                                                            draft.location =
                                                                e.target.value;
                                                        })
                                                    );
                                                    handleResetErr(
                                                        "locationErr"
                                                    );
                                                }}
                                                errorText={formErr.locationErr}
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="py-2 w-full">
                                        <hr className="h-[1px] w-full bg-gray-300" />
                                    </div>

                                    <h4 className="block text-sm font-medium text-neutral-900 dark:text-white">
                                        {t("schedule")}
                                    </h4>
                                    <div>
                                        <div className="w-full flex flex-col gap-2 mb-6">
                                            <div className="flex items-end gap-2">
                                                <DatePicker
                                                    title={t("common:from")}
                                                    value={formState.startTime}
                                                    minDate={new Date()}
                                                    onChange={date => {
                                                        setFormState(prev =>
                                                            produce(
                                                                prev,
                                                                draft => {
                                                                    draft.startTime =
                                                                        date;
                                                                    draft.endTime =
                                                                        moment(
                                                                            date
                                                                        ).isAfter(
                                                                            draft.endTime
                                                                        )
                                                                            ? date
                                                                            : draft.endTime;
                                                                }
                                                            )
                                                        );
                                                        handleResetErr(
                                                            "timeErr"
                                                        );
                                                    }}
                                                    required
                                                    errorText={formErr.dateErr}
                                                />
                                                <TimerPicker
                                                    value={moment(
                                                        meetingTime.startTime
                                                    )}
                                                    onChange={value => {
                                                        setMeetingTime(prev =>
                                                            produce(
                                                                prev,
                                                                draft => {
                                                                    draft.startTime =
                                                                        value.toDate();
                                                                }
                                                            )
                                                        );
                                                        handleResetErr(
                                                            "timeErr"
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <DatePicker
                                                    title={t("common:to")}
                                                    value={formState.endTime}
                                                    minDate={moment(
                                                        formState.startTime
                                                    ).toDate()}
                                                    maxDate={moment()
                                                        .add(2, "months")
                                                        .toDate()}
                                                    onChange={date => {
                                                        setFormState({
                                                            ...formState,
                                                            endTime: date,
                                                        });
                                                        handleResetErr(
                                                            "timeErr"
                                                        );
                                                    }}
                                                    required
                                                    errorText={formErr.dateErr}
                                                />
                                                <TimerPicker
                                                    value={moment(
                                                        meetingTime.endTime
                                                    )}
                                                    onChange={value => {
                                                        setMeetingTime(prev =>
                                                            produce(
                                                                prev,
                                                                draft => {
                                                                    draft.endTime =
                                                                        value.toDate();
                                                                }
                                                            )
                                                        );
                                                        handleResetErr(
                                                            "timeErr"
                                                        );
                                                    }}
                                                />
                                            </div>
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
                                        {selected.map(selectAttendee => (
                                            <li key={selectAttendee.id}>
                                                <AttendeeCard
                                                    data={selectAttendee}
                                                    onRemove={id =>
                                                        handleRemoveAttendee(id)
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <SelectCollaborators
                                        selected={selected}
                                        onSelect={value => {
                                            setSelected(value);
                                            setFormErr({
                                                ...formErr,
                                                attendeeErr: "",
                                            });
                                        }}
                                    />
                                    {formErr.attendeeErr && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <span className="font-medium">
                                                {formErr.attendeeErr}
                                            </span>
                                        </p>
                                    )}

                                    <div className="py-2 w-full">
                                        <hr className="h-[1px] w-full bg-gray-300" />
                                    </div>

                                    <CustomTextArea
                                        title={t("common:description")}
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
                                    />
                                </div>
                                <div className="p-6 border-t border-gray-300 flex-shrink-0 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        isLoading={loading}
                                    >
                                        {t("create_meeting")}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </form>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ActionDrawer;

const AttendeeCard = ({
    data,
    onRemove,
}: {
    data: ICollaboratorDto;
    onRemove: (id: string) => void;
}) => {
    const authUser = useAppSelector(state => state.auth.authUser);

    return (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full text-neutral-600">
                <UserCircleIcon />
            </div>
            <div className="flex-1 text-sm">
                <h3 className="font-semibold">
                    {data.employerDto.firstName +
                        " " +
                        (data.employerDto.lastName ?? "")}
                </h3>
                {authUser && data.employerDto.id === authUser.userId && (
                    <p className="text-gray-500">Organizer</p>
                )}
            </div>
            <button
                type="button"
                className="p-1 rounded hover:bg-slate-300/80 transition-all duration-500"
                onClick={onRemove.bind(null, data.employerDto.id)}
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
};
