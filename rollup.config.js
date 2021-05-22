import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import typescript from '@rollup/plugin-typescript';

import alias from '@rollup/plugin-alias';
import path from 'path';

import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import html from '@rollup/plugin-html';
import css from 'rollup-plugin-css-only';

import { copyFileSync, existsSync, rmSync, mkdirSync, readFileSync } from 'fs';

const isProduction = !process.env.ROLLUP_WATCH;
const projectRoot = path.resolve(__dirname);

// Extra scripts to include in index.html (entry script is automatically included)
// No extension (eg: main)
const indexHTMLIncludedScripts = [];

function serve() {
	let server;

	if (!existsSync('public/serve.json')) {
		console.log('Copying serve.json to public');
		copyFileSync('serve.json', 'public/serve.json');
	}

	function toExit() {
		if (server) {
			server.kill(0);
		}
	}

	return {
		writeBundle() {
			if (server) {
				return;
			}

			server = require('child_process').spawn('npm', ['run', 'serve'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

function cleanPublicDirectory() {
	if (!existsSync('public')) {
		return;
	}

	rmSync('public', { recursive: true });
	mkdirSync('public');
}

function generateHTMLAttributes(attributes) {
	let result = '';

	for (let key in attributes) {
		result += ` ${key}="${attributes[key]}" `;
	}

	return result.trimEnd();
}

function generateHTMLTemplate({ attributes, files, publicPath }) {
	const template = readFileSync('src/index.html').toString('utf-8');

	let scriptPreloads = '';
	const scripts = (files.js || [])
		.map(({ fileName, isEntry }) => {
			const isIndexHTMLIncludedScripts = indexHTMLIncludedScripts
				.some(
					(name) => {
						return fileName.split('.')[0].startsWith(name)
					}
				);

			// We only include the entry file and the extra files configured
			if (
				!isEntry 
				&& !isIndexHTMLIncludedScripts
				) {
					return '';
			}

			// Note: Assumed all files generated is module
			scriptPreloads += `<link rel="modulepreload" href="${publicPath}${fileName}"/>\n`

			const scriptAttributes = generateHTMLAttributes(attributes.script || {});
			return `		<script src="${publicPath}${fileName}"${scriptAttributes}></script>\n`
		})
		.join('')
		.trim();
	const links = (files.css || [])
		.map(({ fileName }) => {
			const linkAttributes = generateHTMLAttributes(attributes.link || {});
			return `		<link rel="stylesheet" href="${publicPath}${fileName}"${linkAttributes}/>\n`
		})
		.join('')
		.trim();

	return template
		.replace(/\{scripts\}/g, scripts)
		.replace(/\{preloads\}/g, scriptPreloads.trim())
		.replace(/\{links\}/g, links);
}

export default {
	input: 'src/main.ts',
	preserveEntrySignatures: false,
	output: {
		sourcemap: true,
		format: 'esm',
		name: 'app',
		dir: 'public',
		chunkFileNames: `[name]${ isProduction ? '-[hash]' : '' }.js`
	},
	plugins: [
		cleanPublicDirectory(),
		// Path alias(es) 
		// If the path alias(es) below is/are changed,
		// please also update the `compilerOptions.paths` property in tsconfig.json 
		alias({
			customResolver: resolve({
				extensions: ['svelte', 'ts']
			}),
			entries: [
				{
					find: '@components',
					replacement: path.resolve(projectRoot, 'src/components')
				}
			]
		}),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !isProduction
			},
			preprocess: sveltePreprocess({
				postcss: {
					plugins: [
					 require('tailwindcss'), 
					 require('autoprefixer'),
					],
				},
			}),
		}),
		typescript({
			sourceMap: true
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({
			output: 'bundle.css'
		}),
		html({
			template: generateHTMLTemplate
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!isProduction && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!isProduction && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		isProduction && terser()
	],
	watch: {
		clearScreen: false
	}
};