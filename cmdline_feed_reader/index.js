import { EventEmitter } from "node:events";
import { AddFeed } from "./commands/add.js";
import { DeleteFeed } from "./commands/delete.js";
import { ListFeeds } from "./commands/list.js";
import { OpenFeed } from "./commands/open.js";
import { USAGE } from "./constants.js";
import { usePrompt } from "./prompt.js";

function repl() {
  const { close, prompt, onNewLine } = usePrompt("Enter a command");
  const emitter = new EventEmitter();

  emitter.on("q", () => {
    console.log("\n  goodbye!\n");
    close();
  });

  emitter.on("?", () => {
    console.log(`${USAGE}\n`);
    prompt();
  });

  emitter.on("l", async () => {
    await ListFeeds();
    prompt();
  });

  emitter.on("o", async (...args) => {
    await OpenFeed(...args);
    prompt();
  });

  emitter.on("a", async (...args) => {
    await AddFeed(...args);
    prompt();
  });

  emitter.on("d", async (...args) => {
    await DeleteFeed(...args);
    prompt();
  });

  emitter.on("", async (...args) => {
    console.log(`\n  Type '?' for usage\n`);
    prompt();
  });

  onNewLine((input) => {
    const [cmd, ...args] = input.trim().split(/\s+/);
    if (["q", "?", "l", "o", "a", "d"].includes(cmd)) {
      emitter.emit(cmd, args);
    } else {
      emitter.emit("");
    }
  });

  console.log(`A simple command line tool`);
  console.log(`${USAGE}\n`);
  prompt();
}

repl();
