"use client";

import * as React from "react";

export type Themes = "dark" | "light" | "system";

type ThemeState = {
    theme: Themes;
    setTheme: React.Dispatch<React.SetStateAction<Themes>>;
};

export const ThemeContext = React.createContext<ThemeState | null>(null);

export const useTheme = (): ThemeState => {
    const context = React.useContext(ThemeContext);

    if (!context)
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

export default function ThemeProvider({ children, ...props }: any) {
    const [theme, setTheme] = React.useState<Themes>("system");

    React.useEffect(() => {
        const curTheme = localStorage.getItem("hirelight_theme");
        const htmlEl = document.querySelector("html");

        if (curTheme === null) {
            localStorage.setItem("hirelight_theme", theme);
            if (htmlEl) htmlEl.setAttribute("data-mode", theme);
        } else {
            setTheme(curTheme as Themes);
            if (htmlEl) htmlEl.setAttribute("data-mode", curTheme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
            {children}
        </ThemeContext.Provider>
    );
}
