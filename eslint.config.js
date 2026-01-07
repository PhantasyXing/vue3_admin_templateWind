import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. 全局忽略配置 (相当于 .eslintignore)
  {
    ignores: ['dist', 'node_modules', 'public', '**/*.d.ts'],
  },

  // 2. 通用配置 (JS/TS/Vue)
  {
    // 指定生效的文件
    files: ['**/*.{js,mjs,cjs,ts,vue}'],

    // 对应旧版的 env 配置
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // 对应旧版 jest: true
      },
      sourceType: 'module',
    },
  },

  // 3. 引入推荐配置 (对应旧版的 extends)
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'], // 注意这里变成了 flat/essential

  // 4. Vue 文件专属解析器配置 (最关键的部分)
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser, // 使用 vue-eslint-parser
      parserOptions: {
        parser: tseslint.parser, // 在 <script> 中使用 ts 解析器
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // 5. 自定义规则 (完全复刻你提供的 rules)
  {
    rules: {
      // === ESLint JavaScript 规则 ===
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      // 注意：在 ESM 配置文件中 process.env 可能需要手动注入，或者直接写死。
      // 这里保留逻辑，但通常建议在构建工具层处理 env，或者直接写 'warn'/'error'
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符

      // === TypeScript 规则 ===
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
      '@typescript-eslint/semi': 'off',

      // === Vue 规则 ===
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
      'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    },
  },

  // 6. Prettier 配置 (放在最后)
  // 对应旧版 plugin:prettier/recommended
  // 作用：关闭所有可能与 Prettier 冲突的 ESLint 规则
  eslintConfigPrettier,
]
