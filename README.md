<p align="center">
    <img src="https://img.shields.io/badge/Vue-3.3.1-brightgreen.svg"/>
    <img src="https://img.shields.io/badge/Vite-4.3.5-green.svg"/>
    <img src="https://img.shields.io/badge/Element Plus-2.3.6-blue.svg"/>
    <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
    <a href="https://gitee.com/youlaiorg" target="_blank">
        <img src="https://img.shields.io/badge/Author-有来开源组织-orange.svg"/>
    </a>
</p>
<p align="center">
 <a target="_blank" href="https://juejin.cn/post/7228990409909108793">vue3-element-admin官方文档</a> |  <a target="_blank" href="http://vue3.youlai.tech">在线预览</a> 
</p>


## 项目介绍

[uniapp-vue-vite-ts](https://gitee.com/lxxlalala/uniapp-vue-vite-ts) 是基于 Vue3 + Vite4+ TypeScript +  uview-plus V3 + Pinia 等最新主流技术栈构建的uniapp前端模板。

项目有以下特性：

- 基于 vue-element-admin 升级到 vue3 版本，无自定义封装，易上手，减少学习成本。
- 提供了配套的 Java 后端接口，真实的接口数据，而非使用 Mock 数据。您可以访问在[线接口文档](https://www.apifox.cn/apidoc/shared-195e783f-4d85-4235-a038-eec696de4ea5)查看接口详情。
- 权限系统功能齐全，包括用户管理、角色管理、菜单管理、字典管理和部门管理等，以满足您对权限管理的需求。
- 项目还提供了基础设施支持，包括动态路由、按钮级别的权限控制、国际化支持、代码规范、Git 提交规范以及常用组件的封装，以便开发人员更高效地开发和维护项目。

## 环境准备

| 环境                 | 名称版本                                                     |
| -------------------- | :----------------------------------------------------------- |
| **开发工具**         | VSCode                                                       |
| **运行环境**         | Node 16+                                                     |
| **VSCode插件(必装)** | 1. `Vue Language Features (Volar) ` <br/>2. `TypeScript Vue Plugin (Volar) `  <br/>3. 禁用 Vetur <br/>4.ESLint <br/>5.Prettier  - Code formatter |



## 项目启动

```bash
# 克隆代码
git clone https://gitee.com/lxxlalala/uniapp-vue-vite-ts.git

# 切换目录
cd uniapp-vue-vite-ts

# 安装 pnpm
npm install pnpm -g

# 安装依赖
pnpm install

# 启动运行
pnpm run dev:h5 (或者查看package.json运行对应平台命令)
```



## 接口支持

- **接口调用地址**：[https://vapi.youlai.tech](https://vapi.youlai.tech)

- **接口文档地址**：[在线接口文档](https://www.apifox.cn/apidoc/shared-195e783f-4d85-4235-a038-eec696de4ea5)

- **OpenAPI文档地址**：[http://vapi.youlai.tech/v3/api-docs](http://vapi.youlai.tech/v3/api-docs)

- **本地接口**：默认使用线上接口，你可以通过以下步骤完成本地接口环境搭建：

  > 1. 获取基于 `Java 、SpringBoot` 开发的后端 [youlai-boot](https://gitee.com/youlaiorg/youlai-boot.git) 源码 ;
  > 2. 根据后端工程说明文档 [README.md](https://gitee.com/youlaiorg/youlai-boot#%E9%A1%B9%E7%9B%AE%E8%BF%90%E8%A1%8C) 完成本地启动; 
  > 3. 替换 [vite.config.ts](vite.config.ts) 的代理目标地址 `vapi.youlai.tech` 为本地的 `localhost:8989`



## 项目文档

- [ESLint+Prettier+Stylelint+EditorConfig 约束和统一前端代码规范](https://blog.csdn.net/u013737132/article/details/130190788)
