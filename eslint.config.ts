import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: {
            js,
        },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    pluginVue.configs['flat/essential'],
    eslintPluginPrettierRecommended,
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
        },
    },
]);
// rules: {
//     'vue/html-self-closing': [
//         'error',
//         {
//             html: {
//                 void: 'any',
//                 normal: 'always',
//                 component: 'always',
//             },
//             svg: 'always',
//             math: 'always',
//         },
//     ],
// },
