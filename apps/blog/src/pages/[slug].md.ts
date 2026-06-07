import type { APIContext } from "astro";
import { getPublishedPosts } from "../lib/posts";

export async function getStaticPaths() {
  const posts = await getPublishedPosts();

  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: { post }
  }));
}

export function GET({ props }: APIContext) {
  const post = props.post;
  const body = [
    `# ${post.data.title}`,
    "",
    post.data.question ? `> Question: ${post.data.question}` : undefined,
    post.data.description ? `Description: ${post.data.description}` : undefined,
    `Published: ${post.data.publishedAt ?? ""}`,
    `Category: ${post.data.category}`,
    `Tags: ${post.data.tags.join(", ")}`,
    "",
    "---",
    "",
    post.body
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
}
