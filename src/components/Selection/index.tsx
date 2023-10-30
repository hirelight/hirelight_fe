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

interface ISelection<T = any> {
    title: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    onChange: (value: T) => void;
    className?: string;
    labelClassName?: string;
    items: { label: string; value: T }[];
}

const Selection = <T extends object | string>({
    title,
    placeholder = "Select...",
    items,
    value,
    required = false,
    onChange,
    className,
    labelClassName,
}: ISelection<T>) => {
    const [show, setShow] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const [selected, setSelected] = React.useState<string>(placeholder);
    const dropdownWrapperRef = useOutsideClick<HTMLDivElement>(() => {
        setShow(false);
        dropdownRef.current!!.removeAttribute("style");
    });
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const expandSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setShow(!show);
        if (
            e.currentTarget.getBoundingClientRect().bottom + 252 >
                window.innerHeight &&
            !show
        ) {
            dropdownRef.current!!.setAttribute(
                "style",
                "top: auto;bottom: 100%;border-top-width: 1px;border-bottom: 0; margin-top: 0;margin-bottom: -0.25rem;border-radius: 0.375rem 0.375rem 0 0;flex-direction: column-reverse;height: auto;visibility: visible;"
            );
        } else if (
            e.currentTarget.getBoundingClientRect().bottom + 252 <
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

    const handleSelectItem = (label: string, value: any) => {
        setSelected(label);
        onChange(value);
        setShow(false);
        dropdownRef.current!!.removeAttribute("style");
    };

    React.useEffect(() => {
        setSelected(value ? value : placeholder);
    }, [value, placeholder]);

    return (
        <div
            ref={dropdownWrapperRef}
            className={"min-w-[200px] md:min-w-[300px] w-full " + className}
        >
            {title && (
                <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {title}
                </h4>
            )}
            <div className="relative ">
                <button
                    type="button"
                    className={`w-full flex items-center justify-between font-medium dark:text-white p-2.5 cursor-pointer border border-gray-300 rounded-md text-sm ${
                        selected === placeholder
                            ? "text-gray-600"
                            : "text-gray-900"
                    } ${labelClassName}`}
                    onClick={expandSelection}
                >
                    {selected}
                    <div>
                        <ChevronDown className="w-4 h-4" strokeWidth={2} />
                    </div>
                </button>
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
                            className="block w-full rounded-md border-0 py-2.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <ul className="max-h-52 overflow-y-auto overflow-x-hidden">
                        <li>
                            <button
                                type="button"
                                className={`w-full text-left text-neutral-700 p-2.5 cursor-pointer hover:bg-slate-200 `}
                                onClick={handleSelectItem.bind(
                                    null,
                                    placeholder
                                )}
                            >
                                <span>Select...</span>
                            </button>
                        </li>
                        {items
                            .filter(item => item.label.includes(search))
                            .map((item, index: number) => (
                                <li key={index}>
                                    <button
                                        type="button"
                                        className={`w-full text-left text-neutral-700 p-2.5 cursor-pointer hover:bg-slate-200 `}
                                        onClick={handleSelectItem.bind(
                                            null,
                                            item.label,
                                            item.value
                                        )}
                                    >
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Selection;
