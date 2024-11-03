import { FeedRepositoryContract } from "../contracts/feedRepositoryContract.js";
import { StorageContract } from "../contracts/storageContract.js";
import { Feed } from "../entities/feed.js";

export class FeedRepository extends FeedRepositoryContract {
  /**
   * @param {StorageContract} storage
   */
  constructor(storage) {
    super();
    this.storage = storage;
  }

  /**
   * @param {Feed} feed
   */
  async save(feed) {
    const feeds = await this.findAll();
    feeds.push({
      id: feed.id,
      url: feed.url,
      createdAt: feed.createdAt.toISOString(),
    });
    await this.storage.writeLinks(feeds);
    return feed;
  }

  /**
   * @returns {Promise<Feed[]>}
   */
  async findAll() {
    const feeds = await this.storage.readLinks();
    return feeds.map((feed) => new Feed(feed.id, feed.url, new Date(feed.createdAt)));
  }

  /**
   * @param {string} id
   * @returns {Promise<Feed|null>}
   */
  async findById(id) {
    const feeds = await this.findAll();
    const feed = feeds.find((f) => f.id === id);
    return feed || null;
  }

  /**
   * @param {string} id
   */
  async delete(id) {
    const feeds = await this.findAll();
    const filtered = feeds.filter((feed) => feed.id !== id);
    await this.storage.writeLinks(filtered);
  }
}
