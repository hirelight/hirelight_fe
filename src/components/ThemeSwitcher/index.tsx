"use client";

import React from "react";

import { Themes, useTheme } from "../ThemeProvider";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const handleSwitchMode = (theme: Themes) => {
        localStorage.setItem("hirelight_theme", theme);
        const htmlEl = document.querySelector("html");
        if (htmlEl) {
            htmlEl.setAttribute("data-mode", theme);
        }

        setTheme(theme);
    };
    return (
        <div>
            <button type="button" onClick={() => handleSwitchMode("light")}>
                Light Mode
            </button>
            <button type="button" onClick={() => handleSwitchMode("dark")}>
                Dark Mode
            </button>
        </div>
    );
};

export default ThemeSwitcher;
