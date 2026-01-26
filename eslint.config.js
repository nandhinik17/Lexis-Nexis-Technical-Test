const js = require('@eslint/js');

module.exports = [
    {
        ignores: [
            'node_modules/',
            'allure-results/',
            'allure-report/',
            '.github/',
            'dist/',
            'build/',
            'coverage/'
        ]
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
                browser: 'readonly',
                $: 'readonly',
                $$: 'readonly',
                module: 'readonly',
                require: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            'indent': ['error', 4],
            'linebreak-style': ['error', 'windows'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': ['warn'],
            'no-console': 'off',
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }]
        }
    },
    {
        files: ['test/**/*.js'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: {
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                expect: 'readonly',
                browser: 'readonly',
                global: 'readonly',
                $: 'readonly',
                $$: 'readonly',
                require: 'readonly'
            }
        },
        rules: {
            'no-unused-expressions': 'off',
            'no-unused-vars': ['warn', { 'args': 'none' }]
        }
    },
    {
        files: ['**/*.spec.js'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: {
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                expect: 'readonly',
                browser: 'readonly',
                global: 'readonly',
                $: 'readonly',
                $$: 'readonly'
            }
        },
        rules: {
            'no-unused-expressions': 'off',
            'no-unused-vars': ['warn', { 'args': 'none' }]
        }
    },
    {
        files: ['wdio-*.conf.js'],
        rules: {
            'no-unused-vars': ['warn', { 'args': 'none' }]
        }
    }
];
