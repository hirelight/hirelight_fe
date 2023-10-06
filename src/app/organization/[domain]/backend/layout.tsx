import React from "react";

import ProtectedRoute from "./components/ProtectedRoute";

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default BackendLayout;
