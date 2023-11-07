"use client";

import React, { useEffect } from "react";
import {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/solid";

import {
    Bold,
    ChevronDown,
    ImageIcon,
    Italic,
    LinkIcon,
    ListOL,
    ListUL,
} from "@/icons";
import emailTemplateService from "@/services/email-template/email-template.service";
import {
    IEmailTemplateTypeDto,
    IEmailTemplatesDto,
} from "@/services/email-template/email-template.interface";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./EmailEditor.module.scss";

interface IEmailEditorToolbar {
    fullscreen: boolean;
    toggleFullscreen: () => void;
    handleVarChange: (value: string) => void;
    onEmailTemplateTypeChange: (id: number) => void;
    data?: IEmailTemplatesDto;
}

const EmailEditorToolbar: React.FC<IEmailEditorToolbar> = ({
    fullscreen,
    toggleFullscreen,
    handleVarChange,
    onEmailTemplateTypeChange,
    data,
}) => {
    const { emailTemplateTypes } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const selectionRef = React.useRef<HTMLUListElement>(null);

    const emailTypesSelectionRef = React.useRef<HTMLUListElement>(null);
    const [emailType, setEmailType] = React.useState<IEmailTemplateTypeDto>();
    const [emailParams, setEmailParams] = React.useState<string[]>([]);

    const handleShowSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const isExpand =
            selectionRef.current!!.classList.contains(styles.showTop) ||
            selectionRef.current!!.classList.contains(styles.show);
        if (
            e.currentTarget.getBoundingClientRect().bottom + 252 >
                window.innerHeight &&
            !isExpand
        ) {
            selectionRef.current!!.classList.add(styles.showTop);
        } else if (
            e.currentTarget.getBoundingClientRect().bottom + 252 <
                window.innerHeight &&
            !isExpand
        ) {
            selectionRef.current!!.classList.add(styles.show);
        } else {
            selectionRef.current!!.classList.remove(styles.showTop);
            selectionRef.current!!.classList.remove(styles.show);
        }
    };

    const expandSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const isExpand =
            emailTypesSelectionRef.current!!.classList.contains(
                styles.showTop
            ) ||
            emailTypesSelectionRef.current!!.classList.contains(styles.show);

        if (
            e.currentTarget.getBoundingClientRect().bottom + 252 >
                window.innerHeight &&
            !isExpand
        ) {
            emailTypesSelectionRef.current!!.classList.add(styles.showTop);
        } else if (
            e.currentTarget.getBoundingClientRect().bottom + 252 <
                window.innerHeight &&
            !isExpand
        ) {
            emailTypesSelectionRef.current!!.classList.add(styles.show);
        } else {
            emailTypesSelectionRef.current!!.classList.remove(styles.showTop);
            emailTypesSelectionRef.current!!.classList.remove(styles.show);
        }
    };

    const handleSelectVars = (value: string) => {
        handleVarChange(value);
        selectionRef.current!!.classList.remove(styles.showTop);
        selectionRef.current!!.classList.remove(styles.show);
    };

    const handleSelectEmailType = (value: IEmailTemplateTypeDto) => {
        onEmailTemplateTypeChange(value.id);
        setEmailType(value);
        setEmailParams(value.parameters.split(", ").map(item => `[${item}]`));
        emailTypesSelectionRef.current!!.classList.remove(styles.showTop);
        emailTypesSelectionRef.current!!.classList.remove(styles.show);
    };

    useEffect(() => {
        if (emailTemplateTypes.length > 0) {
            if (data) {
                console.log(data);
                const templateType = emailTemplateTypes.find(
                    item => item.id === data.emailTemplateType.id
                )!!;
                setEmailType(templateType);
                setEmailParams(
                    templateType.parameters.split(", ").map(item => `[${item}]`)
                );
            } else {
                setEmailType(emailTemplateTypes[0]);
                setEmailParams(
                    emailTemplateTypes[0].parameters
                        .split(", ")
                        .map(item => `[${item}]`)
                );
            }
        }
    }, [emailTemplateTypes, data]);

    return (
        <ul className="h-full flex relative">
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats}`}
                    onClick={handleShowSelection}
                >
                    <span className="h-4 w-4">
                        <SquaresPlusIcon />
                    </span>
                </button>
                <ul
                    ref={selectionRef}
                    className={`${styles.vars__selection__wrapper} ql-custom-inline`}
                >
                    {emailParams?.map((item, index) => (
                        <li key={index}>
                            <button
                                type="button"
                                onClick={handleSelectVars.bind(null, item)}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-bold`}
                >
                    <span className="h-4 w-4">
                        <Bold />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-italic`}
                >
                    <span className="h-4 w-4">
                        <Italic />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-list`}
                    // value={'ordered'}
                >
                    <span className="h-4 w-4">
                        <ListOL />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-list`}
                    // value={'bullet'}
                >
                    <span className="h-4 w-4">
                        <ListUL />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-link `}
                >
                    <span className="h-4 w-4">
                        <LinkIcon />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-image`}
                >
                    <span className="h-4 w-4">
                        <ImageIcon />
                    </span>
                </button>
            </li>
            <li className={`${styles.toolbar__item} relative`}>
                <button
                    type="button"
                    className={`h-[42px] w-full flex items-center justify-between gap-2 font-medium dark:text-white px-2.5 cursor-pointer text-sm text-neutral-700`}
                    onClick={expandSelection}
                >
                    {emailType ? emailType.name : "Select mail type"}
                    <div>
                        <ChevronDown className="w-4 h-4" strokeWidth={2} />
                    </div>
                </button>
                <ul
                    ref={emailTypesSelectionRef}
                    className={`${styles.email__types__selection__wrapper}`}
                >
                    {emailTemplateTypes?.map((item, index: number) => (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={handleSelectEmailType.bind(null, item)}
                            >
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} p-2`}
                    onClick={toggleFullscreen}
                >
                    {fullscreen ? (
                        <ArrowsPointingInIcon />
                    ) : (
                        <ArrowsPointingOutIcon />
                    )}
                </button>
            </li>
        </ul>
    );
};

export default EmailEditorToolbar;
