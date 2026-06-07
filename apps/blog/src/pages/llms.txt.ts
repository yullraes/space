import { getPostMarkdownPath, getPublishedPosts } from "../lib/posts";

export async function GET() {
  const posts = await getPublishedPosts();
  const lines = [
    "# My Blog",
    "",
    "> Questions, judgment, and notes from building software.",
    "",
    "## Recent Writings",
    "",
    ...posts.map((post) => {
      return `- [${post.data.title}](${getPostMarkdownPath(post)}): ${
        post.data.description ?? post.data.question ?? ""
      }`;
    }),
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
