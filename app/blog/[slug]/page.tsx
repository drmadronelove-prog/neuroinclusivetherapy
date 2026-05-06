import { notFound } from "next/navigation"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { BlogPostArticle } from "@/components/blog/blog-post"
import { posts, getPostBySlug } from "../posts"

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post Not Found | Olive Clinical" }
  return {
    title: `${post.title} | Olive Clinical`,
    description: post.subtitle,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <ToolPageLayout color="text-[#4F5D6E]">
      <BlogPostArticle post={post} />
    </ToolPageLayout>
  )
}
