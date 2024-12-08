/** @typedef {import('../types').CommandResult} CommandResult */
/** @typedef {import('../types').CommandHandler} CommandHandler */

export class CommandRegistryContract {
  /**
   * @param {string} command
   * @param {CommandHandler} handler
   * @returns {void}
   */
  register(command, handler) {
    throw new Error("Not implemented");
  }

  /** @param {string} command */
  /** @returns {CommandHandler} handler */
  getHandler(command) {
    throw new Error("Not implemented");
  }
}

export class CommandRegistry extends CommandRegistryContract {
  constructor() {
    super();

    /** @type {Map<string, CommandHandler} */
    this.commands = new Map();
  }

  /**
   * @param {string} command
   * @param {CommandHandler} handler
   * @returns {void}
   */
  register(command, handler) {
    this.commands.set(command, handler);
  }

  /** @param {string} command */
  /** @returns {CommandHandler} handler */
  getHandler(command) {
    return this.commands.get(command);
  }
}
