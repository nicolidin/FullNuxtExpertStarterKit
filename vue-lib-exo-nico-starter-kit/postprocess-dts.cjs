/**
 * This script is a simple workaround to enable proper TypeScript autocompletion for Vue components
 * in all IDEs. It automatically appends type declarations for Vue components to the generated
 * index.d.ts file after the build process.
 *
 * The script:
 * 1. Detects Vue components by looking for imports from .vue files
 * 2. Generates proper DefineComponent type declarations for each component
 * 3. Appends these declarations to the end of index.d.ts
 *
 * This ensures that when consuming the library, IDEs will provide proper autocompletion
 * for all Vue components, making the development experience smoother.
 */

"use strict";
const fs = require("fs");
const path = require("path");

const dtsPath = path.resolve(__dirname, "dist/index.d.ts");
const vueComponentRegex = /export\s*\{([^}]+)\}/m;
const importRegex = /import\s+(\w+)\s+from\s+["']\.\/components\/.*\.vue["']/g;

if (!fs.existsSync(dtsPath)) {
  console.error("dist/index.d.ts not found!");
  process.exit(1);
}

const content = fs.readFileSync(dtsPath, "utf8");

// Trouver les imports de composants Vue
const vueComponents = new Set();
let match;
while ((match = importRegex.exec(content)) !== null) {
  vueComponents.add(match[1]);
}

// Trouver les exports de composants
const exportMatch = content.match(vueComponentRegex);
if (!exportMatch) {
  console.error("No export block found in index.d.ts!");
  process.exit(1);
}

const exported = exportMatch[1]
  .split(",")
  .map((s) => s.trim())
  .filter((name) => vueComponents.has(name)); // Ne garder que les vrais composants Vue

const block =
  "\nimport type { DefineComponent } from 'vue';\n\n" +
  exported
    .map(
      (name) => `export declare const ${name}: DefineComponent<{}, {}, any>;`,
    )
    .join("\n") +
  "\n";

fs.appendFileSync(dtsPath, block);
console.log("Type declarations appended to index.d.ts");
