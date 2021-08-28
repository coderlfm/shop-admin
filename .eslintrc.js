module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': ['warn', { singleQuote: true }],
    '@typescript-eslint/no-empty-function': 'warn',
    'vue/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
