# mini-vue3

## Introduction

本项目跟踪并且实现了vue 3.2 的核心逻辑， 实现了`1．响应性`，`2．运行时` `3．编辑器`, 三大核心模块中的部分功能，并且最后把这三大模块进行了合并生成`createApp` 函数。
项目中去除了源码中有很多用于处理边缘情况或者兼容处理的逻辑，代码命名保持和源码中的一致，帮助更轻松的理解 vue3 的核心逻辑。

## Project Setup

### 使用 [Pnpm](https://pnpm.io/zh/) 作为管理工具

```sh
pnpm install
```

## Compiles and hot-reloads for development

```sh
pnpm dev
```

## build

```sh
pnpm build
```

## Catalog

- `compiler-core`
- `compiler-dom`
- `reactivity`
- `runtime-core`
- `shared`
- `vue`
- `vue-compact`
