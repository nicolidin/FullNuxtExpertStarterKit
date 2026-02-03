#!/usr/bin/env node
/**
 * Script: remplace toutes les occurrences d'un texte dans le repo
 * ET renomme les fichiers/dossiers dont le nom contient ce texte.
 *
 * Usage:
 *   node scripts/rename-occurrences.js <ancien_texte> <nouveau_texte> [racine]
 *   node scripts/rename-occurrences.js --dry-run <ancien_texte> <nouveau_texte> [racine]
 *
 * Exemple:
 *   node scripts/rename-occurrences.js vue-lib-exo-starter-kit vue-lib-exo-starter-kit
 *   node scripts/rename-occurrences.js --dry-run vue-lib-exo-starter-kit vue-lib-exo-starter-kit
 */

const fs = require("fs");
const path = require("path");

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  ".yarn",
  "dist",
  ".tmp",
  ".nuxt",
  ".output",
  "coverage",
  ".cache",
]);

const SKIP_FILES = new Set([".env", "yarn.lock", "package-lock.json", "install-state.gz", "rename-occurrences.js"]);

const TEXT_EXTENSIONS = new Set([
  "js",
  "ts",
  "vue",
  "json",
  "md",
  "scss",
  "css",
  "html",
  "yml",
  "yaml",
  "xml",
  "txt",
  "cjs",
  "mjs",
  "tsx",
  "jsx",
  "config",
  "jsonc",
]);

function isTextFile(filePath) {
  const ext = path.extname(filePath).replace(/^\./, "").toLowerCase();
  return TEXT_EXTENSIONS.has(ext) || ext === "";
}

