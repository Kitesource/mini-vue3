import { NodeTypes } from './ast'

export function isText(node) {
	return node.type === NodeTypes.INTERPOLATION || node.type === NodeTypes.TEXT
}


/**
 * 创建对象表达式节点
 */
export function createObjectExpression(properties) {
	return {
		type: NodeTypes.JS_OBJECT_EXPRESSION,
		loc: {},
		properties
	}
}