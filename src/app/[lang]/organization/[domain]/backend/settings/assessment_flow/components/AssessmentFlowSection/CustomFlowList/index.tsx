import React from "react";

import CustomFlowCard from "./CustomFlowCard";

const CustomFlowList = () => {
    return (
        <ul className="flex flex-col">
            <li>
                <CustomFlowCard />
            </li>
        </ul>
    );
};

export default CustomFlowList;
