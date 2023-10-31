import React from "react";

import Sidebar from "./components/Sidebar";
import CalendarContent from "./components/CalendarContent";

const HiringProcessCalendar = () => {
    return (
        <div className="bg-white max-w-screen-xl max-h-screen mx-auto rounded-md drop-shadow-md flex items-stretch">
            <Sidebar />
            <div className="w-[1px] bg-gray-200 my-12 mx-4"></div>
            <CalendarContent />
        </div>
    );
};

export default HiringProcessCalendar;
