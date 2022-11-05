# Forta - Metamask Snap

This Snap calls Forta APIs to verify the safety of a transaction.

This was adopted from https://github.com/MetaMask/template-snap-monorepo

## Notes

- Babel is used for transpiling TypeScript to JavaScript, so when building with the CLI,
  `transpilationMode` must be set to `localOnly` (default) or `localAndDeps`.
- For the global `wallet` type to work, you have to add the following to your `tsconfig.json`:
  ```json
  {
    "files": ["./node_modules/@metamask/snap-types/global.d.ts"]
  }
  ```
