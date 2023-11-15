"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Variants, motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
    ClipboardDocumentListIcon,
    DocumentTextIcon,
    LockClosedIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const MenuFloat = () => {
    const { lang } = useParams();

    const [showActions, setShowActions] = useState(false);
    const router = useRouter();

    const handleRedirect = (url: string) => {
        router.push(url);
        setShowActions(false);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 block lg:hidden">
            <motion.div
                animate={showActions ? "open" : "closed"}
                className="relative w-12 h-12"
            >
                <motion.button
                    type="button"
                    className="block w-12 h-12 p-3 rounded-full bg-white border border-gray-300 shadow-md absolute inset-0 z-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowActions(!showActions)}
                >
                    <Bars3Icon />
                </motion.button>
                <motion.div
                    variants={{
                        open: {
                            transition: {
                                staggerChildren: 0.07,
                                delayChildren: 0.2,
                            },
                        },
                        closed: {
                            transition: {
                                staggerChildren: 0.05,
                                staggerDirection: -1,
                            },
                        },
                    }}
                >
                    <motion.button
                        type="button"
                        className="block w-12 h-12 p-3 rounded-full bg-white border border-gray-300 shadow-md absolute inset-0"
                        variants={{
                            open: {
                                translateY: -60,
                            },
                            closed: {
                                translateY: 0,
                            },
                        }}
                        onClick={handleRedirect.bind(
                            null,
                            `/${lang}/profile/applications`
                        )}
                    >
                        <DocumentTextIcon />
                    </motion.button>
                    <motion.button
                        type="button"
                        className="block w-12 h-12 p-3 rounded-full bg-white border border-gray-300 shadow-md absolute inset-0"
                        variants={{
                            open: {
                                translateY: -120,
                            },
                            closed: {
                                translateY: 0,
                            },
                        }}
                        onClick={handleRedirect.bind(
                            null,
                            `/${lang}/profile/my-profile`
                        )}
                    >
                        <ClipboardDocumentListIcon />
                    </motion.button>
                    <motion.button
                        type="button"
                        className="block w-12 h-12 p-3 rounded-full bg-white border border-gray-300 shadow-md absolute inset-0"
                        variants={{
                            open: {
                                translateY: -180,
                            },
                            closed: {
                                translateY: 0,
                            },
                        }}
                        onClick={handleRedirect.bind(
                            null,
                            `/${lang}/profile/account`
                        )}
                    >
                        <UserIcon />
                    </motion.button>
                    <motion.button
                        type="button"
                        className="block w-12 h-12 p-3 rounded-full bg-white border border-gray-300 shadow-md absolute inset-0"
                        variants={{
                            open: {
                                translateY: -240,
                            },
                            closed: {
                                translateY: 0,
                            },
                        }}
                        onClick={handleRedirect.bind(
                            null,
                            `/${lang}/profile/change-password`
                        )}
                    >
                        <LockClosedIcon />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MenuFloat;
