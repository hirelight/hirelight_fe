"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const DomainPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const hostname = window.location.hostname;

    React.useEffect(() => {
        router.push(`backend`);
    }, [router]);

    return null;
};

export default DomainPage;
