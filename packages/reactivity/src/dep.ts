import { ReactiveEffect } from './effect'

export type ReactiveEffectSets = Set<ReactiveEffect>

/**
 * 依据 effects 生成 effectSets 实例
 */
export const createEffectSets = (
  effects?: ReactiveEffect[]
): ReactiveEffectSets => {
  const effectSets = new Set<ReactiveEffect>(effects) as ReactiveEffectSets
  return effectSets
}
