import React from "react";
import { graphql } from "gatsby";
import styles from "./blog.module.css";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import { useState } from "react";
import { useEffect } from "react";

function BlogIndex({ data }) {
  const [posts, setPosts] = useState(data.allContentfulBlogPost.edges);
  const [query, setQuery] = useState("");
  useEffect(() => {
    // settingTags();
    if (query === "") {
      setPosts(data.allContentfulBlogPost.edges);
    }
  }, [posts]);

  const handleInputChange = (event) => {
    const filteredPosts = data.allContentfulBlogPost.edges.filter((post) => {
      var tags = post.node.tags;
      return tags.includes(event.target.innerText);
    });
    setQuery(event.target.innerText);
    setPosts(filteredPosts);
  };
  return (
    <Layout>
      <div className={styles.hero}>Blog</div>
      <div className="wrapper">
        <h2 className="section-headline">articles</h2>
        <div className="row flex-spaces">
          {posts
            ? posts.map(({ node }) => {
                return (
                  <div
                    key={node.slug}
                    className="sm-3 col border border-primary"
                  >
                    <ArticlePreview article={node} />
                    {node.tags.map((tag, index) => {
                      return (
                        <button
                          href="javascript:(void);"
                          className="btn-small"
                          onClick={handleInputChange}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid {
              src
            }
          }
          description {
            childMdx {
              body
            }
          }
        }
      }
    }
  }
`;
