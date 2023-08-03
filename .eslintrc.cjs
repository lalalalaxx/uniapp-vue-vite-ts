// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {},
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
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    /*
     * 'off' 或 0    ==>  关闭规则
     * 'warn' 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * 'error' 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        // eslint（https://eslint.bootcss.com/docs/rules/）
        complexity: ['error', 15],
        eqeqeq: 'error', //必须使用全等
        indent: ['error', 4, { SwitchCase: 1 }],
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
        '@typescript-eslint/no-var-requires': 'off', // 不允许在import 中使用require

        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        'vue/no-v-html': 'off', // 禁止使用 v-html
        '@typescript-eslint/no-this-alias': [
            'warn',
            {
                allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
                allowedNames: ['_this'], // this的別名可以为_this
            },
        ],
        'prettier/prettier': [
            'error',
            {
                //在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
                arrowParens: 'always',
                // 开始标签的右尖括号是否跟随在最后一行属性末尾，默认false
                bracketSameLine: false,
                // 对象字面量的括号之间打印空格 (true - Example: { foo: bar } ; false - Example: {foo:bar})
                bracketSpacing: true,
                // 是否格式化一些文件中被嵌入的代码片段的风格(auto|off;默认auto)
                embeddedLanguageFormatting: 'auto',
                // 指定 HTML 文件的空格敏感度 (css|strict|ignore;默认css)
                htmlWhitespaceSensitivity: 'ignore',
                // 一行最多多少个字符
                printWidth: 150,
                // 超出打印宽度 (always | never | preserve )
                proseWrap: 'preserve',
                // 对象属性是否使用引号(as-needed | consistent | preserve;默认as-needed:对象的属性需要加引号才添加;)
                quoteProps: 'as-needed',
                // 指定要使用的解析器，不需要写文件开头的 @prettier
                requirePragma: false,
                // 不需要自动在文件开头插入 @prettier
                insertPragma: false,
                // 最后不需要引号
                semi: false,
                // 使用单引号 (true:单引号;false:双引号)
                singleQuote: true,
                // 缩进空格数，默认2个空格
                tabWidth: 4,
                // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
                trailingComma: 'es5',
                // 使用制表符而不是空格缩进行
                useTabs: false,
                // Vue文件脚本和样式标签缩进
                vueIndentScriptAndStyle: false,
                // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
                endOfLine: 'auto',
            },
        ],
    },
}
