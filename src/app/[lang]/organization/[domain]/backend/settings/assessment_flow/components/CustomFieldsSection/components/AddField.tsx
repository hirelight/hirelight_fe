"use client";

import React from "react";
import { m } from "framer-motion";

const AddField = () => {
    return (
        <m.div
            className="w-full bg-gray-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
        >
            <div className="p-16"></div>
        </m.div>
    );
};

export default AddField;
