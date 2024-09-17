import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
//import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  //eslintPluginPrettierRecommended,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: { globals: globals.browser },
    ignores: ['**/node_modules/', '.dist/'],
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
    // "globals":{
    //   process:"readonly",
    // }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
