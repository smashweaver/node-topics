import { FeedRepositoryContract } from "../contracts/feedRepositoryContract.js";

export class OpenFeedUseCase {
  /**
   * @param {FeedRepositoryContract} feedRepository
   */
  constructor(feedRepository) {
    this.feedRepository = feedRepository;
  }

  /**
   * @param {{ index: number, entries: number }} params
   */
  async execute({ index, entries }) {
    const feeds = await this.feedRepository.findAll();
    if (index < 0 || index >= feeds.length) {
      throw new Error("Invalid feed index");
    }
    return { url: feeds[index].url, entries };
  }
}
