import { useState } from "react";

const useTheme = () => {
  let prefersColorScheme = null;
  if (typeof window !== "undefined") {
    prefersColorScheme = window.matchMedia("prefers-color-scheme: dark").matches
      ? "dark"
      : "light";
  }
  let localTheme = null;
  if (typeof window !== "undefined") {
    localTheme = localStorage.getItem("theme");
  }
  const initialTheme = localTheme || prefersColorScheme;
  const [theme, setTheme] = useState(initialTheme);

  const setMode = (mode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", mode);
    }
    if (mode === "dark" && typeof window !== "undefined") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      document.getElementById("themeBtn").setAttribute("aria-pressed", "true");
    } else if (mode === "light" && typeof window !== "undefined") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      document.getElementById("themeBtn").setAttribute("aria-pressed", "false");
    }
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  return [theme, themeToggler];
};
export default useTheme;
