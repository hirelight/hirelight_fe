"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Button, UserAvatar } from "@/components";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { handleError } from "@/helpers";
import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";
import permissionServices from "@/services/permission/permission.service";
import { useAppSelector } from "@/redux/reduxHooks";

import SelectCollaborators from "./SelectCollaborators";

type AssignAssessorModalProps = {
    isOpen: boolean;
    closeModal: () => void;
};

const AssignAssessorModal: React.FC<AssignAssessorModalProps> = ({
    isOpen,
    closeModal,
}) => {
    const { jobId, assessmentId } = useParams();

    const { authUser } = useAppSelector(state => state.auth);

    const [selected, setSelected] = useState<ICollaboratorDto[]>([]);
    const oldSelected = useRef<ICollaboratorDto[]>();

    const handleAssignAssessors = async () => {
        try {
            // const selectedMap = new Map<string, ICollaboratorDto>();
            // selected.forEach(item => {
            //     if (!selectedMap.has(item.id)) {
            //         selectedMap.set(item.id, item);
            //     }
            // });

            const res = await collaboratorsServices.assignAssessor({
                jobPostId: jobId as string,
                assessmentId: assessmentId as string,
                employerIds: selected.map(item => item.employerDto.id),
            });

            toast.success(res.message);
        } catch (error) {
            handleError(error);
        }
    };

    const handleRemoveAssessor = (id: string) => {
        setSelected(prev =>
            prev.filter(person => person.employerDto.id !== id)
        );
    };

    useEffect(() => {
        const getAssessmentAssessors = async () => {
            try {
                const res = await collaboratorsServices.getCollaboratorList(
                    jobId as string
                );
                const assessors = res.data.filter(
                    collaborator =>
                        collaborator.permissions.find(
                            permission =>
                                permission.assessmentId &&
                                permission.assessmentId === assessmentId &&
                                permission.permissionName ===
                                    "CREATE_UPDATE_EVALUATION"
                        ) !== undefined
                );
                oldSelected.current = assessors;
                setSelected(assessors);
            } catch (error) {
                handleError(error);
            }
        };

        getAssessmentAssessors();
    }, [assessmentId, jobId]);

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
                                    className="text-lg font-medium leading-6 text-gray-900"
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
                                        onSelect={selected =>
                                            setSelected(selected)
                                        }
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
