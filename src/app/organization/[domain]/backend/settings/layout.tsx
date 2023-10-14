import React from "react";

import SettingsSidebar from "./components/SettingsSidebar";

const OrganizationSettingsLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex-1 flex gap-6 max-w-screen-xl mx-auto p-4 xl:px-6">
            <div className="w-1/4">
                <SettingsSidebar />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default OrganizationSettingsLayout;
