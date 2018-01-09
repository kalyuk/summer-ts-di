import { registry, RegistryScopeType } from '../Registry';

export function Factory<T>(target: T): T {
  registry.register(target, RegistryScopeType.factory);
  return target;
}