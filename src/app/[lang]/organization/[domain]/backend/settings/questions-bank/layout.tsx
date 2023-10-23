import React from "react";

import HeaderBar from "./components/HeaderBar";

const QuestionBankLayot = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <HeaderBar />
            <div className="mt-4">{children}</div>
        </React.Fragment>
    );
};

export default QuestionBankLayot;
