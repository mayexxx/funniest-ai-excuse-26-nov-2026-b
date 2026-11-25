import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "I didn’t get the math wrong; I was just exploring an alternative universe where 2 plus 2 equals 5 for creative reasons.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
const expectedLength = 119;
const expectedByteLength = 121;
const expectedWordCount = 22;
const expectedLineCount = 1;
const writtenText = readFileSync(join(outputDir, "entry.txt"), "utf8");
const actualLength = [...writtenText].length;
const actualByteLength = Buffer.byteLength(writtenText, "utf8");
const actualWordCount = writtenText.trim() ? writtenText.trim().split(/\s+/).length : 0;
const actualLineCount = writtenText.split(/\r\n|\r|\n/).length;
if (actualLength !== expectedLength || actualByteLength !== expectedByteLength || actualWordCount !== expectedWordCount || actualLineCount !== expectedLineCount || writtenText !== entry) {
  throw new Error(`Entry self-check failed: length expected ${expectedLength}, actual ${actualLength}; bytes expected ${expectedByteLength}, actual ${actualByteLength}; words expected ${expectedWordCount}, actual ${actualWordCount}; lines expected ${expectedLineCount}, actual ${actualLineCount}; exact match expected true, actual ${writtenText === entry}`);
}
