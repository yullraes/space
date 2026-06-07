export function GET(context: { site: URL }) {
  const sitemapUrl = new URL("/sitemap-index.xml", context.site);

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
