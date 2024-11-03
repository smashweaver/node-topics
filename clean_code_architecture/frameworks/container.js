export class Container {
  constructor() {
    /** @type {Map<string, Function>} */
    this.services = new Map();

    /** @type {Map<string, any>} */
    this.instances = new Map();
  }

  /**
   * @param {string} name
   * @param {Function} factory
   * @param {boolean} [singleton=true] - Whether to cache the instance
   */
  register(name, factory, singleton = true) {
    this.services.set(name, { factory, singleton });
  }

  /**
   * @param {string} name
   * @returns {any}
   */
  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not registered`);
    }

    const { factory, singleton } = service;

    if (singleton) {
      let instance = this.instances.get(name);
      if (!instance) {
        instance = factory(this);
        this.instances.set(name, instance);
      }
      return instance;
    }

    return factory(this);
  }

  /**
   * Clear all cached instances
   */
  clear() {
    this.instances.clear();
  }
}
