"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import accountServices from "@/services/account/account.service";

const AccountList = () => {
    const { data: res } = useQuery({
        queryKey: ["accounts"],
        queryFn: accountServices.getByEmail,
    });

    return <div>AccountList</div>;
};

export default AccountList;
