// Based on: https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#What-does-my-packaged-component-look-like

// Import vue components
import SvgMap from './components/SvgMap.vue'
import CheckboxSvgMap from './components/CheckboxSvgMap.vue'
import RadioSvgMap from './components/RadioSvgMap.vue'
import './scss/svg-map.scss'

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return
	install.installed = true
	Vue.component('SvgMap', SvgMap)
	Vue.component('CheckboxSvgMap', CheckboxSvgMap)
	Vue.component('RadioSvgMap', RadioSvgMap)
}

// Create module definition for Vue.use()
const plugin = {
	install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export components
// Based on: https://github.com/Akryum/v-tooltip/blob/master/src/index.js
export { SvgMap, CheckboxSvgMap, RadioSvgMap }

export default plugin
