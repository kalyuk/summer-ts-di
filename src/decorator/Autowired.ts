import { registry } from '../Registry';

export function Autowired(target, key: string) {
  const t = Reflect.getMetadata('design:type', target, key);
  target[key] = registry.get(t);
}