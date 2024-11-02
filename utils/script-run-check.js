export function isScriptRunDirectly(importMetaUrl) {
  return importMetaUrl === `file://${process.argv[1]}`;
}
