import { FeedRepositoryContract } from "../contracts/feedRepositoryContract.js";
import { Feed } from "../entities/feed.js";

export class AddFeedUseCase {
  /**
   * @param {FeedRepositoryContract} feedRepository
   */
  constructor(feedRepository) {
    this.feedRepository = feedRepository;
  }

  /**
   * @param {string} url
   */
  async execute(url) {
    const feed = new Feed(crypto.randomUUID(), url, new Date());

    if (!feed.isValid()) {
      throw new Error("Invalid feed URL");
    }

    await this.feedRepository.save(feed);
    return feed;
  }
}
