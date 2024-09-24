// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import prettierEslint from 'eslint-plugin-prettier/recommended'
import nodeEslint from 'eslint-plugin-n'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import consistentImportExport from 'eslint-plugin-consistent-default-export-name'

export default [
  prettierEslint,
  nodeEslint.configs['flat/recommended'],
  ...tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
  ),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    plugins: {
      'consistent-default-export-name': consistentImportExport,
    },
    rules: {
      'consistent-default-export-name/default-export-match-filename': 'error',
      'consistent-default-export-name/default-import-match-filename': 'error',
    }
  },
  {
    languageOptions: {
      parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      '**/eslint.config.mjs',
      '**/dist/**',
      '**/jest.*.js',
      '.yarn/***',
      '.pnp.*',
      'coverage/***',
    ],
  },
  {
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'warn',
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-unused-vars': ['error', {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'max-len': [
        'warn',
        {
          code: 120,
          ignoreStrings: true,
        },
      ],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-console': 1,
      'no-extra-boolean-cast': 0,
      indent: ['off'],
      quotes: ['warn', 'single'],
      'n/no-process-env': 1,
      'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
      'n/no-missing-import': 0,
      'n/no-unpublished-import': 0,
    },
  },
]
