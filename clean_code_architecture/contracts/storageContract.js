export class StorageContract {
  /**
   * @returns {Promise<Object[]>}
   */
  async readLinks() {
    throw new Error("Not implemented");
  }

  /**
   * @param {Object[]} links
   * @returns {Promise<void>}
   */
  async writeLinks(links) {
    throw new Error("Not implemented");
  }
}
