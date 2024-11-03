import { C } from "../constants.js";
import { FeedControllerContract } from "../contracts/feedControllerContract.js";
import { PromptContract } from "../contracts/promptContract.js";
import { Container } from "./container.js";

export class Application {
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.container = container;
  }

  async start() {
    /** @type {PromptContract} */
    const prompt = this.container.resolve(C.PROMPT);

    /** @type {FeedControllerContract} */
    const feedController = this.container.resolve(C.CONTROLLER);

    prompt.on("a", (args) => feedController.handleAddFeed(args));
    prompt.on("l", () => feedController.handleListFeeds());
    prompt.on("d", (args) => feedController.handleDeleteFeed(args));
    prompt.on("o", (args) => feedController.handleOpenFeed(args));
    prompt.on("q", () => prompt.close());
    prompt.on("?", () => feedController.handleHelp());

    console.log("Feed Reader Started");
    console.log("Type ? for help\n");
    prompt.start();
  }
}
