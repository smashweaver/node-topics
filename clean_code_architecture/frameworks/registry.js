import { ConsolePrompt } from "../adapters/consolePrompt.js";
import { FeedController } from "../adapters/feedController.js";
import { FeedRepository } from "../adapters/feedRepository.js";
import { FileStorage } from "../adapters/fileStorage.js";
import { config } from "../config.js";
import { C } from "../constants.js";
import { AddFeedUseCase } from "../usecases/addFeedUseCase.js";
import { DeleteFeedUseCase } from "../usecases/deleteFeedUseCase.js";
import { ListFeedsUseCase } from "../usecases/listFeedsUseCase.js";
import { OpenFeedUseCase } from "../usecases/openFeedUseCase.js";
import { Container } from "./container.js";

export class Registry {
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.container = container;
  }

  registerServices() {
    // Config - singleton
    this.container.register(C.CONFIG, () => config);

    // Storage - singleton
    this.container.register(C.STORAGE, (container) => {
      const config = container.resolve(C.CONFIG);
      return new FileStorage(config.file);
    });

    // Repository - singleton with injected storage
    this.container.register(C.REPOSITORY, (container) => {
      const storage = container.resolve(C.STORAGE);
      return new FeedRepository(storage);
    });

    // Use cases - singletons since they're stateless
    this.container.register("AddFeedUseCase", (container) => {
      const repository = container.resolve(C.REPOSITORY);
      return new AddFeedUseCase(repository);
    });

    this.container.register("ListFeedsUseCase", (container) => {
      const repository = container.resolve(C.REPOSITORY);
      return new ListFeedsUseCase(repository);
    });

    this.container.register("DeleteFeedUseCase", (container) => {
      const repository = container.resolve(C.REPOSITORY);
      return new DeleteFeedUseCase(repository);
    });

    this.container.register("OpenFeedUseCase", (container) => {
      const repository = container.resolve(C.REPOSITORY);
      return new OpenFeedUseCase(repository);
    });

    // Controller - singleton
    this.container.register(C.CONTROLLER, (container) => {
      return new FeedController(
        container.resolve("AddFeedUseCase"),
        container.resolve("ListFeedsUseCase"),
        container.resolve("DeleteFeedUseCase"),
        container.resolve("OpenFeedUseCase"),
      );
    });

    // Prompt - singleton
    this.container.register(C.PROMPT, () => {
      // return new ConsolePrompt();
      const prompt = new ConsolePrompt();
      const controller = this.container.resolve(C.CONTROLLER);

      prompt.on("a", (args) => controller.handleAddFeed(args));
      prompt.on("l", () => controller.handleListFeeds());
      prompt.on("d", (args) => controller.handleDeleteFeed(args));
      prompt.on("o", (args) => controller.handleOpenFeed(args));
      prompt.on("?", () => controller.handleHelp());
      prompt.on("q", () => prompt.close());

      return prompt;
    });
  }
}
