// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
 overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
      }
    },
    {
      files: ['src/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    {
      files: ['*.config.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: null // Désactive la vérification du projet pour les fichiers de config
      }
    }
  ]}
