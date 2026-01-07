/** @type {import('stylelint').Config} */
export default {
  // 1. 继承官方推荐的配置
  extends: [
    'stylelint-config-standard-scss', // SCSS 标准配置
    'stylelint-config-recommended-vue/scss', // Vue + SCSS 适配
    'stylelint-config-recess-order', // CSS 属性自动排序 (如先写 display, 后写 color)
  ],

  // 2. 针对不同文件类型的特殊解析
  overrides: [
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html', // 解析 Vue 模板中的样式
    },
  ],

  // 3. 自定义规则
  rules: {
    // === 核心逻辑修正 ===
    'no-descending-specificity': null, // 允许低优先级的选择器出现在高优先级之后 (Sass 嵌套常见情况)
    'no-empty-source': null, // 允许空的 <style> 标签
    'font-family-no-missing-generic-family-keyword': null, // 允许不写通用字体族

    // === 适配 Element Plus / 第三方库 ===
    'selector-class-pattern': null, // 不强制类名格式 (如允许 .el-button--primary)
    'value-no-vendor-prefix': null, // 允许 -webkit- 前缀
    'property-no-vendor-prefix': null,

    // === 适配 Vue 特性 ===
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略 Vue 的 ::v-deep 等伪类
      },
    ],

    // === 这里的规则要注意 ===
    // 教程里有很多关于空格、引号的规则（比如 block-opening-brace-space-before）
    // 在 Stylelint 16 中，这些“格式化”规则已被移除，全部交给 Prettier 负责。
    // 所以这里不需要写，写了反而会报错说“找不到规则”。
  },
}
