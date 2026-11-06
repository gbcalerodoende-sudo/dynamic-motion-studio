import assert from "node:assert/strict";
import fs from "node:fs";
const config=JSON.parse(fs.readFileSync("video.config.json","utf8"));
assert.equal(config.words.length,3);
assert.ok(config.headline.length>3);
assert.ok(config.cta.length>3);
assert.ok(["neon","gold","arctic","ember"].includes(config.theme));
const code=fs.readFileSync("src/video/config.ts","utf8");
assert.ok(code.includes("VIDEO_FRAMES=1440"));
for(const f of ["src/video/MotionFilm.tsx","src/video/scenes.tsx","src/studio/StudioApp.tsx","src/studio/studio.css"]) {
 assert.ok(fs.existsSync(f),"Missing "+f);
}
console.log("Configuration and assets structure validated.");
