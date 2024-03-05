import { isArray } from '@vue/shared'
import { ReactiveEffectSets, createEffectSets } from './dep'

/**
 * 收集所有依赖的 WeakMap 实例：
 * 1. `key`：响应性对象
 * 2. `value`：`Map` 对象
 * 		1. `key`：响应性对象的指定属性
 * 		2. `value`：指定对象的指定属性的 执行函数 Set对象
 */
const targetMap = new WeakMap<any, Map<any, ReactiveEffectSets>>()

export function track(target: object, key: string | symbol) {
  // 如果当前不存在执行函数，直接return
  if (!activeEffect) return
  // 尝试根据 target 从 targetMap 中获取map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 不存在，则生成新的 map 对象，并把该对象赋值给对应的 value
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createEffectSets()))
  }
  trackEffects(dep)
}
function trackEffects(effects: ReactiveEffectSets) {
  effects.add(activeEffect!)
}

export function trigger(target: object, key: string | symbol, value: unknown) {
  // 依据 target 从 targetMap 中获取存储的 map 实例
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  // 依据指定的 key，获取 dep 实例
  let dep: ReactiveEffectSets | undefined = depsMap.get(key)
  // dep 不存在则直接 return
  if (!dep) {
    return
  }
  // 触发 effects
  triggerEffects(dep)
}
function triggerEffects(dep: ReactiveEffectSets) {
  const effects = isArray(dep) ? dep : [...dep]
  for (const effect of effects) {
    effect.run()
  }
}

/**
 * 单例的，当前激活的 effect
 */
export let activeEffect: ReactiveEffect | undefined
/**
 * 响应性触发依赖时的执行类
 */
export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run() {
    // 为 activeEffect 赋值
    activeEffect = this

    return this.fn()
  }
}
/**
 * effect 函数
 * @param fn 执行方法
 * @returns 以 ReactiveEffect 实例为 this 的执行函数
 */
export function effect<T = any>(fn: () => T) {
  // 生成 ReactiveEffect 实例
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
