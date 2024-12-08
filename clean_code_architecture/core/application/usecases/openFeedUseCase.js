import Parser from "rss-parser";
import { FeedRepositoryContract } from "../interfaces/feedRepositoryContract.js";

async function tryParseRssFeed(url) {
  try {
    const parser = new Parser({
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader Bot/1.0)",
      },
      timeout: 5000,
    });

    const rssfeed = await parser.parseURL(url);
    return { rssfeed };
  } catch (error) {
    return { rsserror: `Failed to parse RSS feed from "${url}"` };
  }
}

export class OpenFeedUseCase {
  /**
   * @param {FeedRepositoryContract} feedRepository
   */
  constructor(feedRepository) {
    this.feedRepository = feedRepository;
  }

  /**
   *
   * @param {number} index
   * @param {number} entries
   * @param {function(string):void} printer
   * @returns
   */
  async execute(index, entries, printer) {
    const feeds = await this.feedRepository.findAll();
    if (index < 0 || index >= feeds.length) {
      throw new Error("Invalid feed index");
    }

    const url = feeds[index].url;

    printer(`\n> Opening ${entries} feeds from ${url}`);

    const { rssfeed, rsserror } = await tryParseRssFeed(url);
    return [rssfeed, rsserror];
  }
}
