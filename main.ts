import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
copyFileSync("entry.png", outPath);
const size = statSync(outPath).size;
console.log(`wrote ${outPath} (${size} bytes)`);
if (size > 1048576) {
  throw new Error(`entry.png exceeds 1048576 bytes: ${size}`);
}
