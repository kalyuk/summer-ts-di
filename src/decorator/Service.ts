import { registry, RegistryScopeType } from '../Registry';

export function Service<T>(target: T): T {
  registry.register(target, RegistryScopeType.singleton);
  return target;
}