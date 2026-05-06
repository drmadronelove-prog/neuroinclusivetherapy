import { ToolPageLayout } from "@/components/tool-page-layout"
import { BlogHeroCard } from "@/components/blog/blog-hero-card"
import { posts } from "./posts"

export const metadata = {
  title: "Blog | Olive Clinical",
  description: "Thoughts on neurodivergent-affirming therapy, mental wellness, and living differently.",
}

export default function BlogPage() {
  return (
    <ToolPageLayout title="BLOG" color="text-[#4F5D6E]">
      <p
        className="max-w-2xl mb-10 text-[1.05rem] leading-relaxed"
        style={{ color: "#6B7B8C" }}
      >
        Thoughts on neurodivergent-affirming therapy, mental wellness, and living
        differently. Choose an essay below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {posts.map((post, i) => (
          <BlogHeroCard
            key={post.slug}
            post={{
              slug: post.slug,
              title: post.title,
              category: post.category,
              date: post.date,
            }}
            index={i}
          />
        ))}
      </div>
    </ToolPageLayout>
  )
}
