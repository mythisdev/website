import React from "react";
import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa/";
import { Link, graphql } from "gatsby";
import { ThemeContext } from "../layouts";

// Components
import List from "../components/List";
import Blog from "../components/Blog";
import Article from "../components/Article";
import Seo from "../components/Seo";
import Headline from "../components/Article/Headline";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const {
    site: {
      siteMetadata: { facebook }
    }
  } = data;
  const tagHeader = `${tag}(${totalCount})`;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline theme={theme}>
                <FaTag />
                {tagHeader}
              </Headline>
            </header>
            <Blog posts={edges} theme={theme} />
            <Link style={{ textDecoration: "italic" }} to="/tags">
              其他tags
            </Link>
          </Article>
        )}
      </ThemeContext.Consumer>
      <Seo data={tag} facebook={facebook} />
    </React.Fragment>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { order: DESC, fields: [fields___prefix] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            tags
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
