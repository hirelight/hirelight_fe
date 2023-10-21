"use client";

import React from "react";
import { motion } from "framer-motion";

const EditField = () => {
    return (
        <motion.div
            className="w-full bg-gray-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
        >
            <div className="h-32"></div>
        </motion.div>
    );
};

export default EditField;
