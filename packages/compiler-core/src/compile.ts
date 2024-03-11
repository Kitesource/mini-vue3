import { baseParse } from "./parse";

export function baseCompile(template: string, options = {}) {
  const ast = baseParse(template.trim())
  console.log('ast', ast)
  return ast
}