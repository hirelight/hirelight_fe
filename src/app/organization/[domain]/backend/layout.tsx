import React from "react";

import ProtectedRoute from "./components/ProtectedRoute";

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ProtectedRoute>{children}</ProtectedRoute>
        </div>
    );
};

export default BackendLayout;
