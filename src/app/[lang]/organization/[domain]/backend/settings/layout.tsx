import React from "react";

import SettingsSidebar from "./components/SettingsSidebar";
import HeadNavBar from "./components/HeadNavBar";

const OrganizationSettingsLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <HeadNavBar />
            <div className="flex-1 flex gap-6 max-w-screen-xl mx-auto p-4 xl:px-6 pb-12">
                <div className="w-1/4 hidden lg:block">
                    <SettingsSidebar />
                </div>
                <div className="flex-1 max-w-full overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default OrganizationSettingsLayout;
