module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    ignorePatterns: ['/tailwind.config.js'],
    extends: [
        'eslint:recommended',
        '@nuxt/eslint-config',
        'prettier' // MUST be last: https://github.com/prettier/eslint-config-prettier#installation
    ],
    // overrides: [
    //     {
    //         env: {
    //             node: true
    //         },
    //         parserOptions: {
    //             sourceType: 'script'
    //         }
    //     }
    // ],
    // parserOptions: {
    //     ecmaVersion: 'latest',
    //     parser: '@typescript-eslint/parser',
    //     sourceType: 'module'
    // },
    rules: {
        indent: ['error', 4],
        'max-len': ['warn', {
            code: 120,
            comments: 120,
            ignoreTrailingComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreUrls: true
        }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'vue/no-v-html': 'off'
    }
};
