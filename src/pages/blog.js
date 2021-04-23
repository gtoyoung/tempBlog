import React from "react";
import { graphql } from "gatsby";
import styles from "./blog.module.css";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";

function BlogIndex({ data }) {
  const [posts, setPosts] = useState(data.allContentfulBlogPost.edges);
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    // settingTags();
    if (query == "") {
      setPosts(data.allContentfulBlogPost.edges);
    }
  }, [posts]);

  const settingTags = () => {
    var tagList = [];
    posts.map((post, index) => {
      post.node.tags.map((tag, index) => {
        tagList.push(tag);
      });
    });
    setTags(tagList);
    console.log(tags);
  };

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
      <div className="wrapper fJjfrB">
        <h2 className="section-headline">articles</h2>
        <ul className="article-list">
          {posts
            ? posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                    {node.tags.map((tag, index) => {
                      return (
                        <a
                          href="javascript:(void);"
                          className="cqnnTr"
                          onClick={handleInputChange}
                        >
                          {tag}
                        </a>
                      );
                    })}
                  </li>
                );
              })
            : null}
        </ul>
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
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
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
