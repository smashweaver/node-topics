/** @typedef {import('../types').CommandHandler} CommandHandler */

import { UIContract } from "./consoleUI.js";
import { CommandRegistryContract } from "./commandRegistry.js";
import { FeedControllerContract } from "../core/interface-adapters/feedControllerContract.js";

export class AppContract {
  /** @returns {Promise<void>} */
  start() {
    throw new Error("Not implemented");
  }
}

export class App extends AppContract {
  /**
   * @param {UIContract} ui
   * @param {CommandRegistryContract} commands
   * @param {FeedControllerContract} actions
   */
  constructor(ui, commands, actions) {
    super();

    this.ui = ui;

    // register handlers
    commands.register("?", () => actions.handleHelp());
    commands.register("l", () => actions.handleListFeeds());
    commands.register("a", (args) => actions.handleAddFeed(args));
    commands.register("d", (args) => actions.handleDeleteFeed(args));
    commands.register("o", (args) => actions.handleOpenFeed(args));
    commands.register("q", () => {
      ui.print("\n  Goodbye!\n");
      ui.close();
    });
  }

  async start() {
    this.ui.print("Feed Reader Started. Type ? for help\n");
    this.ui.start();
  }
}
