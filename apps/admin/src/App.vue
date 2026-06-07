<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { AdminApiClient, type AdminPostSummary } from "@my-blog/api-client";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787";
const client = new AdminApiClient(apiBaseUrl);

const posts = ref<AdminPostSummary[]>([]);
const views = ref(0);
const deploymentState = ref("unknown");
const error = ref<string | null>(null);

const publishedPosts = computed(
  () => posts.value.filter((post) => post.status === "published").length
);

onMounted(async () => {
  try {
    const [postResult, analyticsResult, deploymentResult] = await Promise.all([
      client.listPosts(),
      client.getAnalyticsSummary(),
      client.getLatestDeployment()
    ]);

    posts.value = postResult.posts;
    views.value = analyticsResult.views;
    deploymentState.value = deploymentResult.state;
  } catch (unknownError) {
    error.value =
      unknownError instanceof Error ? unknownError.message : "Unknown API error";
  }
});
</script>

<template>
  <main class="shell">
    <header class="header">
      <div>
        <p class="eyebrow">Operations</p>
        <h1>Blog Admin</h1>
      </div>
      <span class="status">{{ deploymentState }}</span>
    </header>

    <p v-if="error" class="error">{{ error }}</p>

    <section class="metrics" aria-label="summary">
      <article>
        <span>Posts</span>
        <strong>{{ posts.length }}</strong>
      </article>
      <article>
        <span>Published</span>
        <strong>{{ publishedPosts }}</strong>
      </article>
      <article>
        <span>Views</span>
        <strong>{{ views }}</strong>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>Post Workflow</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.slug">
            <td>{{ post.title }}</td>
            <td>{{ post.status }}</td>
            <td>{{ post.category }}</td>
            <td>{{ post.publishedAt ?? "-" }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
