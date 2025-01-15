export class Container {
  private static services: Map<string, any> = new Map();

  static register<T>(key: string, instance: T): void {
    if (!this.services.has(key)) {
      this.services.set(key, instance);
    }
  }

  static get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found in container`);
    }
    return service;
  }
}
