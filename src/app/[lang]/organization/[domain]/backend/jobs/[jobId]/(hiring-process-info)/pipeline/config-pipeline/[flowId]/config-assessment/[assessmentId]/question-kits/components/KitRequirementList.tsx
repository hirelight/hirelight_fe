import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

import { DragIndicatorIcon } from "@/icons";

import styles from "./KitRequirementList.module.scss";

const itemHeight = 220;
const padding = 24;

const reorderList = (array: any[], rowFrom: number, rowTo: number) => {
    const __array = [...array];

    const val = __array[rowFrom];
    if (rowTo >= array.length) {
        rowTo = array.length - 1;
    }

    __array.splice(rowFrom, 1);
    __array.splice(rowTo, 0, val);
    return __array;
};

interface IKitRequirementList {
    contents: any[];
    onSave: (contents: any[]) => void;
}

const KitRequirementList = ({ contents, onSave }: IKitRequirementList) => {
    const markerListRef = React.useRef<HTMLUListElement>(null);
    const contentsRef = React.useRef<HTMLUListElement>(null);
    const [isPressing, setIsPressing] = React.useState(false);
    const [mousePos, setMousePos] = React.useState({
        x: 0,
        y: 0,
    });
    const [delta, setDelta] = React.useState({
        x: 0,
        y: 0,
    });
    const [selected, setSelected] = React.useState<any>();

    const handleDeleteRequirement = (id: string) => {
        onSave(contents.filter((item, index) => item.id !== id));
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        selected: number,
        pressX: number,
        pressY: number
    ) => {
        setDelta({ x: e.pageX - pressX, y: e.pageY - pressY });
        setMousePos({ x: pressX, y: pressY });
        setIsPressing(true);
        setSelected(selected);
        const placeHolderDiv = document.createElement("div");
        placeHolderDiv.style.height = `${e.currentTarget.clientHeight}px`;
        placeHolderDiv.style.background = "black";
        placeHolderDiv.id = "requirement-placeholder";
        if (contentsRef.current) {
            contentsRef.current.insertBefore(
                placeHolderDiv,
                e.currentTarget.parentNode?.nextSibling!!
            );
        }
        const parent = e.currentTarget.parentElement!!;
        console.log(parent);
        parent.style.height = `${parent?.clientHeight}px`;
        parent.style.width = `${parent?.clientWidth}px`;
        console.log(e.currentTarget.clientHeight);
    };

    const handleMouseUp = () => {
        setDelta({
            x: 0,
            y: 0,
        });
        if (contentsRef.current) {
            contentsRef.current.removeChild(
                document.getElementById("requirement-placeholder")!!
            );
        }
        setIsPressing(false);
    };
    const handleMouseMove = (
        e: React.MouseEvent<HTMLUListElement, MouseEvent>
    ) => {
        e.preventDefault();
        const { pageX, pageY } = e;

        const clamp = (n: number, min: number, max: number) =>
            Math.max(Math.min(n, max), min);
        if (isPressing) {
            const mouse = {
                x: pageX - delta.x,
                y: pageY - delta.y,
            };
            const rowTo = clamp(
                Math.floor((mouse.y + itemHeight / 2) / itemHeight),
                0,
                100
            );
            const rowFrom = contents.indexOf(
                contents.find((item, index) => index === selected)!!
            );
            const newOrder = reorderList(contents, rowFrom, rowTo);
            setMousePos(mouse);
            onSave(newOrder);
        }
    };

    return (
        <ul
            ref={contentsRef}
            style={
                {
                    // height: `${contents.length * (220 + 24)}px`,
                }
            }
            className="relative"
            onMouseMove={handleMouseMove}
        >
            {contents.map((data, index) => {
                let x = 0;
                let y = index * (itemHeight + padding);
                let scale = 1;

                let isActive = index === selected && isPressing;
                if (isActive) {
                    x = mousePos.x;
                    y = mousePos.y;
                    scale = 1.01;
                }
                return (
                    <li
                        key={index}
                        className="flex gap-2 items-stretch h-full relative top-0 left-0"
                        style={
                            isActive
                                ? {
                                      position: "absolute",
                                      left: `${x}px`,
                                      top: `${y}px`,
                                      zIndex: `${isActive ? 1000 : 1}`,
                                      transition: isActive
                                          ? ""
                                          : "transform 200ms ease-in-out",
                                  }
                                : {}
                        }
                    >
                        {contents.length > 1 && (
                            <button
                                type="button"
                                className={`p-4 cursor-grab ${
                                    isActive ? styles.dragging : ""
                                }`}
                                onMouseDown={e =>
                                    handleMouseDown(e, index, x, y)
                                }
                                onMouseUp={handleMouseUp}
                            >
                                <span>
                                    <DragIndicatorIcon className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800 focus:text-blue_primary_800" />
                                </span>
                            </button>
                        )}
                        <div className="flex-1 w-full mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg block overflow-hidden focus-within:ring-1 focus-within:border-blue-500 focus-within:ring-blue-500">
                            <input
                                placeholder="Skill, trait or requirement"
                                className={
                                    "bg-white w-full p-2.5 dark:placeholder-gray-400 dark:text-white outline-none ring-0 peer"
                                }
                                value={data.name ? data.name : ""}
                                onChange={e =>
                                    onSave(
                                        contents.map((item, itemNo) => {
                                            if (itemNo === index) {
                                                return {
                                                    ...item,
                                                    name: e.target.value,
                                                };
                                            }

                                            return item;
                                        })
                                    )
                                }
                            />

                            <section
                                className={`h-0 bg-white focus-within:h-auto peer-focus:h-auto pt-1 pl-4 transition-all overflow-hidden`}
                                style={
                                    data.requirements ? { height: "auto" } : {}
                                }
                            >
                                <div className="relative pr-3 pb-3">
                                    <ul
                                        ref={markerListRef}
                                        className="list-disc absolute top-0 left-0 mb-2 ml-4 leading-[19px]"
                                    >
                                        {data.requirements
                                            .split("\n")
                                            .map(
                                                (
                                                    text: string,
                                                    index: number
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className={`${
                                                            text
                                                                ? "text-black"
                                                                : "text-gray-400"
                                                        }`}
                                                    ></li>
                                                )
                                            )}
                                    </ul>
                                    <textarea
                                        rows={4}
                                        cols={50}
                                        className="p-0 pl-4 w-full bg-transparent border-none focus:outline-none focus:ring-0 relative break-words leading-[19px]"
                                        contentEditable
                                        value={data.requirements}
                                        placeholder="Enter or copy & paste evaluation questions"
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                if (
                                                    e.currentTarget.value.split(
                                                        "\n"
                                                    )[
                                                        e.currentTarget.value.split(
                                                            "\n"
                                                        ).length - 1
                                                    ] === ""
                                                )
                                                    e.preventDefault();
                                            }
                                        }}
                                        onChange={e => {
                                            onSave(
                                                contents.map((item, itemNo) => {
                                                    if (itemNo === index) {
                                                        return {
                                                            ...item,
                                                            requirements:
                                                                e.target.value,
                                                        };
                                                    }
                                                    return item;
                                                })
                                            );
                                        }}
                                        style={{
                                            height: `${
                                                76 +
                                                (data.requirements.split("\n")
                                                    .length > 4
                                                    ? data.requirements.split(
                                                          "\n"
                                                      ).length - 4
                                                    : 0) *
                                                    19
                                            }px`,
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                        {contents.length > 1 && (
                            <button
                                type="button"
                                className={`p-4 h-fit group`}
                                onClick={handleDeleteRequirement.bind(null, "")}
                            >
                                <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                            </button>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default KitRequirementList;
