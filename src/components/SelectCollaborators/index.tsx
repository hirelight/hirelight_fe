"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

type SelectAttendeeListProps = {
    selected: ICollaboratorDto[];
    onSelect: (selected: ICollaboratorDto[]) => void;
};

const SelectCollaborators: React.FC<SelectAttendeeListProps> = ({
    selected,
    onSelect,
}) => {
    const { jobId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale);

    const { data: collabRes, isLoading } = useQuery({
        queryKey: ["collaborators", jobId],
        queryFn: () =>
            collaboratorsServices.getCollaboratorList(jobId as string),
    });

    return (
        <Listbox value={selected} onChange={onSelect} multiple>
            <div className="relative mt-4">
                <Listbox.Button className="text-sm text-neutral-700 font-semibold hover:underline hover:text-neutral-900">
                    {t("common:add_attendee")}
                </Listbox.Button>
                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {isLoading ? (
                            <AttendeeSkeleton />
                        ) : (
                            collabRes?.data.map(person => (
                                <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-blue-200/60 text-blue_primary_800"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={person}
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
                                                    (person.employerDto
                                                        .lastName ?? "")}
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
                            ))
                        )}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default SelectCollaborators;

const AttendeeSkeleton = () => {
    return (
        <div className="space-y-2 px-4">
            {new Array(3).fill("").map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse h-6 rounded w-full bg-slate-200"
                ></div>
            ))}
        </div>
    );
};
