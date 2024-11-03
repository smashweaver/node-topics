import { Feed } from "../entities/feed.js";

export class FeedRepositoryContract {
  /**
   * @param {Feed} feed
   */
  async save(feed) {
    throw new Error("Not implemented");
  }

  /**
   * @returns {Promise<Feed[]>}
   */
  async findAll() {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} id
   * @returns {Promise<Feed|null>}
   */
  async findById(id) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    throw new Error("Not implemented");
  }
}
