/** @typedef {import('../../types.js').CommandHandler} CommandHandler */

import { UIContract } from "../../app/consoleUI.js";
import { AddFeedUseCase } from "../application/usecases/addFeedUseCase.js";
import { DeleteFeedUseCase } from "../application/usecases/deleteFeedUseCase.js";
import { ListFeedsUseCase } from "../application/usecases/listFeedsUseCase.js";
import { OpenFeedUseCase } from "../application/usecases/openFeedUseCase.js";
import { FeedControllerContract } from "./feedControllerContract.js";

export class FeedController extends FeedControllerContract {
  /**
   * @param {UIContract} ui
   * @param {AddFeedUseCase} addFeedUseCase
   * @param {ListFeedsUseCase} listFeedsUseCase
   * @param {DeleteFeedUseCase} deleteFeedUseCase
   * @param {OpenFeedUseCase} openFeedUseCase
   */
  constructor(ui, addFeedUseCase, listFeedsUseCase, deleteFeedUseCase, openFeedUseCase) {
    super();
    this.ui = ui;
    this.addFeedUseCase = addFeedUseCase;
    this.listFeedsUseCase = listFeedsUseCase;
    this.deleteFeedUseCase = deleteFeedUseCase;
    this.openFeedUseCase = openFeedUseCase;
  }

  /**
   * @type {CommandHandler}
   * @param {string[]} args
   */
  async handleAddFeed(args) {
    try {
      if (args.length === 0) {
        return [null, "Usage: a <url>"];
      }
      try {
        await this.addFeedUseCase.execute(args[0]);
        return ["Feed added successfully!", null];
      } catch (error) {
        return [null, error.message];
      }
    } catch (error) {
      return [null, error.message];
    }
  }

  /** @type {CommandHandler} */
  async handleListFeeds() {
    try {
      const feeds = await this.listFeedsUseCase.execute();

      if (feeds.length === 0) {
        return ["No feeds found", null];
      }

      this.ui.print("\n  Feeds:");
      feeds.forEach((feed, index) => {
        this.ui.print(`    ${index}: ${feed.url}`);
      });
      this.ui.print("");

      return [null, null];
    } catch (error) {
      return [null, error.message];
    }
  }

  /**
   * @type {CommandHandler}
   * @param {string[]} args
   */
  async handleDeleteFeed(args) {
    try {
      if (args.length === 0) {
        return [, "Usage: d <index>"];
      }

      const index = parseInt(args[0]);
      if (isNaN(index)) {
        return [, "Invalid index"];
      }

      await this.deleteFeedUseCase.execute(index);
      return ["Feed deleted successfully!"];
    } catch (error) {
      return [, error.message];
    }
  }

  /**
   * @type {CommandHandler}
   * @param {string[]} args
   */
  async handleOpenFeed(args) {
    try {
      if (args.length === 0) {
        return [null, "Usage: o <index> [entries]"];
      }

      const index = parseInt(args[0]);
      const entries = args[1] ? parseInt(args[1]) : 5;

      if (isNaN(index) || (args[1] && isNaN(entries))) {
        return [null, "Invalid arguments\n  Usage: o <index> [entries]"];
      }

      /** @type function(string): void */
      const printer = (message) => {
        this.ui.print(message);
      };

      const [feed, error] = await this.openFeedUseCase.execute(index, entries, printer);

      if (!error) {
        this.ui.print("\n" + "=".repeat(60));
        this.ui.print(`Feed: ${feed.title}`);
        this.ui.print(`Description: ${feed.description || "N/A"}`);
        if (feed.link) this.ui.print(`Website: ${feed.link}`);
        this.ui.print("=".repeat(60));

        this.ui.print("\nRecent entries:");

        feed.items.slice(0, entries).forEach((item, i) => {
          this.ui.print(`\n${i + 1}. ${item.title}`);

          const date = item.pubDate || item.isoDate;
          if (date) {
            const formattedDate = new Date(date).toLocaleString();
            this.ui.print(`   Published: ${formattedDate}`);
          }

          if (item.link) this.ui.print(`   Link: ${item.link}`);

          if (item.contentSnippet) {
            const preview = item.contentSnippet.replace(/\s+/g, " ").trim().slice(0, 80);
            this.ui.print(`   Preview: ${preview}${preview.length >= 150 ? "..." : ""}`);
          }
        });
        this.ui.print("");
      }

      return [null, error];
    } catch (error) {
      return [null, error.message];
    }
  }

  /** @type {CommandHandler} */
  async handleHelp() {
    return [
      `
  Usage:
    a <url>             - Add new feed URL
    d <index>           - Delete feed at index
    o <index> [entries] - Open feed at index (default 5 entries)
    l                   - List all feeds
    q                   - Quit
    ?                   - Show this help
    `,
      null,
    ];
  }
}
