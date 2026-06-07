import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import {
  postMetaSchema,
  safeParsePublishablePostMeta
} from "@my-blog/schema";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5174"],
    credentials: true
  })
);

app.get("/health", (c) => {
  return c.json({ ok: true });
});

app.get("/admin/posts", (c) => {
  return c.json({
    posts: [
      {
        title: "Studying Strategy Pattern",
        slug: "studying-strategy-pattern",
        category: "development",
        status: "published",
        tags: ["design-patterns", "oop"],
        publishedAt: "2026-06-07"
      }
    ]
  });
});

app.post(
  "/admin/posts/:slug/publish",
  zValidator(
    "json",
    z.object({
      meta: postMetaSchema
    })
  ),
  (c) => {
    const slug = c.req.param("slug");
    const { meta } = c.req.valid("json");
    const result = safeParsePublishablePostMeta({
      ...meta,
      slug,
      status: "published"
    });

    if (!result.success) {
      return c.json(
        {
          status: "rejected",
          issues: result.error.issues
        },
        422
      );
    }

    return c.json({
      slug,
      status: "accepted",
      nextStatus: "published"
    });
  }
);

app.get("/admin/analytics/summary", (c) => {
  return c.json({
    views: 0,
    visitors: 0,
    topPosts: []
  });
});

app.get("/admin/deployments/latest", (c) => {
  return c.json({
    id: "local-dev",
    state: "success",
    startedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString()
  });
});

app.post("/webhooks/deployments", async (c) => {
  const payload = await c.req.json().catch(() => ({}));

  return c.json({
    status: "received",
    payload
  });
});

export type ApiApp = typeof app;

const port = Number(process.env.PORT ?? 8787);

serve(
  {
    fetch: app.fetch,
    port
  },
  (info) => {
    console.log(`API listening on http://localhost:${info.port}`);
  }
);
