"use client";

import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId } from "@/redux/slices/templates.slice";

import templates from "../mock-data.json";

import EmailTemplateCard from "./EmailTemplateCard";
import UpdateEmailTemplate from "./UpdateEmailTemplate";

interface IEmailTemplateList {
    datas: typeof templates;
}

const EmailTemplateList: React.FC<IEmailTemplateList> = ({ datas }) => {
    const dispatch = useAppDispatch();
    const { editingId, searchQuery } = useAppSelector(state => state.templates);

    return (
        <ul>
            {datas
                .filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, index) => (
                    <li
                        key={item.id}
                        className="border-b border-gray-300 last:border-none"
                    >
                        <EmailTemplateCard data={item} />
                        {editingId === item.id && (
                            <div className="p-6">
                                <UpdateEmailTemplate
                                    data={item}
                                    onSaveChanges={() => {
                                        dispatch(setEditingId(-1));
                                    }}
                                    onCancel={() => {
                                        dispatch(setEditingId(-1));
                                    }}
                                />
                            </div>
                        )}
                    </li>
                ))}
        </ul>
    );
};

export default EmailTemplateList;
