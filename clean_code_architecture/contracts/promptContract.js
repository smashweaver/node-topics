export class PromptContract {
  /**
   * Register a command handler
   * @param {string} command - Single character command
   * @param {Function} handler - Function to handle the command
   */
  on(command, handler) {
    throw new Error("Not implemented");
  }

  /**
   * Start listening for commands
   */
  start() {
    throw new Error("Not implemented");
  }

  /**
   * Stop listening and cleanup
   */
  close() {
    throw new Error("Not implemented");
  }
}
