import React from "react";
import PropTypes from "prop-types";
import { FaTag } from "react-icons/fa/";
import { Link, graphql } from "gatsby";
import { ThemeContext } from "../layouts";

// Components
import List from "../components/List";
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
            <List edges={edges} theme={theme} />
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

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
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
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
