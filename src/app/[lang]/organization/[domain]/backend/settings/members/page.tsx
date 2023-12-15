import React from "react";
import { Metadata } from "next";

import MemberList from "./components/MemberList";
import AddNewMember from "./components/AddNewMember";

export const metadata: Metadata = {
    title: "Hirelight - Member",
};

const MembersSetting = () => {
    return (
        <div className="bg-white rounded-md shadow-md p-4 xl:px-6">
            <AddNewMember />

            <MemberList />
        </div>
    );
};

export default MembersSetting;
