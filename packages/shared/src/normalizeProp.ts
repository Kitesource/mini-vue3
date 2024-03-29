import { isArray, isObject, isString } from '.'

/**
 * 规范化 class 类，处理 class 的增强
 */
export function normalizeClass(value: unknown): string {
  let res = ''
  // 判断是否为 string，如果是 string 就不需要专门处理
  if (isString(value)) {
    res = value as string
  }
  // 额外的数组增强。官方案例：https://cn.vuejs.org/guide/essentials/class-and-style.html#binding-to-arrays
  else if (isArray(value)) {
    // 循环得到数组中的每个元素，通过 normalizeClass 方法进行迭代处理
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + ' '
      }
    }
  }
  // 额外的对象增强。官方案例：https://cn.vuejs.org/guide/essentials/class-and-style.html#binding-html-classes
  else if (isObject(value)) {
    // for in 获取到所有的 key，这里的 key（name） 即为 类名。value 为 boolean 值
    for (const name in value as object) {
      // 把 value 当做 boolean 来看，拼接 name
      if ((value as object)[name]) {
        res += name + ' '
      }
    }
  }
  // 去左右空格
  return res.trim()
}


export type NormalizedStyle = Record<string, string | number>

export function normalizeStyle(
  value: unknown
): NormalizedStyle | string | undefined {
  if (isArray(value)) {
    const res: NormalizedStyle = {}
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const normalized = isString(item)
        ? parseStringStyle(item)
        : (normalizeStyle(item) as NormalizedStyle)
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key]
        }
      }
    }
    return res
  } else if (isString(value)) {
    return value as string
  } else if (isObject(value)) {
    return value as any
  }
}

const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:(.+)/
export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  cssText.split(listDelimiterRE).forEach(item => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE)
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return ret
}