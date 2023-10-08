"use client";

import React from "react";
import { useParams } from "next/navigation";

import { ChevronDown } from "@/icons";

import styles from "./styles.module.scss";

const MoveCandidateDialog = () => {
    const { assessmentId, candidateId } = useParams();

    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                className="p-2 bg-blue-700 hover:bg-blue-800 group transition-all duration-300 rounded-tr-md rounded-br-md"
                onClick={() => setShowDialog(!showDialog)}
            >
                <ChevronDown
                    strokeWidth={2}
                    className="w-4 h-4 text-white transition-all duration-200 group-hover:rotate-180"
                />
            </button>
            {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
            <div
                role="dialog"
                className={`${styles.move__candidate__dialog} ${
                    showDialog ? styles.entering : ""
                }`}
            >
                <ul className="max-h-56 overflow-y-auto">
                    {[
                        "All",
                        "Sourced",
                        "Applied",
                        "Phone screen",
                        "Assessment",
                        "Interview",
                        "Offer",
                        "Hired",
                    ].map(item => (
                        <li key={item}>
                            <button
                                type="button"
                                className={`group w-full text-left text-sm ${
                                    assessmentId ===
                                    item.toLowerCase().replace(" ", "-")
                                        ? "cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={
                                    assessmentId ===
                                    item.toLowerCase().replace(" ", "-")
                                }
                                onClick={() => setShowDialog(false)}
                            >
                                <span
                                    className={`block py-2 pl-6 pr-2 group-hover:bg-blue_primary_100 whitespace-nowrap ${
                                        assessmentId ===
                                        item.toLowerCase().replace(" ", "-")
                                            ? "opacity-40 group-hover:bg-none"
                                            : ""
                                    }`}
                                >
                                    {item}{" "}
                                    {assessmentId ===
                                        item.toLowerCase().replace(" ", "-") &&
                                        "(current stage)"}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MoveCandidateDialog;
