"use client";

import dynamic from "next/dynamic";
import React from "react";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
});

const DumbComponent = () => {
    return (
        <div className="min-h-screen p-6 bg-white">
            <QuillEditorNoSSR theme="snow" placeholder="Hello world" />
        </div>
    );
};

export default DumbComponent;
