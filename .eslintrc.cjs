// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        uni: true,
        wx: true,
        getCurrentPages: true,
    },
    /* 指定如何解析语法 */
    parser: 'vue-eslint-parser',
    /** 优先级低于 parse 的语法解析配置 */
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    /* 继承已有的规则 */
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    plugins: ['vue', '@typescript-eslint'],
    /*
     * 'off' 或 0    ==>  关闭规则
     * 'warn' 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * 'error' 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        // eslint（https://eslint.bootcss.com/docs/rules/）
        complexity: [2, 15],
        eqeqeq: 2, //必须使用全等
        indent: [2, 4, { SwitchCase: 1 }],
        'valid-jsdoc': 0, //jsdoc规则
        'no-const-assign': 2, //禁止修改const声明的变量 - 开启
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unexpected-multiline': 'error', // 禁止空余的多行
        'no-useless-escape': 'off', // 禁止不必要的转义字符
        '@typescript-eslint/ban-types': 'off', // 允许使用function 声明函数
        // typeScript (https://typescript-eslint.io/rules)
        '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        '@typescript-eslint/semi': 'off',
        'no-prototype-builtins': 'off', // 可以使用obj.hasOwnProperty()
        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        '@typescript-eslint/no-this-alias': [
            'warn',
            {
                allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
                allowedNames: ['that'], // this的別名可以为that
            },
        ],
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                bracketSameLine: false,
                bracketSpacing: true,
                embeddedLanguageFormatting: 'auto',
                htmlWhitespaceSensitivity: 'ignore',
                insertPragma: false,
                printWidth: 150,
                proseWrap: 'preserve',
                quoteProps: 'as-needed',
                requirePragma: false,
                semi: false,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'es5',
                useTabs: false,
                vueIndentScriptAndStyle: false,
            },
        ],
    },
}
