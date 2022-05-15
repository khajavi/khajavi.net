import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function orgPosts({ data, location}) {
  const { html } = data.orgContent
  const { title } = data.orgContent.metadata
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <h1>{title}</h1>
      <section
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
      />
    </Layout>
  )
}

export const query = graphql`
  query ProjectPages($slug: String!) {
    orgContent(metadata: { slug: { eq: $slug } }) {
      html
      metadata {
        title
        slug
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
