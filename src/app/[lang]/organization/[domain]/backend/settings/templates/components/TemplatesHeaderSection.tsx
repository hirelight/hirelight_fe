"use client";

import React from "react";
import { toast } from "react-toastify";

import { SearchIcon } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setIsAdding, setSearchQuery } from "@/redux/slices/templates.slice";

import AddEmailTemplate from "./AddEmailTemplate";

const TemplatesHeaderSection = () => {
    const dispatch = useAppDispatch();

    const { isAdding, searchQuery } = useAppSelector(state => state.templates);

    return (
        <div className="p-4 border-b border-gray-300">
            {!isAdding ? (
                <div className="relative rounded-md shadow-sm max-w-[50%]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="w-5 h-5 text-neutral-700" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-2.5 pl-10 pr-20 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6 placeholder:text-sm"
                        placeholder="Start typing to search..."
                        value={searchQuery}
                        onChange={e => dispatch(setSearchQuery(e.target.value))}
                    />
                </div>
            ) : (
                <AddEmailTemplate
                    onSaveTemplate={() => {
                        dispatch(setIsAdding(false));
                        toast.info("Add new template!", {
                            position: "bottom-right",
                        });
                    }}
                    onCancel={() => dispatch(setIsAdding(false))}
                />
            )}
        </div>
    );
};

export default TemplatesHeaderSection;
