const fs = require("node:fs");
const path = require("node:path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT_DIR = __dirname;
const DOCS_DIR = path.join(ROOT_DIR, "impact-docs");
const IMPACT_DIR = path.join(ROOT_DIR, "impact");
const EXAMPLES_DIR = path.join(ROOT_DIR, "examples");

app.disable("x-powered-by");

app.use("/impact", express.static(IMPACT_DIR));
app.use("/examples", express.static(EXAMPLES_DIR));
app.use("/docs-assets", express.static(DOCS_DIR));

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodePathSegments(relativePath) {
  return relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function safeResolve(baseDir, relativePath) {
  const normalizedPath = path.normalize(relativePath);
  const fullPath = path.resolve(baseDir, normalizedPath);
  const allowedPrefix = `${baseDir}${path.sep}`;

  if (fullPath !== baseDir && !fullPath.startsWith(allowedPrefix)) {
    return null;
  }

  return fullPath;
}

function listFilesRecursive(rootDir, extension) {
  const results = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) {
      return;
    }

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".")) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      if (!entry.name.toLowerCase().endsWith(extension)) {
        continue;
      }

      results.push(path.relative(rootDir, fullPath).split(path.sep).join("/"));
    }
  }

  walk(rootDir);
  return results.sort((a, b) => a.localeCompare(b));
}

