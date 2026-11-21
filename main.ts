import { copyFileSync, mkdirSync, openSync, readSync, closeSync, statSync } from "node:fs";
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

// Verify the output is a real PNG: first 8 bytes must be the PNG signature.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const fd = openSync(outPath, "r");
const header = Buffer.alloc(8);
readSync(fd, header, 0, 8, 0);
closeSync(fd);
if (!header.equals(PNG_SIGNATURE)) {
  throw new Error(`entry.png is not a valid PNG (bad signature: ${header.toString("hex")})`);
}
console.log(`verified PNG signature (${header.toString("hex")})`);
