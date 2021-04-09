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
    if (query == "") {
      setPosts(data.allContentfulBlogPost.edges);
    }
  }, [posts]);

  const handleInputChange = (event) => {
    const filteredPosts = data.allContentfulBlogPost.edges.filter((post) => {
      var tags = post.node.tags;
      return tags.includes(event.target.value);
    });
    setQuery(event.target.value);
    setPosts(filteredPosts);
  };
  return (
    <Layout>
      <input
        type="text"
        aria-label="Search"
        placeholder="Search posts"
        onChange={handleInputChange}
      />
      <div style={{ background: "#fff" }}>
        {/* <Helmet title={siteTitle} /> */}
        <div className={styles.hero}>Blog</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts
              ? posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

// class BlogIndex extends React.Component {
//   render() {
//     var query = "";
//     var filteredPosts = [];
//     const siteTitle = get(this, "props.data.site.siteMetadata.title");
//     const allPosts = get(this, "props.data.allContentfulBlogPost.edges");

//     const handleInputChange = (event) => {
//       const query2 = event.target.value;
//       const filteredPosts2 = allPosts.filter((post) => {
//         var tags = post.node.tags;
//         return tags.includes("golang");
//       });
//       query = query2;
//       filteredPosts = filteredPosts2;
//     };

//     const posts = query ? filteredPosts : allPosts;

//     return (
//       <Layout location={this.props.location}>
//         <input
//           type="text"
//           aria-label="Search"
//           placeholder="Search posts"
//           onChange={handleInputChange}
//         />
//         <div style={{ background: "#fff" }}>
//           <Helmet title={siteTitle} />
//           <div className={styles.hero}>Blog</div>
//           <div className="wrapper">
//             <h2 className="section-headline">Recent articles</h2>
//             <ul className="article-list">
//               {posts.map(({ node }) => {
//                 return (
//                   <li key={node.slug}>
//                     <ArticlePreview article={node} />
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
// }

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
