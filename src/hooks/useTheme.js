import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [selectedTheme, setSelectedTheme] = useState(() => {
        return localStorage.getItem("selectedTheme") || "dark";
    });

    useEffect(() => {
        document.querySelector("body").setAttribute("data-theme", selectedTheme);
        localStorage.setItem("selectedTheme", selectedTheme);
    }, [selectedTheme]);

    const toggleTheme = () => {
        setSelectedTheme(prev => prev === "dark" ? "light" : "dark");
    };

    return { selectedTheme, toggleTheme };
};