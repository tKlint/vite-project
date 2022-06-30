module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        // 1. 接入 prettier 的规则
        'prettier',
        'plugin:prettier/recommended',
        'plugin:import/recommended'
    ],
    // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'no-cond-assign': ['error', 'always'],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        'prettier/prettier': 'error',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
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
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
        'comma-dangle': [
            'error',
            {
                // "arrays": "never",
                // objects: 'never',
                // "imports": "never",
                // "exports": "never",
                // functions: 'never'
            }
        ],
        'react/require-default-props': [
            0,
            {
                forbidDefaultForRequired: false,
                classes: 'defaultProps',
                functions: 'defaultProps',
                // @deprecated Use `functions` option instead.
                ignoreFunctionalComponents: true
            }
        ],
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function'
            }
        ],
        'react/prop-types': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'import/no-unresolved': 0
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.jsx']
            },
            // 配置别名
            alias: {
                map: [['@', './src/']],
                extensions: ['.tsx', '.ts', '.jsx', '.js']
            }
        }
    }
};
