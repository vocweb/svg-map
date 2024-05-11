<template>
    <article class="examples__block">
        <h2 class="examples__block__title">
            Vietnam SVG map as radio buttons
        </h2>
        <div class="examples__block__info">
            <div class="examples__block__info__item">
                Pointed location: {{ pointedLocation }}
            </div>
            <div class="examples__block__info__item">
                Focused location: {{ focusedLocation }}
            </div>
            <div class="examples__block__info__item">
                Selected location: {{ getSelectedLocationName(Vietnam, selectedLocation) }}
            </div>
        </div>
        <div class="examples__block__map">
            <radio-svg-map v-model="selectedLocation" :map="Vietnam" @change="handleClick" @mouseover="pointLocation" @mouseout="unpointLocation" @focus="focusLocation" @blur="blurLocation" />
        </div>
    </article>
</template>

<script>
import Vietnam from '@svg-country-maps/vietnam'
import { getLocationName, getSelectedLocationName } from '../utilities'
import RadioSvgMap from '../../../src/components/RadioSvgMap'

export default {
    name: 'RadioMap',
    components: {
        RadioSvgMap,
    },
    data() {
        return {
            Vietnam,
            pointedLocation: null,
            focusedLocation: null,
            selectedLocation: null,
        }
    },
    methods: {
        handleClick(location) {
            if (location.attributes.name) {
                console.log("Parent - Map name:" + location.attributes.name.value);
            }
            console.log("Parent - Map Id:" + location.id);
            // console.log(location);
            this.focusedLocation = getLocationName(location);
            this.selectedLocation = location.id;
        },
        pointLocation(event) {
            console.log("Parent - pointLocation:");
            this.pointedLocation = getLocationName(event.target)
        },
        unpointLocation(event) {
            console.log("Parent - unpointLocation:");
            this.pointedLocation = null
        },
        focusLocation(event) {
            console.log("Parent - focusLocation:");
            this.focusedLocation = getLocationName(event.target)
        },
        blurLocation(event) {
            console.log("Parent - blurLocation:");
            this.focusedLocation = null
        },
        getSelectedLocationName,
    },
}
</script>
