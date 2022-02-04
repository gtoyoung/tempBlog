import React from "react";
import { Link } from "gatsby";
import styles from "./navigation.module.css";

export default () => (
  <nav role="navigation" className="border fixed split-nav">
    <div class="nav-brand">
      <h3>
        <a href="#">DOVB`s Blog</a>
      </h3>
    </div>
    <div class="collapsible-body">
      <ul class="inline">
        <li>
          <a>
            <Link to="/">Home</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="/blog/">Blog</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="/photo/">Photo</Link>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);
