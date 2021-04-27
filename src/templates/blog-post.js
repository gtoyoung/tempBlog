import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TableOfContents from "../components/table-of-contents";
import StickyBox from "react-sticky-box";

import heroStyles from "../components/hero.module.css";

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost");
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Layout location={this.props.location}>
        <div className="row">
          <StickyBox offsetTop={20} offsetBottom={20}>
            <div className="tocWrapper">
              <TableOfContents items={post.body.childMdx.tableOfContents} />
            </div>
          </StickyBox>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div>
            <div className={heroStyles.hero}>
              <Img
                className={heroStyles.heroImage}
                alt={post.title}
                fluid={post.heroImage.fluid}
              />
            </div>
            <div className="wrapper">
              <h1 className="section-headline">{post.title}</h1>
              <p
                style={{
                  display: "block",
                }}
              >
                {post.publishDate}
              </p>

              <MDXRenderer>{post.body.childMdx.body}</MDXRenderer>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMdx {
          body
          tableOfContents
        }
      }
    }
  }
`;
