export class Container {
  constructor() {
    /** @type {Map<Symbol, Function>} */
    this.services = new Map();

    /** @type {Map<Symbol, any>} */
    this.instances = new Map();
  }

  /**
   * @param {Symbol} name
   * @param {Function} factory
   * @param {boolean} [singleton=true] - Whether to cache the instance
   */
  register(name, factory, singleton = true) {
    // console.log("register: ", name);
    this.services.set(name, { factory, singleton });
  }

  /**
   * @param {Symbol} name
   * @returns {any}
   */
  resolve(name) {
    // console.log("resolve:", name);
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
}
