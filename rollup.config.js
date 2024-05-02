// Based on: https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#How-do-I-configure-the-Rollup-build

import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import scss from 'rollup-plugin-scss'

export default {
	input: 'src/wrapper.js',
	output: {
		// wrapper.js exports 3 components
		name: 'SvgMap',
		exports: 'named',

		sourcemap: true,
		globals: {
			vue: "Vue", // global.Vue を使うために必要
		},
	},
	external: ["Vue"], // Vueはその環境に読み込まれているVueを使うため、バンドルしない
	plugins: [
		vue({
			compileTemplate: true,
		}),
		// vue(),
		scss({
			output: 'dist/index.css',
		}),
		commonjs(),
		buble(),
	],
}
