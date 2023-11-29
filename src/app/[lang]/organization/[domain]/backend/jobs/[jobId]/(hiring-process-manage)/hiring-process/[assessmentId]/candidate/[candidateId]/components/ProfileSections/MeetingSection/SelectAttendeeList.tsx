import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { IOrgEmployerDto, MeetingEmployer } from "@/services";

type SelectAttendeeListProps = {
    selected: {
        id: string;
        email: string;
        firstName: string;
        lastName: string | null;
        status: string;
        avatarUrl: string | null;
    }[];
    onSelect: (
        selected: {
            id: string;
            email: string;
            firstName: string;
            lastName: string | null;
            status: string;
            avatarUrl: string | null;
        }[]
    ) => void;
};

const SelectAttendeeList: React.FC<SelectAttendeeListProps> = ({
    selected,
    onSelect,
}) => {
    const { jobId } = useParams();

    const { data: collabRes } = useQuery({
        queryKey: ["collaborators", jobId],
        queryFn: () =>
            collaboratorsServices.getCollaboratorList(jobId as string),
    });

    return (
        <Listbox value={selected} onChange={onSelect} multiple>
            <div className="relative mt-4">
                <Listbox.Button className="text-sm text-neutral-700 font-semibold hover:underline hover:text-neutral-900">
                    Add attendee
                </Listbox.Button>
                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {collabRes?.data.map(person => (
                            <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-blue-200/60 text-blue_primary_800"
                                            : "text-gray-900"
                                    }`
                                }
                                value={person.employerDto}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {person.employerDto.firstName +
                                                " " +
                                                (person.employerDto.lastName ??
                                                    "")}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue_primary_800">
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default SelectAttendeeList;
