import { extend, isArray } from '@vue/shared'
import { Dep, createDep } from './dep'
import { ComputedRefImpl } from './computed'

export type EffectScheduler = (...args: any) => any

/**
 * 收集所有依赖的 WeakMap 实例：
 * 1. `key`：响应性对象
 * 2. `value`：`Map` 对象
 * 		1. `key`：响应性对象的指定属性
 * 		2. `value`：指定对象的指定属性的 执行函数 Set对象
 */
const targetMap = new WeakMap<any, Map<any, Dep>>()

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
    depsMap.set(key, (dep = createDep()))
  }
  trackEffects(dep)
}
export function trackEffects(effects: Dep) {
  effects.add(activeEffect!)
}

/**
 * @description: 触发依赖
 * @param {object} target
 * @param {string} key
 * @param {unknown} value
 * @return {*}
 */
export function trigger(target: object, key: string | symbol, value: unknown) {
  // 依据 target 从 targetMap 中获取存储的 map 实例
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  // 依据指定的 key，获取 dep 实例
  let dep: Dep | undefined = depsMap.get(key)
  // dep 不存在则直接 return
  if (!dep) {
    return
  }
  // 触发 effects
  triggerEffects(dep)
}
export function triggerEffects(dep: Dep) {
  const effects = isArray(dep) ? dep : [...dep]
  // 先触发所有的计算属性依赖，再触发所有的非计算属性依赖
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect)
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect)
    }
  }
}
export function triggerEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler()
  } else {
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
  /**
   * 存在该属性，则表示当前的 effect 为计算属性的 effect
   */
  computed?: ComputedRefImpl<T>

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null
  ) { }

  run() {
    // 为 activeEffect 赋值
    activeEffect = this

    return this.fn()
  }

  stop() { }
}


export interface ReactiveEffectOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
}

/**
 * effect 函数
 * @param fn 执行方法
 * @returns 以 ReactiveEffect 实例为 this 的执行函数
 */
export function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions) {
  // 生成 ReactiveEffect 实例
  const _effect = new ReactiveEffect(fn)

  // 存在 options，则合并配置对象
  if (options) {
    extend(_effect, options)
  }

  // 懒执行
  if (!options || !options.lazy) {
    _effect.run()
  }
}
