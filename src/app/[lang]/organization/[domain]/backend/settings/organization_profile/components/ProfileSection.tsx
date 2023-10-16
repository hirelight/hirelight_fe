"use client";

import React, { FormEvent } from "react";

import { Button, CustomInput, LocationAutocomplete } from "@/components";

import styles from "../styles.module.scss";

const ProfileSection = () => {
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
                            value="Hirelight"
                            onChange={() => {}}
                            required
                        />
                    </div>

                    <div>
                        <LocationAutocomplete
                            type="text"
                            title="Location"
                            value="Ho Chi Minh"
                            handlePlaceChange={() => {}}
                            required
                        />
                    </div>

                    <div>
                        <div className="relative mb-1">
                            <CustomInput
                                type="text"
                                title="Domain"
                                value="hirelight_co"
                                onChange={() => {}}
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
                    <div>
                        <CustomInput
                            type="text"
                            title="Industry"
                            value="Software Engineer"
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <div className="p-6 border-t border-gray-300">
                    <Button type="submit">Save changes</Button>
                </div>
            </form>
        </section>
    );
};

export default ProfileSection;
