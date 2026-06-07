import { getCollection, type CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection("posts", ({ data }) => {
    return data.status === "published" && data.seo?.noindex !== true;
  });

  return posts.sort((left, right) => {
    return compareDateDesc(left.data.publishedAt, right.data.publishedAt);
  });
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<PostEntry | undefined> {
  const posts = await getPublishedPosts();

  return posts.find((post) => post.data.slug === slug);
}

export function getPostPath(post: PostEntry): string {
  return `/${post.data.slug}`;
}

export function getPostMarkdownPath(post: PostEntry): string {
  return `/${post.data.slug}.md`;
}

function compareDateDesc(left?: string, right?: string): number {
  if (!left && !right) {
    return 0;
  }

  if (!left) {
    return 1;
  }

  if (!right) {
    return -1;
  }

  return right.localeCompare(left);
}
