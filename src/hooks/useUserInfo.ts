import React from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const useUserInfo = <T>() => {
    const [info, setInfo] = React.useState<any | undefined>();

    React.useEffect(() => {
        const token: string | undefined = Cookies.get("hirelight_access_token");
        if (token) {
            const decoded: any = jwtDecode(token);
            setInfo(decoded);
        }
    }, []);

    return info;
};
