# Ask-user-question host compatibility fork

Fork: https://github.com/maplezzk/rpiv-mono
Upstream: https://github.com/juicesharp/rpiv-mono at d74b1c99 (2.11.0).

Only `rpiv-ask-user-question` and its shared `rpiv-config` package are changed. Both declare host-provided `typebox` as a `peerDependency` with `*`, preventing a private runtime copy. The monorepo workspace resolves `rpiv-config` to this fork; its published name/range is retained. No npm release is made.

## Runtime installation

Install only the two relevant workspaces without development dependencies or auto-installed host peers:

```sh
npm ci --ignore-scripts --legacy-peer-deps --omit=dev --workspace=@juicesharp/rpiv-ask-user-question --workspace=@juicesharp/rpiv-config
node scripts/link-host.mjs
node scripts/verify-host.mjs
```

Pass `/absolute/path/to/pi-coding-agent` to `link-host.mjs` for a nondefault host location. The script refuses to overwrite another physical host copy.

For development in a separate worktree, use `npm ci --ignore-scripts --legacy-peer-deps` and `npm exec -- vitest run packages/rpiv-ask-user-question packages/rpiv-config`. This uses upstream's pinned development host. Runtime verification above explicitly links the actual installed host and checks warning-free tool registration and the local shared config dependency.

Pi package source: `/Users/zzk/CliProject/rpiv-mono/packages/rpiv-ask-user-question`. Only this extension is enabled, not all the extensions in the monorepo. Use `/reload` or a fresh Pi process after updating it. Fetch/pull this fork manually; `pi update` does not update local-path packages.
