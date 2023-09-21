"use client";

import React from "react";

import { useOutsideClick } from "@/hooks/useClickOutside";
import { ChevronDown, SearchIcon } from "@/icons";

const toTop: React.CSSProperties = {
    top: "auto",
    bottom: "100%",
    borderTop: 1,
    borderBottom: 0,
    marginTop: 0,
    marginBottom: "-0.25rem",
    borderRadius: "0.375rem 0.375rem 0 0",
    height: "auto",
    visibility: "visible",
};

const toBottom: React.CSSProperties = {
    height: "auto",
    visibility: "visible",
};

interface ISelection {
    title: string;
    placeholder?: string;
    value?: string;
    datas: string[];
    required?: boolean;
    onChange: (value: string) => void;
    className?: string;
    labelClassName?: string;
}

const Selection = ({
    title,
    placeholder = "Select...",
    datas,
    value = "",
    required = false,
    onChange,
    className,
    labelClassName,
}: ISelection) => {
    const [show, setShow] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selected, setSelected] = React.useState(value);
    const dropdownWrapperRef = useOutsideClick<HTMLDivElement>(() => {
        setShow(false);
        dropdownRef.current!!.removeAttribute("style");
    });

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const expandSelection = (
        e: React.MouseEvent<HTMLLabelElement, MouseEvent>
    ) => {
        setShow(!show);
        if (
            e.currentTarget.getBoundingClientRect().bottom + 208 >
                window.innerHeight &&
            !show
        ) {
            dropdownRef.current!!.setAttribute(
                "style",
                "top: auto;bottom: 100%;border-top-width: 1px;border-bottom: 0; margin-top: 0;margin-bottom: -0.25rem;border-radius: 0.375rem 0.375rem 0 0;flex-direction: column-reverse;height: auto;visibility: visible;"
            );
        } else if (
            e.currentTarget.getBoundingClientRect().bottom + 208 <
                window.innerHeight &&
            !show
        ) {
            dropdownRef.current!!.setAttribute(
                "style",
                "height: auto; visibility: visible"
            );
        } else {
            dropdownRef.current!!.removeAttribute("style");
        }
    };

    const handleSelectItem = (value: any) => {
        setSelected(value);
        onChange(value);
        setShow(false);
        dropdownRef.current!!.removeAttribute("style");
    };

    return (
        <div
            ref={dropdownWrapperRef}
            className={"min-w-[300px] w-full " + className}
        >
            {title && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {title}
                </label>
            )}
            <div className="relative ">
                <label
                    className={`flex items-center justify-between mb-2 text-sm font-medium  dark:text-white p-2.5 cursor-pointer border border-gray-300 rounded-md ${
                        !selected ? "text-gray-600" : "text-gray-900"
                    } ${labelClassName}`}
                    onClick={expandSelection}
                >
                    {selected ? selected : placeholder ? placeholder : title}
                    <div>
                        <ChevronDown className="w-4 h-4" strokeWidth={2} />
                    </div>
                </label>
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 z-[1000] flex flex-col -mt-1 bg-white border border-t-0 border-gray-300 rounded-bl-md rounded-br-md h-0 overflow-hidden invisible"
                    style={show ? {} : {}}
                >
                    {/* *******************Search section***************************** */}
                    <div className="relative mt-4 mb-2 px-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <SearchIcon className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-2.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:text-sm sm:leading-6"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <ul className="max-h-52 overflow-y-auto overflow-x-hidden">
                        {["Select...", ...datas]
                            .filter(item => item.includes(search))
                            .map((item: any, index: number) => (
                                <li
                                    key={index}
                                    className={`p-2.5 text-sm cursor-pointer hover:bg-slate-200 text-neutral-700`}
                                    onClick={handleSelectItem.bind(null, item)}
                                >
                                    <span>{item}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Selection;
