import { FeedRepositoryContract } from "../contracts/feedRepositoryContract.js";

export class DeleteFeedUseCase {
  /**
   * @param {FeedRepositoryContract} feedRepository
   */
  constructor(feedRepository) {
    this.feedRepository = feedRepository;
  }

  /**
   * @param {number} index
   */
  async execute(index) {
    const feeds = await this.feedRepository.findAll();
    if (index < 0 || index >= feeds.length) {
      throw new Error("Invalid feed index");
    }
    await this.feedRepository.delete(feeds[index].id);
  }
}
