"use client";

import React, { FormEvent } from "react";
import { produce } from "immer";

import { Button, CustomInput, LocationAutocomplete } from "@/components";

import styles from "../styles.module.scss";

import { useOrgProfileForm } from "./OrgProfileForm";

const ProfileSection = () => {
    const { orgData, setOrgData } = useOrgProfileForm();

    const handleSaveProfileChanges = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <section>
            <h2 className={styles.section__title}>Organization Profile</h2>
            <form
                className={styles.section__content__wrapper}
                onSubmit={handleSaveProfileChanges}
            >
                <div className="grid md:grid-cols-2 gap-4 p-6">
                    <div>
                        <CustomInput
                            type="text"
                            title="Organization name"
                            value={orgData.name}
                            onChange={e =>
                                setOrgData(
                                    produce(orgData, draft => {
                                        draft.name = e.target.value;
                                    })
                                )
                            }
                            required
                        />
                    </div>

                    <div>
                        <LocationAutocomplete
                            type="text"
                            title="Location"
                            value={orgData.address ?? ""}
                            placeholder="Organization location"
                            onChange={(e: any) =>
                                setOrgData(
                                    produce(orgData, draft => {
                                        draft.address = e.target.value;
                                    })
                                )
                            }
                            handlePlaceChange={() => {}}
                            required
                        />
                    </div>

                    <div>
                        <div className="relative mb-1">
                            <CustomInput
                                type="text"
                                title="Domain"
                                value={orgData.subdomain ?? ""}
                                onChange={e =>
                                    setOrgData(
                                        produce(orgData, draft => {
                                            draft.subdomain = e.target.value;
                                        })
                                    )
                                }
                                className="pr-20"
                                required
                            />
                            <div className="absolute right-2.5 bottom-2.5 text-sm text-gray-500">
                                <span>.hirelight.xyz</span>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500">
                            You can use letters, numbers, and dashes. It just
                            can&apos;t end with a dash
                        </p>
                    </div>
                    <div></div>
                </div>
                <div className="p-6 border-t border-gray-300">
                    <Button type="submit">Save changes</Button>
                </div>
            </form>
        </section>
    );
};

export default ProfileSection;
