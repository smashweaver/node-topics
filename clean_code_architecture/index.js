import { Application } from "./frameworks/application.js";
import { Container } from "./frameworks/container.js";
import { Registry } from "./frameworks/registry.js";

try {
  const container = new Container();
  const registry = new Registry(container);
  registry.registerServices();

  const app = new Application(container);
  app.start();
} catch (error) {
  console.error("Failed to start application:", error);
  process.exit(1);
}
