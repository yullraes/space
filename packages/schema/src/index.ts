import { z } from "zod";

export const postStatuses = ["draft", "published", "archived"] as const;

export const postCategories = [
  "development",
  "operations",
  "practice",
  "meta"
] as const;

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format.");

export const postMetaSchema = z.object({
  title: z.string().trim().min(1),
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case ASCII slugs."),
  description: z.string().trim().min(1).optional(),
  question: z.string().trim().min(1).optional(),
  category: z.enum(postCategories),
  tags: z.array(z.string().trim().min(1)).default([]),
  status: z.enum(postStatuses).default("draft"),
  publishedAt: dateStringSchema.optional(),
  updatedAt: dateStringSchema.optional(),
  aliases: z.array(z.string().trim().min(1)).optional(),
  seo: z
    .object({
      title: z.string().trim().min(1).optional(),
      description: z.string().trim().min(1).optional(),
      canonical: z.string().trim().min(1).optional(),
      noindex: z.boolean().optional()
    })
    .optional(),
  llm: z
    .object({
      include: z.boolean().optional(),
      summary: z.string().trim().min(1).optional()
    })
    .optional()
});

export const publishablePostMetaSchema = postMetaSchema.superRefine(
  (meta, ctx) => {
    if (meta.status !== "published") {
      return;
    }

    if (!meta.description) {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Published posts need a description."
      });
    }

    if (!meta.question) {
      ctx.addIssue({
        code: "custom",
        path: ["question"],
        message: "Published posts need a question."
      });
    }

    if (!meta.publishedAt) {
      ctx.addIssue({
        code: "custom",
        path: ["publishedAt"],
        message: "Published posts need publishedAt."
      });
    }
  }
);

export type PostStatus = (typeof postStatuses)[number];
export type PostCategory = (typeof postCategories)[number];
export type PostMeta = z.infer<typeof postMetaSchema>;

export function parsePostMeta(input: unknown): PostMeta {
  return postMetaSchema.parse(input);
}

export function safeParsePublishablePostMeta(input: unknown) {
  return publishablePostMetaSchema.safeParse(input);
}
