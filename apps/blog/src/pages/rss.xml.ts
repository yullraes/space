import rss from "@astrojs/rss";
import { getPostPath, getPublishedPosts } from "../lib/posts";

export async function GET(context: { site: URL }) {
  const posts = await getPublishedPosts();

  return rss({
    title: "My Blog",
    description: "Questions, judgment, and notes from building software.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? "",
      pubDate: new Date(post.data.publishedAt ?? Date.now()),
      link: getPostPath(post)
    }))
  });
}
