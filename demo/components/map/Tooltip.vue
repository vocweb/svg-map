<template>
    <article class="examples__block">
        <h2 class="examples__block__title">
            Germany SVG heat map with tooltips
        </h2>
        <div class="examples__block__map examples__block__map--usa">
            <svg-map :map="Germany" :location-class="getLocationClass" @mouseover="pointLocation" @mouseout="unpointLocation" @mousemove="moveOnLocation" />
            <div class="examples__block__map__tooltip" :style="tooltipStyle">
                {{ pointedLocation }}
            </div>
        </div>
    </article>
</template>

<script>
import Germany from '@svg-country-maps/germany'
import { getLocationName } from '../utilities'
import SvgMap from '../../../src/components/SvgMap'

export default {
    name: 'TooltipHeatMap',
    components: {
        SvgMap,
    },
    data() {
        return {
            Germany,
            pointedLocation: null,
            tooltipStyle: null,
        }
    },
    methods: {
        pointLocation(event) {
            this.pointedLocation = getLocationName(event.target)
        },
        unpointLocation(event) {
            this.pointedLocation = null
            this.tooltipStyle = { display: 'none' }
        },
        moveOnLocation(event) {
            this.tooltipStyle = {
                display: 'block',
                top: `${event.clientY + 10}px`,
                left: `${event.clientX - 100}px`,
            }
        },
        getLocationClass(location, index) {
            // Generate heat map
            return `svg-map__location svg-map__location--heat${index % 4}`
        },
    },
}
</script>
