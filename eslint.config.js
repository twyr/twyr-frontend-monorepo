import js from '@eslint/js';
import globals from 'globals';
import * as jsoncParser from 'jsonc-eslint-parser';
import jsonc from 'eslint-plugin-jsonc';
import mocha from 'eslint-plugin-mocha';
import n from 'eslint-plugin-n';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

import { globalIgnores } from 'eslint/config';

export default [
	/* --------------------------------------------------
	 * Base JavaScript rules
	 * -------------------------------------------------- */
	js.configs.recommended,

	/* --------------------------------------------------
	 * Global JS / Node configuration
	 * -------------------------------------------------- */
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node, // for Node.js environments
				...globals.mocha, // for Mocha test files
				serverEnvironment: true
			}
		},
		plugins: {
			n,
			security,
			unicorn,
			prettier
		},
		rules: {
			/* ---------- Prettier ---------- */
			'prettier/prettier': 'error',

			/* ---------- Node ---------- */
			'n/no-missing-import': 'off', // handled by bundlers / TS
			'n/no-unpublished-import': 'off',
			'n/no-process-exit': 'warn',

			/* ---------- Security ---------- */
			'security/detect-object-injection': 'warn',
			'security/detect-non-literal-fs-filename': 'warn',
			'security/detect-child-process': 'warn',

			/* ---------- Unicorn ---------- */
			'unicorn/prefer-node-protocol': 'error',
			'unicorn/prefer-module': 'error',
			'unicorn/no-null': 'off',
			'unicorn/prevent-abbreviations': 'off',
			'unicorn/filename-case': [
				'error',
				{
					cases: {
						kebabCase: true,
						pascalCase: true
					}
				}
			]
		}
	},

	/* --------------------------------------------------
	 * TypeScript rules
	 * -------------------------------------------------- */
	...tseslint.configs.recommended.map((config) => ({
		...config,
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
	})),
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.mocha,
				serverEnvironment: true
			}
		},
		plugins: {
			security,
			unicorn,
			prettier
		},
		rules: {
			/* ---------- Prettier ---------- */
			'prettier/prettier': 'error',

			/* ---------- Security ---------- */
			'security/detect-object-injection': 'warn',
			'security/detect-non-literal-fs-filename': 'warn',
			'security/detect-child-process': 'warn',

			/* ---------- Unicorn ---------- */
			'unicorn/prefer-node-protocol': 'error',
			'unicorn/prefer-module': 'error',
			'unicorn/no-null': 'off',
			'unicorn/prevent-abbreviations': 'off',
			'unicorn/filename-case': [
				'error',
				{
					cases: {
						kebabCase: true,
						pascalCase: true
					}
				}
			]
		}
	},

	/* --------------------------------------------------
	 * Mocha test files
	 * -------------------------------------------------- */
	{
		files: ['test/**/*.js', '**/*.spec.js', '**/*.test.js'],
		plugins: {
			mocha
		},
		languageOptions: {
			globals: {
				...globals.node, // for Node.js environments
				...globals.mocha, // for Mocha test files
				serverEnvironment: true
			}
		},
		rules: {
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-pending-tests': 'warn',
			'mocha/no-mocha-arrows': 'off',
			'mocha/max-top-level-suites': ['warn', { limit: 1 }]
		}
	},

	/* --------------------------------------------------
	 * JSON / JSONC files
	 * -------------------------------------------------- */
	{
		files: ['**/*.json', '**/*.jsonc'],
		languageOptions: {
			parser: jsoncParser,
			globals: {
				...globals.node, // for Node.js environments
				...globals.mocha, // for Mocha test files
				serverEnvironment: true
			}
		},
		plugins: {
			jsonc,
			prettier
		},
		rules: {
			'jsonc/quote-props': ['error', 'always'],
			'jsonc/sort-keys': 'off',
			'prettier/prettier': 'error'
		}
	},

	/* --------------------------------------------------
	 * Locale resource files
	 * -------------------------------------------------- */
	{
		files: ['packages/i18n/src/resources/*.ts'],
		rules: {
			'unicorn/filename-case': 'off'
		}
	},

	/* --------------------------------------------------
	 * Global Ignores
	 * -------------------------------------------------- */
	globalIgnores([
		'./.*.json',
		'.github/',
		'.husky/',
		'.vscode/',
		'buildresults/',
		'coverage/',
		'depcruise/',
		'deploy/',
		'dist/',
		'docs/',
		'.expo/',
		'.next/',
		'logs/',
		'node_modules/',
		'out/',
		'stats/',
		'tsconfig.tsbuildinfo',
		'package.json',
		'package-lock.json',
		'yarn.lock',
		'pnpm-lock.yaml',
		'eslint.config.js'
	])
];
