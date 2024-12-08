export class Feed {
  /**
   * @param {string} id
   * @param {string} url
   * @param {Date} createdAt
   */
  constructor(id, url, createdAt) {
    this.id = id;
    this.url = url;
    this.createdAt = createdAt;
  }

  isValid() {
    try {
      new URL(this.url);
      return true;
    } catch {
      return false;
    }
  }
}
