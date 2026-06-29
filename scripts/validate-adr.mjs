import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const adrDir = path.join(repoRoot, "docs", "adr");
const adrFilePattern = /^(?<number>\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const allowedCurrentStatuses = new Set(["Accepted", "Superseded", "Deprecated"]);

const errors = [];

function addError(message) {
  errors.push(message);
}

function parseSectionValue(content, heading) {
  const pattern = new RegExp(`^## ${heading}\\s*\\r?\\n\\s*\\r?\\n([^\\r\\n]+)`, "m");
  return content.match(pattern)?.[1]?.trim();
}

function normalizePathForMarkdown(fileName) {
  return `./${fileName}`;
}

function parseIndexRows(indexContent) {
  const rows = [];
  const lines = indexContent.split(/\r?\n/);

  for (const line of lines) {
    if (!line.startsWith("|")) {
      continue;
    }

    const cells = line
      .slice(1, line.endsWith("|") ? -1 : undefined)
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length !== 4) {
      continue;
    }

    if (cells[0] === "ADR" || cells.every((cell) => /^-+$/.test(cell))) {
      continue;
    }

    rows.push({
      adr: cells[0],
      currentStatus: cells[1],
      date: cells[2],
      relation: cells[3],
    });
  }

  return rows;
}

const entries = await readdir(adrDir, { withFileTypes: true });
const adrFiles = entries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((fileName) => fileName !== "README.md" && fileName !== "index.md")
  .sort();

const seenNumbers = new Map();

for (const fileName of adrFiles) {
  const match = fileName.match(adrFilePattern);

  if (!match?.groups) {
    addError(`ADR file name must be zero-padded kebab case: ${fileName}`);
    continue;
  }

  const number = match.groups.number;
  if (seenNumbers.has(number)) {
    addError(`ADR number ${number} is used by both ${seenNumbers.get(number)} and ${fileName}`);
  }
  seenNumbers.set(number, fileName);

  const content = await readFile(path.join(adrDir, fileName), "utf8");
  const firstHeading = content.match(/^# ADR (?<number>\d{4}): .+$/m);

  if (!firstHeading?.groups) {
    addError(`${fileName} must start with a '# ADR ${number}: ...' heading`);
  } else if (firstHeading.groups.number !== number) {
    addError(`${fileName} heading number ${firstHeading.groups.number} does not match file number ${number}`);
  }

  const status = parseSectionValue(content, "상태");
  if (!status) {
    addError(`${fileName} must include '## 상태' with a value`);
  }

  const date = parseSectionValue(content, "날짜");
  if (!date) {
    addError(`${fileName} must include '## 날짜' with a value`);
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    addError(`${fileName} date must use YYYY-MM-DD format`);
  }
}

const indexFileName = "index.md";
const indexContent = await readFile(path.join(adrDir, indexFileName), "utf8");
const rows = parseIndexRows(indexContent);
const indexLinks = new Map();

for (const row of rows) {
  const linkMatch = row.adr.match(/\[[^\]]+\]\((?<href>[^)]+)\)/);

  if (!linkMatch?.groups) {
    addError(`ADR index row must link to an ADR file: ${row.adr}`);
    continue;
  }

  const href = linkMatch.groups.href;
  if (indexLinks.has(href)) {
    addError(`ADR index links to ${href} more than once`);
  }
  indexLinks.set(href, row);

  if (!allowedCurrentStatuses.has(row.currentStatus)) {
    addError(`ADR index uses unsupported current status '${row.currentStatus}' for ${href}`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) {
    addError(`ADR index date for ${href} must use YYYY-MM-DD format`);
  }
}

for (const fileName of adrFiles) {
  const href = normalizePathForMarkdown(fileName);
  if (!indexLinks.has(href)) {
    addError(`ADR index is missing ${href}`);
  }
}

for (const href of indexLinks.keys()) {
  if (!href.startsWith("./")) {
    addError(`ADR index link must be relative with './': ${href}`);
    continue;
  }

  const fileName = href.slice(2);
  if (!adrFiles.includes(fileName)) {
    addError(`ADR index links to missing ADR file: ${href}`);
  }
}

if (errors.length > 0) {
  console.error("ADR validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`ADR validation passed (${adrFiles.length} ADR${adrFiles.length === 1 ? "" : "s"}).`);
