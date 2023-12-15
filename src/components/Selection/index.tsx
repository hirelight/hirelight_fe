"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

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

type CustomSelection<T = any> = Omit<
    DetailedHTMLProps<
        InputHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    >,
    "value" | "onChange"
> & {
    value?: string | string[];
    onChange: (value: T) => void;
};

interface ISelection<T = any> extends CustomSelection<T> {
    title: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    labelClassName?: string;
    items: { label: string; value: T }[];
    multiple?: boolean;
    isLoading?: boolean;
}

const Selection = <T extends object | any>(props: ISelection<T>) => {
    const {
        title,
        placeholder = "Select...",
        items,
        value,
        required,
        onChange,
        className,
        labelClassName,
        multiple = false,
        id,
        isLoading,
    } = props;
    const [show, setShow] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selected, setSelected] = React.useState<string[]>([]);
    const dropdownWrapperRef = useOutsideClick<HTMLDivElement>(() => {
        setShow(false);
        if (dropdownRef.current) dropdownRef.current.removeAttribute("style");
    });
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const expandSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!dropdownRef.current) return;
        setShow(!show);
        if (
            e.currentTarget.getBoundingClientRect().bottom + 252 >
                window.innerHeight &&
            !show
        ) {
            dropdownRef.current.setAttribute(
                "style",
                "top: auto;bottom: 100%;border-top-width: 1px;border-bottom: 0; margin-top: 0;margin-bottom: -0.25rem;border-radius: 0.375rem 0.375rem 0 0;flex-direction: column-reverse;height: auto;visibility: visible;"
            );
        } else if (
            e.currentTarget.getBoundingClientRect().bottom + 252 <
                window.innerHeight &&
            !show
        ) {
            dropdownRef.current.setAttribute(
                "style",
                "height: auto; visibility: visible"
            );
        } else {
            dropdownRef.current.removeAttribute("style");
        }
    };

    const handleSelectItem = (label: string, value: any) => {
        if (!multiple) {
            setSelected([label]);
        } else {
            const isExist = selected.find(item => item === label);
            if (isExist)
                setSelected(prev => prev.filter(item => item !== label));
            else setSelected(prev => prev.concat([label]));
        }
        onChange(value);
        setShow(false);
        if (dropdownRef.current) dropdownRef.current.removeAttribute("style");

        if (props.id) {
            const selectEl = document.getElementById(
                props.id
            ) as HTMLSelectElement;

            selectEl.value = value;
        }
    };

    React.useEffect(() => {
        if (value) {
            if (multiple) setSelected(value as string[]);
            else setSelected([value as string]);
        }
    }, [value, multiple]);

    return (
        <div
            ref={dropdownWrapperRef}
            className={"min-w-[200px] md:min-w-[300px] w-full " + className}
        >
            {title && (
                <h4 className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {title}
                </h4>
            )}
            <div className="relative ">
                <button
                    type="button"
                    className={`w-full flex items-center justify-between font-medium bg-white dark:text-white p-2.5 cursor-pointer border border-gray-300 rounded-md text-sm ${
                        selected[0] === placeholder
                            ? "text-neutral-600"
                            : "text-neutral-900"
                    } ${labelClassName}`}
                    onClick={expandSelection}
                >
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {selected.length === 0
                            ? placeholder
                            : selected.map((item, index) => {
                                  if (multiple) {
                                      return (
                                          <span
                                              key={index}
                                              className="whitespace-nowrap bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 inline-flex items-center ml-1 first:ml-0"
                                          >
                                              {item}{" "}
                                              <span
                                                  role="button"
                                                  onClick={e => {
                                                      e.stopPropagation();
                                                      setSelected(prev =>
                                                          prev.filter(
                                                              (_, iIndex) =>
                                                                  index !==
                                                                  iIndex
                                                          )
                                                      );
                                                  }}
                                                  className="ml-1"
                                              >
                                                  x
                                              </span>
                                          </span>
                                      );
                                  }
                                  return (
                                      <span
                                          key={index}
                                          className="after:content-[','] after:mr-1 last:after:hidden whitespace-nowrap text-ellipsis overflow-hidden"
                                      >
                                          {item}
                                      </span>
                                  );
                              })}
                    </p>
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
                        {isLoading
                            ? new Array(4).fill("").map((_, index) => (
                                  <li
                                      key={index}
                                      className="relative animate-pulse p-2.5"
                                  >
                                      <div className="h-5 w-full bg-slate-200"></div>
                                  </li>
                              ))
                            : items
                                  .filter(item =>
                                      item.label
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                  )
                                  .map((item, index: number) => {
                                      const isSelected = selected.includes(
                                          item.label
                                      );

                                      return (
                                          <li key={index} className="relative">
                                              <button
                                                  type="button"
                                                  className={`w-full text-left text-neutral-700 p-2.5 cursor-pointer hover:bg-slate-200 ${
                                                      isSelected
                                                          ? "bg-slate-100"
                                                          : ""
                                                  }`}
                                                  onClick={handleSelectItem.bind(
                                                      null,
                                                      item.label,
                                                      item.value
                                                  )}
                                              >
                                                  <span>{item.label}</span>
                                              </button>
                                              {isSelected && (
                                                  <span className="absolute right-4 top-1/2 -translate-y-1/2">
                                                      <CheckIcon className="w-5 h-5 text-blue_primary_700" />
                                                  </span>
                                              )}
                                          </li>
                                      );
                                  })}
                    </ul>
                </div>
                <select
                    id={props.id}
                    name={props.name}
                    className="sr-only"
                    required={props.required}
                >
                    {items.map((item, index) => (
                        <option tabIndex={-1} key={index} value={item.label}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Selection;
