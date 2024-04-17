// ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeProperties = {
    light: {
      backgroundColor: "#ffffff",
      fontColor: "#000000",
      bodyClassName: "light",
    },

    dark: {
      backgroundColor: "#343a40",
      fontColor: "#ffffff",
      bodyClassName: "dark",
    },
  };

  const currentTheme = themeProperties[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ...currentTheme }}>
      <div className={currentTheme.bodyClassName}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
