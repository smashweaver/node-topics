import { FeedRepositoryContract } from "../interfaces/feedRepositoryContract.js";

export class ListFeedsUseCase {
  /**
   * @param {FeedRepositoryContract} feedRepository
   */
  constructor(feedRepository) {
    this.feedRepository = feedRepository;
  }

  async execute() {
    return this.feedRepository.findAll();
  }
}
