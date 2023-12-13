"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Button, CustomInput, UserAvatar } from "@/components";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { handleError } from "@/helpers";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import permissionServices from "@/services/permission/permission.service";
import { useAppSelector } from "@/redux/reduxHooks";
import assessmentsServices from "@/services/assessments/assessments.service";

import SelectCollaborators from "./SelectCollaborators";

type AssignAssessorModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    assessors: ICollaboratorDto[];
};

const AssignAssessorModal: React.FC<AssignAssessorModalProps> = ({
    isOpen,
    closeModal,
    assessors,
}) => {
    const { jobId, assessmentId } = useParams();

    const queryClient = useQueryClient();

    const { data: flowData } = useAppSelector(state => state.assessmentFlow);

    const [selected, setSelected] = useState<ICollaboratorDto[]>(assessors);
    const [numEvaluations, setNumEvaluations] = useState<string>("");
    const oldSelected = useMemo(() => assessors, [assessors]);

    const handleAssignAssessors = async () => {
        try {
            const [unassigns, assigns] = getAssessorList(oldSelected, selected);
            const promises = [];
            if (unassigns.length > 0)
                promises.push(
                    collaboratorsServices.unAssignAssessor({
                        jobPostId: jobId as string,
                        assessmentId: assessmentId as string,
                        employerIds: unassigns.map(item => item.employerDto.id),
                    })
                );
            if (assigns.length > 0)
                promises.push(
                    collaboratorsServices.assignAssessor({
                        jobPostId: jobId as string,
                        assessmentId: assessmentId as string,
                        employerIds: assigns.map(item => item.employerDto.id),
                    })
                );

            promises.push(
                assessmentsServices.configNumOfEvaluations(
                    assessmentId as string,
                    numEvaluations
                )
            );

            await Promise.all(promises);

            await queryClient.invalidateQueries({
                queryKey: ["assigned-assessors", assessmentId],
            });

            toast.success("Update evaluators successfully!");
            closeModal();
        } catch (error) {
            handleError(error);
        }
    };

    const getAssessorList = (
        oldArr: ICollaboratorDto[],
        newArr: ICollaboratorDto[]
    ) => {
        const newArrMap = new Map<string, ICollaboratorDto>();
        const unAssigns: ICollaboratorDto[] = [];
        newArr.forEach(person => {
            newArrMap.set(person.employerDto.id, person);
        });

        oldArr.forEach(person => {
            if (!newArrMap.has(person.employerDto.id)) unAssigns.push(person);
            else newArrMap.delete(person.employerDto.id);
        });

        return [unAssigns, Array.from(newArrMap.values())];
    };

    const handleSelectCollaborators = (selected: ICollaboratorDto[]) => {
        setSelected(selected);
    };

    const handleRemoveAssessor = (id: string) => {
        setSelected(prev =>
            prev.filter(person => person.employerDto.id !== id)
        );
    };

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
                            <Dialog.Panel className="w-full max-w-md transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                >
                                    Number of evaluations
                                </Dialog.Title>
                                <div className="mt-2">
                                    <CustomInput
                                        title=""
                                        type="number"
                                        value={numEvaluations}
                                        onChange={e =>
                                            setNumEvaluations(e.target.value)
                                        }
                                    />
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4 mt-6"
                                >
                                    Assign assessors
                                </Dialog.Title>
                                <div className="mt-2">
                                    <ul className="space-y-4">
                                        {selected.map(selectAttendee => (
                                            <li key={selectAttendee.id}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-full text-neutral-600">
                                                        <UserAvatar
                                                            avatarUrl={
                                                                selectAttendee
                                                                    .employerDto
                                                                    .avatarUrl
                                                            }
                                                        />
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
                                                        {/* {authUser &&
                                                            selectAttendee
                                                                .employerDto
                                                                .id ===
                                                                authUser.userId && (
                                                                <p className="text-gray-500">
                                                                    Organizer
                                                                </p>
                                                            )} */}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="p-1 rounded hover:bg-slate-300/80 transition-all duration-500"
                                                        onClick={handleRemoveAssessor.bind(
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
                                    <SelectCollaborators
                                        onSelect={handleSelectCollaborators}
                                        selected={selected}
                                    />
                                </div>

                                <div className="mt-4">
                                    <Button
                                        type="button"
                                        onClick={handleAssignAssessors}
                                    >
                                        Save changes
                                    </Button>

                                    <button
                                        type="button"
                                        className="ml-2 font-semibold text-sm text-neutral-700 hover:text-neutral-900 hover:underline"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AssignAssessorModal;
