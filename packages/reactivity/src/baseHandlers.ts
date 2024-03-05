import { track, trigger } from './effect'

const get = createGretter()
/**
 * 创建 getter 回调方法
 */
function createGretter() {
  return function get(target: object, key: string | symbol, receiver: object) {
    // 利用Reflect得到返回值
    const res = Reflect.get(target, key, receiver)
    // 收集依赖
    track(target, key)

    return res
  }
}

const set = createSetter()
/**
 * 创建 setter 回调方法
 */
function createSetter() {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ) {
    // 利用 Reflect 设置新值
    const res = Reflect.set(target, key, value, receiver)
    // 触发依赖
    trigger(target, key, value)

    return res
  }
}

/**
 * 响应性的 handler
 */
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}
