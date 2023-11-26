import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useAppSelector } from "@/redux/reduxHooks";

type SelectAttendeeListProps = {
    selected: ICollaboratorDto[];
    onSelect: (selected: ICollaboratorDto[]) => void;
};

const SelectAttendeeList: React.FC<SelectAttendeeListProps> = ({
    selected,
    onSelect,
}) => {
    const { jobId } = useParams();
    const authUser = useAppSelector(state => state.auth.authUser);
    const [collaborators, setCollaborators] = useState<ICollaboratorDto[]>([]);

    useEffect(() => {
        const getCollaborators = async (jobId: string) => {
            try {
                const res =
                    await collaboratorsServices.getCollaboratorList(jobId);
                setCollaborators(res.data);

                if (authUser) {
                    const isExist = res.data.find(
                        col => col.employerDto.id === authUser.userId
                    );
                    if (isExist) onSelect([isExist]);
                }
            } catch (error: any) {
                toast.error(
                    error.message ? error.message : "Something went wrong"
                );
            }
        };

        getCollaborators(jobId as string);
    }, [jobId]);

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
                        {collaborators?.map(person => (
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
