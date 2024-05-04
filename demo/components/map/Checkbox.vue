<template>
    <article class="examples__block">
        <h2 class="examples__block__title">
            Brazil SVG map as checkboxes
        </h2>
        <div class="examples__block__info">
            <div class="examples__block__info__item">
                Pointed location: {{ pointedLocation }}
            </div>
            <div class="examples__block__info__item">
                Focused location: {{ focusedLocation }}
            </div>
            <div class="examples__block__info__item">
                Selected locations:
                <ul>
                    <li v-for="location in selectedLocations" :key="location">
                        {{ getSelectedLocationName(Brazil, location) }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="examples__block__map">
            <checkbox-svg-map v-model="selectedLocations" :map="Brazil" @change="handleClick" @mouseover="pointLocation" @mouseout="unpointLocation" @focus="focusLocation" @blur="blurLocation" />
        </div>
    </article>
</template>

<script>
import Brazil from '@svg-country-maps/brazil'
import { getLocationName, getSelectedLocationName } from '~/utilities'
import CheckboxSvgMap from '../../../src/components/CheckboxSvgMap'

export default {
    name: 'CheckboxMap',
    components: {
        CheckboxSvgMap,
    },
    data() {
        return {
            Brazil,
            pointedLocation: null,
            focusedLocation: null,
            selectedLocations: [],
        }
    },
    methods: {
        handleClick(locations) {
            console.log("Parent - Map name:" + locations);
            // console.log("Parent - Map Id:" + location.id);
            // this.focusedLocation = getLocationName(location);
            // this.selectedLocation = location.id;
        },
        pointLocation(event) {
            this.pointedLocation = getLocationName(event.target)
        },
        unpointLocation(event) {
            this.pointedLocation = null
        },
        focusLocation(event) {
            this.focusedLocation = getLocationName(event.target)
        },
        blurLocation(event) {
            this.focusedLocation = null
        },
        getSelectedLocationName,
    },
}
</script>
