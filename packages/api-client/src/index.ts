import type { PostMeta, PostStatus } from "@my-blog/schema";

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export type AdminPostSummary = Pick<
  PostMeta,
  "title" | "slug" | "category" | "status" | "publishedAt" | "updatedAt"
> & {
  tags: string[];
};

export type DeploymentState = "success" | "failed" | "running" | "queued";

export type DeploymentSummary = {
  id: string;
  state: DeploymentState;
  startedAt: string;
  finishedAt?: string;
  reason?: string;
};

export type AnalyticsSummary = {
  views: number;
  visitors: number;
  topPosts: Array<{ slug: string; views: number }>;
};

export class AdminApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly fetchImpl: FetchLike = globalThis.fetch.bind(globalThis)
  ) {}

  async listPosts(): Promise<{ posts: AdminPostSummary[] }> {
    return this.request("/admin/posts");
  }

  async publishPost(slug: string, meta: PostMeta) {
    return this.request<{ slug: string; status: "accepted"; nextStatus: PostStatus }>(
      `/admin/posts/${slug}/publish`,
      {
        method: "POST",
        body: JSON.stringify({ meta })
      }
    );
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    return this.request("/admin/analytics/summary");
  }

  async getLatestDeployment(): Promise<DeploymentSummary> {
    return this.request("/admin/deployments/latest");
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