function groupByFirstSegment(relativePaths) {
  const groups = new Map();

  for (const relativePath of relativePaths) {
    const [group = "misc"] = relativePath.split("/");

    if (!groups.has(group)) {
      groups.set(group, []);
    }

    groups.get(group).push(relativePath);
  }

  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

function buildIndexData() {
  const docs = listFilesRecursive(DOCS_DIR, ".md");
  const impactPages = listFilesRecursive(IMPACT_DIR, ".html").filter(
    (relativePath) => !relativePath.includes("/")
  );
  const examplePages = listFilesRecursive(EXAMPLES_DIR, ".html");

  return {
    docs,
    impactPages,
    exampleGroups: groupByFirstSegment(examplePages),
  };
}

function renderPage(title, body, options = {}) {
  const extraHead = options.extraHead || "";
  const extraBody = options.extraBody || "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --bg: #f4f0e6;
      --panel: #fffaf0;
      --panel-2: #efe5d2;
      --text: #2f261d;
      --muted: #6f6256;
      --accent: #136f63;
      --border: #d6c8b3;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: "Avenir Next", "Trebuchet MS", "Gill Sans", sans-serif;
      background: radial-gradient(circle at 20% 10%, #fef6e4 0%, #f4f0e6 45%, #ebe2cf 100%);
      color: var(--text);
      line-height: 1.5;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .container {
      width: min(1100px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 64px;
    }

    .hero {
      padding: 24px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: rgba(255, 250, 240, 0.92);
      margin-bottom: 24px;
    }

    .hero h1 {
      margin: 0 0 8px;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.05;
    }

    .hero p {
      margin: 0;
      color: var(--muted);
      max-width: 72ch;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
    }

    .card h2, .card h3 {
      margin-top: 0;
    }

    .muted {
      color: var(--muted);
    }

    .link-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .link-list li + li {
      margin-top: 8px;
    }

    .subsection + .subsection {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .pill {
      display: inline-block;
      padding: 4px 10px;
      font-size: 12px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--muted);
    }

    .notice {
      margin-top: 16px;
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--panel-2);
      border: 1px solid var(--border);
      color: var(--muted);
    }

    code, pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
  </style>
  ${extraHead}
</head>
<body>
  <main class="container">
    ${body}
  </main>
  ${extraBody}
</body>
</html>`;
}

function renderLinkList(relativePaths, basePath) {
  if (!relativePaths.length) {
    return '<p class="muted">None found.</p>';
  }

  return `<ul class="link-list">
    ${relativePaths
      .map((relativePath) => {
        const href = `${basePath}/${encodePathSegments(relativePath)}`;
        return `<li><a href="${href}">${escapeHtml(relativePath)}</a></li>`;
      })
      .join("")}
  </ul>`;
}

function renderLandingPage() {
  const { docs, impactPages, exampleGroups } = buildIndexData();

  const exampleSections = exampleGroups.length
    ? exampleGroups
        .map(
          ([groupName, pages]) => `
            <div class="subsection">
              <h3>${escapeHtml(groupName)}</h3>
              ${renderLinkList(pages, "/examples")}
            </div>
          `
        )
        .join("")
    : '<p class="muted">No examples found.</p>';

  return renderPage(
    "Impact Port",
    `
      <section class="hero">
        <span class="pill">ImpactJS docs + demos</span>
        <h1>Impact Port</h1>
        <p>
          Minimal Express host for the engine docs, sample games, and the main Impact entry pages.
        </p>
      </section>

      <section class="grid">
        <article class="card">
          <h2>Docs</h2>
          <p class="muted">
            Read the existing Markdown docs in a rendered view without changing the source files.
          </p>
          ${renderLinkList(docs, "/docs")}
        </article>

        <article class="card">
          <h2>Impact</h2>
          <p class="muted">
            Entry pages found in <code>impact/</code>.
          </p>
          ${renderLinkList(impactPages, "/impact")}
          <div class="notice">
            <strong>Note:</strong> <code>weltmeister.html</code> will load as a page, but this Node-only server does not execute the original PHP editor endpoints.
          </div>
        </article>

        <article class="card">
          <h2>Examples</h2>
          <p class="muted">
            Sample games under <code>examples/</code>.
          </p>
          ${exampleSections}
        </article>
      </section>
    `
  );
}

function renderDocsIndexPage() {
  const { docs } = buildIndexData();

  return renderPage(
    "Docs",
    `
      <div class="topbar">
        <div>
          <h1 style="margin:0;">Documentation</h1>
          <p class="muted" style="margin:6px 0 0;">Rendered Markdown view over the existing files in <code>impact-docs/</code>.</p>
        </div>
        <a href="/">← Home</a>
      </div>

      <section class="card">
        ${renderLinkList(docs, "/docs")}
      </section>
    `
  );
}

function renderDocPage(relativePath) {
  const escapedTitle = escapeHtml(relativePath);
  const rawUrl = `/docs/raw/${encodePathSegments(relativePath)}`;

  return renderPage(
    relativePath,
    `
      <div class="topbar">
        <div>
          <h1 style="margin:0;">${escapedTitle}</h1>
          <p class="muted" style="margin:6px 0 0;">Rendered from the original Markdown source.</p>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <a href="/docs">All docs</a>
          <a href="/">Home</a>
          <a href="${rawUrl}">Raw Markdown</a>
        </div>
      </div>

      <article id="doc-content" class="markdown-body"></article>
    `,
    {
      extraHead: `
        <base href="/docs-assets/">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.min.css">
        <style>
          .markdown-body {
            max-width: 960px;
            margin: 0 auto;
            padding: 32px;
            background: #ffffff;
            color: #24292f;
            border-radius: 16px;
          }

          .markdown-body img {
            max-width: 100%;
            height: auto;
          }
        </style>
      `,
      extraBody: `
        <script src="https://cdn.jsdelivr.net/npm/marked@15.0.12/marked.min.js"></script>
        <script>
          (async function loadDoc() {
            const rawUrl = ${JSON.stringify(rawUrl)};
            const contentEl = document.getElementById("doc-content");

            try {
              const response = await fetch(rawUrl);
              if (!response.ok) {
                throw new Error("Unable to load markdown.");
              }

              const markdown = await response.text();
              contentEl.innerHTML = marked.parse(markdown);

              for (const link of contentEl.querySelectorAll("a[href]")) {
                const href = link.getAttribute("href");
                if (!href) {
                  continue;
                }

                if (/^(https?:|mailto:|#)/i.test(href)) {
                  continue;
                }

                if (href.toLowerCase().endsWith(".md")) {
                  const normalized = href.replace(/^\\.\\//, "");
                  const encoded = normalized
                    .split("/")
                    .map(encodeURIComponent)
                    .join("/");
                  link.setAttribute("href", "/docs/" + encoded);
                }
              }
            } catch (error) {
              contentEl.innerHTML = "<p>Failed to load this document.</p>";
            }
          }());
        </script>
      `,
    }
  );
}

app.get("/", (req, res) => {
  res.type("html").send(renderLandingPage());
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/docs", (req, res) => {
  res.type("html").send(renderDocsIndexPage());
});

app.get(/^\/docs\/raw\/(.+)$/, (req, res) => {
  const relativePath = decodeURIComponent(req.params[0] || "");

  if (!relativePath.toLowerCase().endsWith(".md")) {
    res.status(404).send("Not found");
    return;
  }

  const fullPath = safeResolve(DOCS_DIR, relativePath);
  if (!fullPath || !fs.existsSync(fullPath)) {
    res.status(404).send("Not found");
    return;
  }

  res.type("text/markdown").send(fs.readFileSync(fullPath, "utf8"));
});

app.get(/^\/docs\/(.+)$/, (req, res) => {
  const relativePath = decodeURIComponent(req.params[0] || "");

  if (!relativePath.toLowerCase().endsWith(".md")) {
    res.status(404).type("html").send(renderPage("Not Found", "<p>Document not found.</p>"));
    return;
  }

  const fullPath = safeResolve(DOCS_DIR, relativePath);
  if (!fullPath || !fs.existsSync(fullPath)) {
    res.status(404).type("html").send(renderPage("Not Found", "<p>Document not found.</p>"));
    return;
  }

  res.type("html").send(renderDocPage(relativePath));
});

app.use((req, res) => {
  res.status(404).type("html").send(
    renderPage(
      "Not Found",
      `
        <div class="card">
          <h1>Not Found</h1>
          <p class="muted">The requested page does not exist.</p>
          <p><a href="/">Go back home</a></p>
        </div>
      `
    )
  );
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Impact Port listening on port ${PORT}`);
});
