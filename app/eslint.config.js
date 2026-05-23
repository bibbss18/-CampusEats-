/* eslint-env node */
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],

  plugins: ['vue', 'prettier'],

  rules: {
    /* Prettier */
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
        printWidth: 100,
      },
    ],

    /* Vue */
    'vue/multi-word-component-names': 'off', // permite Home.vue, Login.vue etc
    'vue/no-unused-vars': 'warn',

    /* JS */
    'no-console': 'off',
    'no-debugger': 'warn',
  },
};
