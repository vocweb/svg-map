<template>
	<svg-map v-bind="$attrs" role="group" location-role="checkbox" location-tabindex="0" :is-location-selected="isLocationSelected" @click="toggleLocation" @keydown.prevent.space="toggleLocation">
		<!-- Pass down slots to SvgMap: https://stackoverflow.com/a/50892881/9826498 -->
		<template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
			<slot :name="slot" v-bind="scope" />
		</template>
	</svg-map>
</template>

<script>
import SvgMap from './SvgMap.vue'

// Remove unused variables
// const filteredItems = computed(() => {
// 	if (!props.value) return [] // Handle empty props array

// 	// Filter logic based on your criteria
// 	return props.value.filter(location => location !== props.selectdValue);
// })

// // computed property that auto-updates when the prop changes
// const propsValueArray = computed(() => props.value);

export default {
	name: 'CheckboxSvgMap',
	components: {
		SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		// Ids of selected locations (used for v-model)
		value: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		/**
	 	 * Indicate whether a location is selected
	 	 *
	 	 * @param {Object} location - Location DOM object
	 	 * @returns {boolean} True if the location is selected
		 */
		isLocationSelected(location) {
			console.log('isLocationSelected');
			return this.value.some(selectedLocation => selectedLocation === location.id);
		},

		/**
		 * Select/deselect a location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation(event) {
			const locationElt = event.target;
			let selectedLocations = [];

			// Check if location is selected
			if (locationElt.attributes['aria-checked'] && locationElt.attributes['aria-checked'].value === 'true') {
				// Delete location
				selectedLocations = this.value.filter(location => location !== locationElt.id)
				
				console.log('toggleLocation :: 00');
				console.log(selectedLocations);

				// Update aria-checked attribute
				locationElt.attributes['aria-checked'].value = 'false';
			} else {
				// Add location
				selectedLocations = [...this.value, locationElt.id]

				// Add locationElt.id to value
				// this.value.push(locationElt.id);

				console.log('toggleLocation :: 11: ' + locationElt.id);
				console.log(selectedLocations);

				// Update aria-checked attribute
				if (locationElt.attributes['aria-checked']) {
					locationElt.attributes['aria-checked'].value = 'true';
				}
			}

			// Emit change event
			console.log('toggleLocation :: 99: ');
			console.log(selectedLocations);
			this.$emit('change', selectedLocations)
		},
	},
}
</script>
