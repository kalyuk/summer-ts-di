import 'reflect-metadata';
export enum RegistryScopeType {
  singleton = 'singleton',
  factory = 'factory'
}

export class Registry {
  private cache = [];
  private targetCache = [];

  public register(target: any, scopeType: RegistryScopeType = RegistryScopeType.factory): number {
    let index = this.targetCache.indexOf(target);
    if (index === -1) {
      index = this.cache.length;
      this.cache.push(null);
      this.targetCache.push(target);
    }

    this.cache[index] = {...this.cache[index], scopeType};

    if (scopeType === RegistryScopeType.singleton) {
      this.cache[index].instance = this.getInstanceFromTarget(target);
    }

    return index;

  }

  public get<T>(target: (new(...args) => T)) {
    if (!target
      || target.name === 'Object'
      || target.name === 'Boolean'
      || target.name === 'String'
      || target.name === 'Number'
    ) {
      return void(0);
    }

    return this.getInstanceFromTarget(target);
  }

  private getInstanceFromTarget<T>(target: (new(...args) => T)) {
    const index = this.targetCache.indexOf(target);

    if (index > -1) {
      const {instance} = this.cache[index];

      if (instance) {
        return instance;
      }
    }

    if (typeof target === 'function' && /^(?:class\s+|function\s+(?:_class|_default))/.test(target.toString())) {
      const params = (Reflect.getMetadata('design:paramtypes', target) || [])
        .map((param) => param ? this.get(param) : void(0));

      const F = target.bind(target);
      return new F(...params);
    }

    return null;
  }
}

export const registry = new Registry();