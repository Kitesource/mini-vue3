import { NodeTypes } from "./ast"

/**
 * 解析器上下文
 */
export interface ParserContext {
	// 模板数据源
	source: string
}

/**
 * 创建解析器上下文
 */
function createParserContext(content: string): ParserContext {
	// 合成 context 上下文对象
	return {
		source: content
	}
}

/**
 * 生成 root 节点
 */
export function createRoot(children) {
	return {
		type: NodeTypes.ROOT,
		children,
		// loc：位置，这个属性并不影响渲染，但是它必须存在，否则会报错。所以我们给了他一个 {}
		loc: {}
	}
}

/**
 * 解析子节点
 * @param context 上下文
 * @param mode 文本模型
 * @param ancestors 祖先节点
 * @returns
 */
function parseChildren(context: ParserContext, ancestors) {
	// 存放所有 node节点数据的数组
	const nodes = []

	return nodes
}

/**
 * 基础的 parse 方法，生成 AST
 * @param content tempalte 模板
 * @returns
 */
export function baseParse(content: string) {
	// 创建 parser 对象，未解析器的上下文对象
	const context = createParserContext(content)
	const children = parseChildren(context, [])
	return createRoot(children)
}
