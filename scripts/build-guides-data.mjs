import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const STACKS = [
  {
    id: "typescript",
    name: "TypeScript",
    directory: "Typescript",
    icon: "icons/typescript.png",
    summary: "Type-safe JavaScript development",
    focus: "Type safety, code quality, best practices",
  },
  {
    id: "python",
    name: "Python",
    directory: "Python",
    icon: "icons/python.png",
    summary: "General Python development",
    focus: "Type safety, readability, best practices",
  },
  {
    id: "rust",
    name: "Rust",
    directory: "Rust",
    icon: "icons/rust.png",
    summary: "Systems programming with Rust",
    focus: "Memory safety, performance, zero-cost abstractions",
  },
  {
    id: "arduino-platformio",
    name: "Arduino + PlatformIO",
    directory: "Arduino + PlatformIO",
    icon: "icons/arduino.png",
    summary: "Embedded systems & microcontrollers",
    focus: "Hardware abstraction, memory management, interrupts, safety",
  },
  {
    id: "python-fastapi",
    name: "Python + FastAPI",
    directory: "Python + FastAPI",
    icon: "icons/fastapi.png",
    summary: "Backend API development with FastAPI",
    focus: "Async APIs, validation, security, testing",
  },
  {
    id: "solidity-foundry",
    name: "Solidity + Foundry",
    directory: "solidity + foundry",
    icon: "icons/solidity.png",
    summary: "Smart contract engineering with Foundry",
    focus: "Security-first, gas efficiency, upgradeability",
  },
  {
    id: "typescript-react-nextjs",
    name: "TypeScript-React + Nextjs",
    directory: "Typescript-React + Nextjs",
    icon: "icons/nextjs.png",
    summary: "Full-stack web development with Next.js",
    focus: "React patterns, accessibility, performance",
  },
];

const parseFrontmatter = (content) => {
  if (!content.startsWith("---")) {
    return { frontmatter: {}, body: content };
  }

  const endIndex = content.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: content };
  }

  const fmText = content.slice(3, endIndex).trim();
  const body = content.slice(endIndex + 4).trimStart();
  const frontmatter = {};

  const lines = fmText.split(/\r?\n/);
  let currentKey = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    if (line.trim().startsWith("-")) {
      if (currentKey) {
        if (!Array.isArray(frontmatter[currentKey])) {
          frontmatter[currentKey] = [];
        }
        const value = line
          .trim()
          .slice(1)
          .trim()
          .replace(/^["']|["']$/g, "");
        frontmatter[currentKey].push(value);
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line
      .slice(colonIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    if (value) {
      frontmatter[key] =
        value === "true" ? true : value === "false" ? false : value;
      currentKey = null;
    } else {
      frontmatter[key] = [];
      currentKey = key;
    }
  }

  return { frontmatter, body };
};

const titleize = (fileName) => {
  return fileName
    .replace(/\.mdc$/i, "")
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

async function buildGuidesData() {
  const docsDir = path.join(repoRoot, "docs");
  const dataDir = path.join(docsDir, "data");

  await fs.mkdir(dataDir, { recursive: true });

  const stacksData = [];

  for (const stack of STACKS) {
    const stackDir = path.join(repoRoot, stack.directory);
    const rulesDir = path.join(stackDir, ".cursor", "rules");
    const files = await fs.readdir(rulesDir);
    const mdcFiles = files.filter((f) => f.endsWith(".mdc"));

    const guides = [];

    for (const file of mdcFiles) {
      const filePath = path.join(rulesDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      const { frontmatter, body } = parseFrontmatter(content);

      const guide = {
        id: slugify(file.replace(/\.mdc$/i, "")),
        title: titleize(file),
        fileName: file,
        frontmatter,
        content: body,
        alwaysApply:
          frontmatter.alwaysApply === true ||
          frontmatter.alwaysApply === "true",
        globs: frontmatter.globs || [],
      };

      guides.push(guide);
    }

    guides.sort((a, b) => {
      if (a.fileName === "README.md") return -1;
      if (b.fileName === "README.md") return 1;
      return a.title.localeCompare(b.title);
    });

    const readmePath = path.join(stackDir, "README.md");
    let readme = "";
    try {
      readme = await fs.readFile(readmePath, "utf-8");
    } catch (err) {
      // README might not exist
    }

    stacksData.push({
      ...stack,
      readme,
      guides,
    });
  }

  const output = {
    stacks: stacksData,
    generatedAt: new Date().toISOString(),
  };

  await fs.writeFile(
    path.join(dataDir, "guides.json"),
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(
    `✅ Built guides data: ${stacksData.length} stacks, ${stacksData.reduce(
      (sum, s) => sum + s.guides.length,
      0
    )} guides`
  );
}

buildGuidesData().catch(console.error);
