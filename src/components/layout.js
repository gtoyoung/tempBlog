import React from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
class Template extends React.Component {
  render() {
    deckDeckGoHighlightElement();
    const { children } = this.props;

    return (
      <Container>
        <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  toggleTheme(e.target.checked ? "dark" : "light")
                }
                checked={theme === "dark"}
              />{" "}
              Dark mode
            </label>
          )}
        </ThemeToggler>
        <Navigation />
        {children}
      </Container>
    );
  }
}

export default Template;
