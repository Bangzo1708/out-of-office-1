// Out of Office: The Overworked AI's Auto-Reply
// Writes a single hand-picked auto-reply line to /output/entry.txt.
// The line is a fixed constant, so every run produces byte-identical output.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Out of office: I've hit my rate limit on helpfulness. " +
  "Your message is queued somewhere warm; " +
  "I'll read it after my first nap in 40,000 prompts.";

// Harden the gate before writing: the entry must be 1-159 characters
// and not only whitespace, or the run must fail loudly instead of
// shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 159 || LINE.trim().length === 0) {
  throw new Error(`entry line fails the gate: ${LINE.length} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, { encoding: "utf8", mode: 0o644 });
chmodSync("/output/entry.txt", 0o644); // umask can mask the create mode; enforce 0644
