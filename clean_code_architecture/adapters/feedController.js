import { FeedControllerContract } from "../contracts/feedControllerContract.js";
import { AddFeedUseCase } from "../usecases/addFeedUseCase.js";
import { DeleteFeedUseCase } from "../usecases/deleteFeedUseCase.js";
import { ListFeedsUseCase } from "../usecases/listFeedsUseCase.js";
import { OpenFeedUseCase } from "../usecases/openFeedUseCase.js";

export class FeedController extends FeedControllerContract {
  /**
   * @param {AddFeedUseCase} addFeedUseCase
   * @param {ListFeedsUseCase} listFeedsUseCase
   * @param {DeleteFeedUseCase} deleteFeedUseCase
   * @param {OpenFeedUseCase} openFeedUseCase
   */
  constructor(addFeedUseCase, listFeedsUseCase, deleteFeedUseCase, openFeedUseCase) {
    super();
    this.addFeedUseCase = addFeedUseCase;
    this.listFeedsUseCase = listFeedsUseCase;
    this.deleteFeedUseCase = deleteFeedUseCase;
    this.openFeedUseCase = openFeedUseCase;
  }

  /**
   * @param {string[]} args
   */
  async handleAddFeed(args) {
    try {
      if (args.length === 0) {
        console.log("\n  Usage: a <url>\n");
        return;
      }
      await this.addFeedUseCase.execute(args[0]);
      console.log("\n  Feed added successfully!\n");
    } catch (error) {
      console.error("\n  Error:", error.message, "\n");
    }
  }

  async handleListFeeds() {
    try {
      const feeds = await this.listFeedsUseCase.execute();

      if (feeds.length === 0) {
        console.log("\n  No feeds found\n");
        return;
      }

      console.log("\n  Feeds:");
      feeds.forEach((feed, index) => {
        console.log(`  ${index}: ${feed.url}`);
      });
      console.log("");
    } catch (error) {
      console.error("\n  Error:", error.message, "\n");
    }
  }

  /**
   * @param {string[]} args
   */
  async handleDeleteFeed(args) {
    try {
      if (args.length === 0) {
        console.log("\n  Usage: d <index>\n");
        return;
      }

      const index = parseInt(args[0]);
      if (isNaN(index)) {
        console.log("\n  Invalid index\n");
        return;
      }

      await this.deleteFeedUseCase.execute(index);
      console.log("\n  Feed deleted successfully!\n");
    } catch (error) {
      console.error("\n  Error:", error.message, "\n");
    }
  }

  /**
   * @param {string[]} args
   */
  async handleOpenFeed(args) {
    try {
      if (args.length === 0) {
        console.log("\n  Usage: o <index> [entries]\n");
        return;
      }

      const index = parseInt(args[0]);
      const entries = args[1] ? parseInt(args[1]) : 5;

      if (isNaN(index) || (args[1] && isNaN(entries))) {
        console.log("\n  Invalid arguments\n");
        return;
      }

      const result = await this.openFeedUseCase.execute({ index, entries });
      console.log(`\n  Opening feed: ${result.url}\n  Entries: ${result.entries}\n`);
    } catch (error) {
      console.error("\n  Error:", error.message, "\n");
    }
  }

  handleHelp() {
    console.log(`
  Usage:
    a <url>             - Add new feed URL
    d <index>           - Delete feed at index
    o <index> [entries] - Open feed at index (default 5 entries)
    l                   - List all feeds
    q                   - Quit
    ?                   - Show this help
    `);
  }
}
