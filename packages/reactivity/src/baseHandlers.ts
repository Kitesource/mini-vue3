const get = (target: object, key: string | symbol, receiver: object) => {
  console.log('get', target, key)
}

const set = (
  target: object,
  key: string | symbol,
  value: unknown,
  receiver: object
) => {
  console.log('set', target, key, value)
  return true
}

/**
 * 响应性的 handler
 */
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}
