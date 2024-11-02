import { getLinks, saveLinks } from "./manager.js";
import { usePrompt } from "./prompt.js";
import { ListFeeds } from "./commands/list.js";
import { AddFeed } from "./commands/add.js";
import { USAGE } from "./constants.js";
import { DeleteFeed } from "./commands/delete.js";
import { OpenFeed } from "./commands/open.js";

/* const feeds = await getLinks();
feeds.push("http://www.tutsplus.com");
await saveLinks(feeds);
console.log(feeds);
*/

async function repl() {
  const [prompt, close] = usePrompt("Enter a command");

  console.log(`A simple command line tool`);
  console.log(`${USAGE}\n`);

  try {
    while (true) {
      const input = await prompt();
      const [cmd, ...args] = input.trim().split(/\s+/);

      if (cmd === "quit" || cmd === "q") {
        console.log("\n  goodbye!\n");
        break;
      }

      if (cmd === "help" || cmd === "?") {
        console.log(`${USAGE}\n`);
        continue;
      }

      if (cmd === "list" || cmd === "l") {
        await ListFeeds();
        continue;
      }

      if (cmd === "add") {
        await AddFeed(args);
        continue;
      }

      if (cmd === "del") {
        await DeleteFeed(args);
        continue;
      }

      if (cmd === "open") {
        await OpenFeed(args);
        continue;
      }

      if (cmd !== "") {
        console.log(`\n  Type 'help' or '?' for usage\n`);
      }
    }
  } finally {
    close();
    setTimeout(() => process.exit(0), 100); // hack to force exit
  }
}

repl();
