module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'import'
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier/react'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'global-require': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'no-else-return': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        'no-nested-ternary': 'off',
        'no-return-await': 'off',
        'import/prefer-default-export': 'off',
        'import/no-dynamic-require': 'off',
        '@typescript-eslint/no-use-before-define': ['off'],
        'react/jsx-one-expression-per-line': 'off',
        'react/button-has-type': 'off',
        'react/prop-types': 'off',
        'react/jsx-curly-newline': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/state-in-constructor': 'off',
        'react/destructuring-assignment': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-throw-literal': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
          }
        ],
        'prettier/prettier': 'error',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/display-name': 'off',
        'react/jsx-filename-extension': [
          1,
          { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
        ],
        'no-console': 'off',
        'no-debugger': 'off',
        'import/order': [
          'error',
          {
            pathGroups: [
              {
                pattern: '~/**',
                group: 'external',
                position: 'after'
              }
            ],
            groups: [
              'builtin',
              'external',
              'internal',
              'unknown',
              'parent',
              'sibling',
              'index',
              'object',
              'type'
            ],
            'newlines-between': 'always-and-inside-groups'
          }
        ]
      }
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
