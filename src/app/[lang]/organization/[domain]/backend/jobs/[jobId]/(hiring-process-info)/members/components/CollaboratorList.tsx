import React from "react";

import { ICollaboratorDto } from "@/services/collaborators/collaborators.interface";

import CollaboratorCard from "./CollaboratorCard";

type CollaboratorListProps = {
    datas: ICollaboratorDto[];
};

const CollaboratorList: React.FC<CollaboratorListProps> = ({ datas }) => {
    return (
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400 overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                <tr>
                    <th scope="col" className="p-6 hidden md:table-cell">
                        Member name
                    </th>
                    <th scope="col" className="p-6">
                        Email
                    </th>
                    <th scope="col" className="p-6 hidden lg:table-cell">
                        Status
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {datas.map(member => (
                    <CollaboratorCard key={member.id} member={member} />
                ))}
            </tbody>
        </table>
    );
};

export default CollaboratorList;
