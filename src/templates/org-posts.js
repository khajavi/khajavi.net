import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function orgPosts({ data }) {
  const { html } = data.orgContent
  const { title } = data.orgContent.metadata
  return (
    <Layout>
      <h1>{title}</h1>
      <section
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
      />
    </Layout>
  )
}

export const query = graphql`
  query ProjectPages($title: String!) {
    orgContent(metadata: { title: { eq: $title } }) {
      html
      slug
      metadata {
        title
      }
    }
  }
`
