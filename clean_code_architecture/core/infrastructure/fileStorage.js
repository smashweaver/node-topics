import { access, constants, readFile, writeFile } from "fs/promises";
import { StorageContract } from "../application/interfaces/storageContract.js";

export class FileStorage extends StorageContract {
  /**
   * @param {string} filePath
   */
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async readLinks() {
    try {
      await access(this.filePath, constants.F_OK);
    } catch {
      await this.writeLinks([]);
    }

    const contents = await readFile(this.filePath, { encoding: "utf8" });
    return JSON.parse(contents || "[]");
  }

  /**
   * @param {Object[]} links
   */
  async writeLinks(links) {
    await writeFile(this.filePath, JSON.stringify(links, null, 2), "utf8");
  }
}
