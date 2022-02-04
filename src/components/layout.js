import React, { useEffect } from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";
import useTheme from "../hook/useTheme";

const Template = ({ children }) => {
  const [theme, themeToggler] = useTheme();

  useEffect(() => {
    if (theme === "light" && typeof window !== "undefined") {
      document.getElementById("themeBtn").setAttribute("aria-pressed", "false");
    } else {
      document.getElementById("themeBtn").setAttribute("aria-pressed", "true");
    }
  }, null);

  return (
    <Container>
      <button
        id="themeBtn"
        className="btn_theme"
        onClick={themeToggler}
      ></button>
      <Navigation />
      {children}
    </Container>
  );
};

export default Template;
