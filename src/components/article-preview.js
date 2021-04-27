import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
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
    <Img alt="" fluid={article.heroImage.fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <MDXRenderer>{article.description.childMdx.body}</MDXRenderer>
  </div>
);
