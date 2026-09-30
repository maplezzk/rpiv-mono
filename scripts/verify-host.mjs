import assert from "node:assert/strict";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DefaultResourceLoader, SettingsManager } from "@earendil-works/pi-coding-agent";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const host = realpathSync(join(root, "node_modules/@earendil-works/pi-coding-agent"));
for (const name of ["rpiv-config", "rpiv-ask-user-question"]) {
	const manifest = JSON.parse(readFileSync(join(root, "packages", name, "package.json"), "utf8"));
	assert.equal(manifest.dependencies?.typebox, undefined);
	assert.equal(manifest.peerDependencies.typebox, "*");
}
assert.equal(realpathSync(join(root, "node_modules/typebox")), realpathSync(join(host, "node_modules/typebox")));
assert.equal(
	realpathSync(join(root, "node_modules/@juicesharp/rpiv-config")),
	realpathSync(join(root, "packages/rpiv-config")),
);
const loader = new DefaultResourceLoader({
	cwd: root,
	agentDir: root,
	settingsManager: SettingsManager.inMemory(),
	noExtensions: true,
	noSkills: true,
	noThemes: true,
	noPromptTemplates: true,
	noContextFiles: true,
	additionalExtensionPaths: [join(root, "packages/rpiv-ask-user-question")],
});
await loader.reload();
const result = loader.getExtensions();
assert.deepEqual(result.errors, []);
assert.deepEqual(result.warnings ?? [], []);
assert.equal(result.extensions.length, 1);
assert.ok(result.extensions[0].tools.has("ask_user_question"));
console.log("Host peers, local config dependency and warning-free tool registration verified.");
