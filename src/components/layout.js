import React from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

class Template extends React.Component {
  render() {
    deckDeckGoHighlightElement();
    const { children } = this.props;

    return (
      <Container>
        <Navigation />
        {children}
      </Container>
    );
  }
}

export default Template;