function getAllEntries(dir, baseDir, entries = []) {
  const fullDir = baseDir ? path.join(baseDir, dir) : dir;
  let names;
  try {
    names = fs.readdirSync(fullDir);
  } catch (e) {
    return entries;
  }
  for (const name of names) {
    const fullPath = path.join(fullDir, name);
    const relPath = path.relative(baseDir || ".", fullPath);
    if (SKIP_FILES.has(name)) continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      entries.push({ fullPath, relPath, isDir: true });
      getAllEntries(path.join(dir, name), baseDir, entries);
    } else {
      entries.push({ fullPath, relPath, isDir: false });
    }
  }
  return entries;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args[0] === "--dry-run";
  if (dryRun) args.shift();
  const oldStr = args[0];
  const newStr = args[1];
  const root = path.resolve(args[2] || ".");

  if (!oldStr || !newStr) {
    console.error("Usage: node rename-occurrences.js [--dry-run] <ancien_texte> <nouveau_texte> [racine]");
    process.exit(1);
  }

  if (dryRun) console.log("*** MODE DRY-RUN (aucune modification) ***\n");

  if (oldStr === newStr) {
    console.log("Ancien et nouveau texte identiques, rien à faire.");
    process.exit(0);
  }

  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    console.error("Racine invalide:", root);
    process.exit(1);
  }

  console.log("Remplacement:", JSON.stringify(oldStr), "->", JSON.stringify(newStr));
  console.log("Racine:", root);
  console.log("");

  const allEntries = getAllEntries(".", root);
  let contentCount = 0;
  let contentFiles = [];

  // 1) Remplacer dans le contenu des fichiers (fichiers texte uniquement)
  for (const { fullPath, isDir } of allEntries) {
    if (isDir) continue;
    if (!isTextFile(fullPath)) continue;
    try {
      const content = fs.readFileSync(fullPath, "utf8");
      if (!content.includes(oldStr)) continue;
      contentCount++;
      contentFiles.push(path.relative(root, fullPath));
      if (!dryRun) {
        const newContent = content.split(oldStr).join(newStr);
        fs.writeFileSync(fullPath, newContent, "utf8");
      }
    } catch (e) {
      console.warn("Erreur lecture/écriture:", fullPath, e.message);
    }
  }

  if (contentFiles.length) {
    console.log("Contenu modifié dans", contentCount, "fichier(s):");
    contentFiles.forEach((f) => console.log("  -", f));
    console.log("");
  }

  // 2) Renommages en deux temps pour éviter ENOENT :
  // 2a) Fichiers/dossiers dont le NOM (dernier segment) contient oldStr → renommer du plus profond au plus court.
  // 2b) "Segments minimaux" (premier segment du chemin qui contient oldStr) → renommer le dossier racine, tout le contenu suit.
  const entriesWithOld = allEntries.filter((e) => e.relPath.includes(oldStr));
  const sep = path.sep;

  // 2a) Basename contient oldStr (ex: .../vue-lib-exo-starter-kit.scss → .../vue-lib-expert-starter-kit.scss)
  const byBasename = entriesWithOld.filter((e) => {
    const segments = e.relPath.split(sep);
    return segments[segments.length - 1].includes(oldStr);
  });
  const sortedByBasename = byBasename
    .map((e) => e.relPath)
    .filter((relPath) => {
      const segments = relPath.split(sep);
      const newBasename = segments[segments.length - 1].split(oldStr).join(newStr);
      return newBasename !== segments[segments.length - 1];
    })
    .sort((a, b) => b.length - a.length);

  if (sortedByBasename.length > 0) {
    console.log("Renommage de", sortedByBasename.length, "fichier(s)/dossier(s) (nom contient le texte):");
    for (const relPath of sortedByBasename) {
      const segments = relPath.split(sep);
      const newBasename = segments[segments.length - 1].split(oldStr).join(newStr);
      const newRelPath = segments.slice(0, -1).concat(newBasename).join(sep);
      const fullPath = path.join(root, relPath);
      const newFullPath = path.join(root, newRelPath);
      if (dryRun) {
        console.log("  ", relPath, "->", newRelPath);
      } else {
        try {
          if (!fs.existsSync(fullPath)) {
            console.warn("  Ignoré (déjà renommé?):", relPath);
            continue;
          }
          fs.renameSync(fullPath, newFullPath);
          console.log("  ", relPath, "->", newRelPath);
        } catch (e) {
          console.error("  ERREUR:", relPath, e.message);
        }
      }
    }
    console.log("");
  }

  // 2b) Segments minimaux (ex: dossier racine vue-lib-exo-starter-kit → vue-lib-expert-starter-kit)
  const minimalRenames = new Set();
  for (const { relPath } of entriesWithOld) {
    const segments = relPath.split(sep);
    let prefix = [];
    for (const seg of segments) {
      prefix.push(seg);
      if (seg.includes(oldStr)) break;
    }
    const minimalRel = prefix.join(sep);
    const newMinimalRel = minimalRel.split(oldStr).join(newStr);
    if (newMinimalRel !== minimalRel) minimalRenames.add(minimalRel);
  }
  const sortedMinimal = Array.from(minimalRenames).sort((a, b) => a.length - b.length);

  if (sortedMinimal.length > 0) {
    console.log("Renommage de", sortedMinimal.length, "dossier(s) racine:");
    for (const relPath of sortedMinimal) {
      const newRelPath = relPath.split(oldStr).join(newStr);
      const fullPath = path.join(root, relPath);
      const newFullPath = path.join(root, newRelPath);
      if (relPath === newRelPath) continue;
      if (dryRun) {
        console.log("  ", relPath, "->", newRelPath);
      } else {
        try {
          if (!fs.existsSync(fullPath)) {
            console.warn("  Ignoré (déjà renommé?):", relPath);
            continue;
          }
          fs.renameSync(fullPath, newFullPath);
          console.log("  ", relPath, "->", newRelPath);
        } catch (e) {
          console.error("  ERREUR:", relPath, e.message);
        }
      }
    }
  }

  if (sortedByBasename.length === 0 && sortedMinimal.length === 0) {
    console.log("Aucun fichier ou dossier à renommer.");
  }
}

main();
