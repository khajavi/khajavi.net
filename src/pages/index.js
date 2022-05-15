import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const orgPosts = data.allOrgContent.edges
  const _posts = orgPosts.map(({ node }) => {
    const title = node.metadata.title || node.fields.slug
    const date = node.metadata.date || "no date"
    let url = node.metadata.slug 
    console.log("Hello, World")
    console.log("url", url)
    return (
      <div>
        <h3 style={{ marginBottom: "0.2em" }}>
          <Link to={url}>{title}</Link>
        </h3>
        <small>{date}</small>
        {/*<section>*/}
        {/*  <p*/}
        {/*    dangerouslySetInnerHTML={{*/}
        {/*      __html: node.html,*/}
        {/*    }}*/}
        {/*    itemProp="description"*/}
        {/*  />*/}
        {/*</section>*/}
      </div>
    )
  })

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        {/*<Bio />*/}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      {/*<Bio />*/}
      {<div>{_posts}</div>}
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
    allOrgContent(sort: { fields: [metadata___date], order: DESC }) {
      edges {
        node {
          slug
          html
          excerpt
          id
          metadata {
            title
            date
            slug
          }
        }
      }
    }
  }
`
