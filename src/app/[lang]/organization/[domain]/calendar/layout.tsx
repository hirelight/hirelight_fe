import React from "react";

import HeaderBar from "../components/HeaderBar";

const CalendarPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <HeaderBar />
            <main className="flex-1 relative z-0">{children}</main>
        </>
    );
};

export default CalendarPageLayout;
