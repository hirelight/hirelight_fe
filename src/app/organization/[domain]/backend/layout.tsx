import React from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("hirelight_access_token");
    const headersList = headers();
    console.log(headersList.get("referer"));
    if (!accessToken) {
        redirect(
            `${headersList.get("referer")?.split("/")[0]}//${
                process.env.NEXT_PUBLIC_ROOT_DOMAIN
            }/login`
        );
    } else return <>{children}</>;
};

export default BackendLayout;
