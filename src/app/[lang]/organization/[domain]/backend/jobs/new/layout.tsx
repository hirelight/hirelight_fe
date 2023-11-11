import React from "react";

const NewJobLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 flex flex-col max-w-screen-xl mx-auto">
            {children}
        </div>
    );
};

export default NewJobLayout;
