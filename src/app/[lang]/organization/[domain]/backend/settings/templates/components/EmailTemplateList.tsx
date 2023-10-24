"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId } from "@/redux/slices/templates.slice";
import { fetchEmailTemplates } from "@/redux/thunks/email-templates.thunk";

import EmailTemplateCard from "./EmailTemplateCard";
import EditAddTemplateSkeleton from "./EditAddTemplateSkeleton";

const UpdateEmailTemplate = dynamic(() => import("./UpdateEmailTemplate"), {
    loading: () => <EditAddTemplateSkeleton />,
});

interface IEmailTemplateList {}

const EmailTemplateList: React.FC<IEmailTemplateList> = ({}) => {
    const dispatch = useAppDispatch();
    const { editingId, searchQuery, datas } = useAppSelector(
        state => state.templates.emailTemplates
    );
    useEffect(() => {
        dispatch(fetchEmailTemplates());
    }, []);

    return (
        <ul>
            {datas
                ?.filter(item =>
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
