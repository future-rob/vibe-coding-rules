import { createServer } from "http";
import { readFileSync, statSync, existsSync } from "fs";
import { join, extname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");
const repoRoot = resolve(__dirname, "..");
const docsDir = join(repoRoot, "docs");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const PORT = process.env.PORT || 8080;

function getMimeType(path) {
  const ext = extname(path);
  return MIME_TYPES[ext] || "text/plain";
}

function serveFile(filePath) {
  try {
    if (!existsSync(filePath)) {
      return null;
    }

    const stats = statSync(filePath);
    if (!stats.isFile()) {
      return null;
    }

    const content = readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    return { content, mimeType };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

const server = createServer((req, res) => {
  let pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

  // Default to index.html
  if (pathname === "/") {
    pathname = "/index.html";
  }

  // Remove leading slash and resolve path
  const filePath = join(docsDir, pathname);

  // Security: ensure file is within docs directory
  if (!filePath.startsWith(docsDir)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  const file = serveFile(filePath);

  if (!file) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>404 Not Found</title></head>
        <body>
          <h1>404 - File Not Found</h1>
          <p>The file <code>${pathname}</code> was not found.</p>
          <p><a href="/">Go back to homepage</a></p>
        </body>
      </html>
    `);
    return;
  }

  res.writeHead(200, {
    "Content-Type": file.mimeType,
    "Cache-Control": "no-cache",
  });
  res.end(file.content);
});

server.listen(PORT, () => {
  console.log(`\n🚀 Local server running at:`);
  console.log(`   http://localhost:${PORT}\n`);
  console.log(`Press Ctrl+C to stop the server.\n`);
});

