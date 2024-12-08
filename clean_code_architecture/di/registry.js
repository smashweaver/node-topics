import { App } from "../app/application.js";
import { CommandRegistry, CommandRegistryContract } from "../app/commandRegistry.js";
import { ConsoleUI, UIContract } from "../app/consoleUI.js";
import { config } from "../config.js";
import { SYMBOLS } from "../constants.js";
import { AddFeedUseCase } from "../core/application/usecases/addFeedUseCase.js";
import { DeleteFeedUseCase } from "../core/application/usecases/deleteFeedUseCase.js";
import { ListFeedsUseCase } from "../core/application/usecases/listFeedsUseCase.js";
import { OpenFeedUseCase } from "../core/application/usecases/openFeedUseCase.js";
import { FeedRepository } from "../core/infrastructure/feedRepository.js";
import { FileStorage } from "../core/infrastructure/fileStorage.js";
import { FeedController } from "../core/interface-adapters/feedController.js";
import { FeedControllerContract } from "../core/interface-adapters/feedControllerContract.js";
import { Container } from "./container.js";

export class Registry {
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.container = container;
  }

  init() {
    // Config - singleton
    this.container.register(SYMBOLS.Config, () => config);

    // Storage - singleton
    this.container.register(SYMBOLS.Storage, (container) => {
      const config = container.resolve(SYMBOLS.Config);
      return new FileStorage(config.filePath);
    });

    // Repository - singleton with injected storage
    this.container.register(SYMBOLS.FeedRepository, (container) => {
      const storage = container.resolve(SYMBOLS.Storage);
      return new FeedRepository(storage);
    });

    // Use cases - singletons since they're stateless
    this.container.register(SYMBOLS.AddFeedUseCase, (container) => {
      const repository = container.resolve(SYMBOLS.FeedRepository);
      return new AddFeedUseCase(repository);
    });

    this.container.register(SYMBOLS.ListFeedsUseCase, (container) => {
      const repository = container.resolve(SYMBOLS.FeedRepository);
      return new ListFeedsUseCase(repository);
    });

    this.container.register(SYMBOLS.DeleteFeedUseCase, (container) => {
      const repository = container.resolve(SYMBOLS.FeedRepository);
      return new DeleteFeedUseCase(repository);
    });

    this.container.register(SYMBOLS.OpenFeedUseCase, (container) => {
      const repository = container.resolve(SYMBOLS.FeedRepository);
      return new OpenFeedUseCase(repository);
    });

    // Controller - singleton
    this.container.register(SYMBOLS.FeedController, (container) => {
      return new FeedController(
        container.resolve(SYMBOLS.UI),
        container.resolve(SYMBOLS.AddFeedUseCase),
        container.resolve(SYMBOLS.ListFeedsUseCase),
        container.resolve(SYMBOLS.DeleteFeedUseCase),
        container.resolve(SYMBOLS.OpenFeedUseCase),
      );
    });

    this.container.register(SYMBOLS.CommandRegisty, () => {
      return new CommandRegistry();
    });

    this.container.register(SYMBOLS.UI, () => {
      const cmdRegistry = this.container.resolve(SYMBOLS.CommandRegisty);
      return new ConsoleUI(cmdRegistry);
    });

    this.container.register(SYMBOLS.App, () => {
      /** @type {UIContract} */
      const ui = this.container.resolve(SYMBOLS.UI);
      /** @type {CommandRegistryContract} */
      const commands = this.container.resolve(SYMBOLS.CommandRegisty);
      /** @type {FeedControllerContract} */
      const actions = this.container.resolve(SYMBOLS.FeedController);

      return new App(ui, commands, actions);
    });
  }
}
