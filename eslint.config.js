import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'

export default [
  {files: ['**/*.{js,mjs,cjs,ts,vue}']},
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettierConfig,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Index', 'Error']
        }
      ],
      'vue/max-attributes-per-line': 'off', // Deixar o Prettier cuidar disso
      'vue/singleline-html-element-content-newline': 'off'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts']
  }
]
