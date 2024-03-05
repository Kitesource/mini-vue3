import { isObject } from '@vue/shared'
import { mutableHandlers } from './baseHandlers'

/**
 * @description:  响应性 Map 缓存对象
 * key: target
 * value: proxy
 * @return {*}
 */
export const reactiveMap = new WeakMap<object, any>()

/**
 * @description: 为复杂数据类型，创建响应性对象
 * @param {object} target
 * @return {*}
 */
export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(
  target: object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  // 如果该实例已经被代理，则直接读取即可
  const existingProxy = proxyMap.get(target)
  if (existingProxy) return existingProxy

  // 未被代理则生成 proxy 实例
  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}

export function toReactive<T extends unknown>(value: T): T {
  return isObject(value) ? reactive(value as Object) : value
}
