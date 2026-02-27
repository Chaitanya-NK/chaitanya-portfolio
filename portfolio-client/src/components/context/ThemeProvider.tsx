// context/ThemeProvider.tsx
import { createContext, useEffect, useState, type ReactNode } from "react";

export const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // v4 specifically looks for the "dark" class on the html tag
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};