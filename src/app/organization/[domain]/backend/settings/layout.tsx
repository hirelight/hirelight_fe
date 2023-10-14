import React from "react";

import SettingsSidebar from "./components/SettingsSidebar";

const OrganizationSettingsLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex-1 flex max-w-screen-xl mx-auto p-4 xl:px-6">
            <SettingsSidebar />
            {children}
        </div>
    );
};

export default OrganizationSettingsLayout;
