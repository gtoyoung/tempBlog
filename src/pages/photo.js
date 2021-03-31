import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import styles from "./blog.module.css";
import Layout from "../components/layout";
import Img from "gatsby-image";

class PhotoIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const photos = get(this, "props.data.allContentfulPhoto.edges");
    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Photo</div>
          <div className="wrapper">
            <ul className="article-list">
              {photos.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <Img alt="" fluid={node.photo.fluid} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PhotoIndex;

export const pageQuery = graphql`
  query PhotoIndexQuery {
    allContentfulPhoto(sort: { fields: [takeDate], order: DESC }) {
      edges {
        node {
          description
          slug
          takeDate(formatString: "MMMM Do, YYYY")
          photo {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
