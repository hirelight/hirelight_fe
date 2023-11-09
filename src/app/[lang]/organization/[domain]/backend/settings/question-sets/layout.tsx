import React from "react";

import HeaderBar from "./components/HeaderBar";

const QuestionSetLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <HeaderBar />
            <div className="mt-4">{children}</div>
        </React.Fragment>
    );
};

export default QuestionSetLayout;
