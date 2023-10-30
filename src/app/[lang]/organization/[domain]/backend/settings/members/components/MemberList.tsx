"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

import { Pagination } from "@/components";

import styles from "./MemberList.module.scss";

const MemberList = () => {
    return (
        <>
            <table className="w-full text-sm text-left text-neutral-700 dark:text-gray-400 rounded-tl-lg rounded-tr-lg overflow-hidden">
                <thead className="text-xs text-neutral-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 relative shadow-md">
                    <tr>
                        <th scope="col">
                            <div className={styles.table__th__wrapper}>No</div>
                        </th>
                        <th scope="col">
                            <div className={styles.table__th__wrapper}>
                                Fullname
                            </div>
                        </th>
                        <th scope="col" className="hidden lg:table-cell">
                            <div className={styles.table__th__wrapper}>
                                Email
                            </div>
                        </th>
                        <th scope="col" className="hidden md:table-cell">
                            <div className={styles.table__th__Wrppaer}>
                                Position
                            </div>
                        </th>
                        <th scope="col" className="hidden lg:table-cell">
                            <div className={styles.table__th__wrapper}>
                                Role
                            </div>
                        </th>
                        <th className="hidden lg:table-cell">
                            <div className={styles.table__th__wrapper}></div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-slate-100 bg-opacity-75">
                    {new Array(5)
                        .fill({
                            name: "Nguyen Thanh Kien",
                            email: "ngkien299@gmail.com",
                            position: "Frontend Developer",
                            role: "Admin",
                        })
                        .map((item, index) => (
                            <tr key={index}>
                                <td className="hidden lg:table-cell">
                                    <div className={styles.row__wrapper}>
                                        {index}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className={`${styles.row__wrapper} flex items-center gap-2`}
                                    >
                                        <span className="inline-block h-8 w-8 flex-shrink-0 rounded-full bg-white border border-slate-500 overflow-auto">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_AVATAR_URL as string
                                                }
                                                alt="member avatar"
                                                width={32}
                                                height={32}
                                                unoptimized
                                            />
                                        </span>
                                        {item.name}
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell">
                                    <div className={styles.row__wrapper}>
                                        {item.email}
                                    </div>
                                </td>
                                <td className="hidden md:table-cell">
                                    <div className={styles.row__wrapper}>
                                        {item.position}
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell">
                                    <div className={styles.row__wrapper}>
                                        {item.role}
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.row__wrapper}>
                                        <button type="button" className="group">
                                            <TrashIcon className="text-red-500 group-hover:text-red-700 w-6 h-6" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Pagination numOfPages={10} />
        </>
    );
};

export default MemberList;
