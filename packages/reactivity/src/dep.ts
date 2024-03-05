import { ReactiveEffect } from './effect'

export type Dep = Set<ReactiveEffect>

/**
 * 依据 effects 生成 effectSets 实例
 */
export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const effectSets = new Set<ReactiveEffect>(effects) as Dep
  return effectSets
}
