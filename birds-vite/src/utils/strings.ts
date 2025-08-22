import { mapKeys, camelCase } from 'lodash-es';

export const normalize = <T>(obj: Record<string, unknown>): T =>
  mapKeys(obj, (_val, key) => camelCase(key)) as T
