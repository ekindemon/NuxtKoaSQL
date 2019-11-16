module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // 校验 .vue 文件
  plugins: [
    'vue'
  ],
  // 自定义规则
  rules: {
    // eslint 與 prettier 衝突時，以 prettier 規則優先
    'arrow-parens': 0,
    'space-before-function-paren': 0,

    // https://git.io/fjdQG
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'any',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],

    // warn
    'comma-dangle': ['warn'],
    'handle-callback-err': 'warn',
    'lines-between-class-members': 0,
    'no-unused-vars': ['off'],
    'no-trailing-spaces': ['warn'],
    'prettier/prettier': ['warn'],
    'vue/multiline-html-element-content-newline': ['warn'],
    'vue/no-unused-vars': 'off',
    'vue/require-prop-types': 0,
    'vue/singleline-html-element-content-newline': 'off',

    'vue/no-unused-components':
      process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'no-undef': 'off',
    'eqeqeq': 'off',
    // 'no-var': 'off',
    'camelcase': 'off',
    'vue/max-attributes-per-line':'off'
  }
}
