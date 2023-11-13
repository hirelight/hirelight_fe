"use client";

import React, { useState } from "react";

type QuillEditorProviderState = {
    length: number;
    setLength: React.Dispatch<React.SetStateAction<number>>;
};

export const QuillEditorContext =
    React.createContext<QuillEditorProviderState | null>(null);

export const useQuillEditor = (): QuillEditorProviderState => {
    const context = React.useContext(QuillEditorContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

const QuillEditorProvider = ({ children, ...props }: any) => {
    const [length, setLength] = useState(0);

    return (
        <QuillEditorContext.Provider value={{ length, setLength }} {...props}>
            {children}
        </QuillEditorContext.Provider>
    );
};

export default QuillEditorProvider;
