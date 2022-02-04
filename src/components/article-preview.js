import React from "react";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styles from "./article-preview.module.css";

export default ({ article }) => (
  <div
    className={styles.preview}
    onContextMenu={(e) => {
      e.preventDefault();
      alert("우클릭 방지");
    }}
  >
    <div className="card" style={{ width: "20rem" }}>
      <img src={article.heroImage.fluid.src} />
      <div className="card-body">
        <h4 className="card-title">
          <Link to={`/blog/${article.slug}`}>{article.title}</Link>
        </h4>
        <h5 className="card-subtitle">
          <MDXRenderer>{article.description.childMdx.body}</MDXRenderer>
        </h5>
        <p className="card-text">{article.publishDate}</p>
      </div>
    </div>
  </div>
);
