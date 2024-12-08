import { AppContract } from "./app/application.js";
import { Container } from "./di/container.js";
import { Registry } from "./di/registry.js";
import { SYMBOLS } from "./constants.js";

function main() {
  const container = new Container();
  const registry = new Registry(container);
  registry.init();

  /** @type {AppContract} */
  const app = container.resolve(SYMBOLS.App);

  return app.start();
}

main().catch((error) => {
  console.error("Application failed to start:", error);
  process.exit(1);
});
