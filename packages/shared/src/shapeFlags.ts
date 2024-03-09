export const enum ShapeFlags {
  /**
   * type = Element
   */
  ELEMENT = 1,
  /**
   * 函数组件
   */
  FUNCTIONAL_COMPONENT = 1 << 1, // 2
  /**
   * 有状态（响应数据）组件
   */
  STATEFUL_COMPONENT = 1 << 2, // 4
  /**
   * children = Text
   */
  TEXT_CHILDREN = 1 << 3, // 8
  /**
   * children = Array
   */
  ARRAY_CHILDREN = 1 << 4, // 16
  /**
   * children = slot
   */
  SLOTS_CHILDREN = 1 << 5, // 32
  /**
   * 组件：有状态（响应数据）组件 | 函数组件
   */
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}

// 左移赋值运算符（<<=）将变量向左移动指定的位数，并将结果赋值给变量
// let a = 1;
// 00000000000000000000000000000001

// a <<= 2; // 4
// 00000000000000000000000000000100

// a <<= 4; // 16
// 00000000000000000000000000010000
