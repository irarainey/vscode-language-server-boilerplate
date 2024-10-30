import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintParserTypescript from '@typescript-eslint/parser';

export default [
  {
    ignores: ['**/dist', '**/*.d.ts', '**/node_modules', '*.mjs', '*.js'],
  },
  {
    files: ['src/**/*.ts'],
  },
  {
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: eslintParserTypescript,
      ecmaVersion: 6,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/naming-convention': 'warn',
      'no-throw-literal': 'warn',
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
];
