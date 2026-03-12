# @vocweb/svg-map

Vue.js 3 components for interactive SVG maps with keyboard navigation and accessibility support.

**Features:** Multi-select (checkbox), single-select (radio), customizable styling, WAI-ARIA compliant.

## Installation

```shell
# Install package
npm install @vocweb/svg-map

# Install map data (example)
npm install @svg-country-maps/vietnam
```

## Quick Start

### 1. Basic Map Rendering

```vue
<template>
  <svg-map :map="Vietnam" />
</template>

<script>
import { SvgMap } from "@vocweb/svg-map"
import Vietnam from "@svg-country-maps/vietnam"

export default {
  components: { SvgMap },
  data: () => ({ Vietnam })
}
</script>

<style src="@vocweb/svg-map/dist/index.css"></style>
```

### 2. Checkbox (Multi-Select)

Multi-select map with checkbox behavior (WAI-ARIA compliant):

```vue
<template>
  <checkbox-svg-map v-model="selected" :map="Vietnam" />
  <p>Selected: {{ selected }}</p>
</template>

<script>
import { CheckboxSvgMap } from "@vocweb/svg-map"
import Vietnam from "@svg-country-maps/vietnam"

export default {
  components: { CheckboxSvgMap },
  data: () => ({ Vietnam, selected: [] })
}
</script>

<style src="@vocweb/svg-map/dist/index.css"></style>
```

### 3. Radio (Single-Select)

Single-select map with radio button behavior (WAI-ARIA compliant, arrow key navigation):

```vue
<template>
  <radio-svg-map v-model="selected" :map="Vietnam" />
  <p>Selected: {{ selected }}</p>
</template>

<script>
import { RadioSvgMap } from "@vocweb/svg-map"
import Vietnam from "@svg-country-maps/vietnam"

export default {
  components: { RadioSvgMap },
  data: () => ({ Vietnam, selected: null })
}
</script>

<style src="@vocweb/svg-map/dist/index.css"></style>
```

## Components Overview

| Component | Type | Behavior | v-model |
|-----------|------|----------|---------|
| `SvgMap` | Base | Render SVG, click events | N/A |
| `CheckboxSvgMap` | Wrapper | Multi-select (click/space) | String[] |
| `RadioSvgMap` | Wrapper | Single-select (click/arrows) | String |

## Props

### SvgMap
- `map` (required) - SVG map object: `{ viewBox: string, label?: string, locations: [...] }`
- `location-class` - CSS class(es) for paths (string or function)
- `location-tabindex` - Tabindex for paths (string or function)
- `location-role` - ARIA role override
- `is-location-selected` - Function to determine if location selected

### CheckboxSvgMap
- `value` - Array of selected location IDs (for v-model)
- `location-class` - Optional CSS classes

### RadioSvgMap
- `value` - Single selected location ID (for v-model)
- `location-class` - Optional CSS classes

## Keyboard Navigation

**CheckboxSvgMap:**
- Click: Toggle selection
- Space: Toggle focused location

**RadioSvgMap:**
- Click: Select location
- Space: Select focused location
- Arrow keys (Up/Down/Left/Right): Navigate locations
- Tab: Move focus between map and page

## Map Data Format

Maps use standard structure from [@svg-country-maps](https://github.com/VictorCazanave/svg-maps):

```javascript
{
  viewBox: "0 0 1000 1000",
  label: "Vietnam",
  locations: [
    {
      id: "location-id",
      name: "Location Name",
      path: "M 100 200 L 150 250...",
      // Custom properties allowed (become HTML attributes on <path>):
      "data-code": "VN-HN",
      title: "Ho Chi Minh"
    }
  ]
}
```

## Customization

### CSS Styling

Default theme uses green stroke and red selected state. Override via CSS:

```css
.svg-map {
  stroke: #your-color;
}

.svg-map__location {
  fill: #your-fill;
}

.svg-map__location[aria-checked="true"],
.svg-map__location:hover {
  fill: #your-selected-color;
}
```

### Dynamic Classes

Use location-class prop with function for conditional styling:

```vue
<checkbox-svg-map
  v-model="selected"
  :map="Vietnam"
  :location-class="(location, index) => ({
    'is-featured': location.id === 'featured-location',
    'is-selected': selected.includes(location.id)
  })"
/>
```

### Custom Map Data

Modify maps by spreading and transforming:

```javascript
const customMap = {
  ...Vietnam,
  label: "My Custom Map",
  locations: Vietnam.locations.map(loc => ({
    ...loc,
    title: `Click to select ${loc.name}`,
    "data-population": 8000000
  }))
}
```

## Slots

Both wrapper components support named slots for injecting content:

```vue
<checkbox-svg-map :map="mapData" v-model="selected">
  <template #before>
    <h2>Select Regions</h2>
  </template>
  <template #after>
    <p>{{ selected.length }} regions selected</p>
  </template>
</checkbox-svg-map>
```

## Accessibility

All components follow WAI-ARIA patterns:
- **SvgMap:** Generic group container
- **CheckboxSvgMap:** Checkbox group (see [WAI-ARIA checkbox example](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-1/checkbox-1.html))
- **RadioSvgMap:** Radio group (see [WAI-ARIA radio example](https://www.w3.org/TR/wai-aria-practices/examples/radio/radio-1/radio-1.html))

Features:
- Keyboard navigation (Space, Arrow keys)
- ARIA attributes (role, aria-checked, aria-label)
- Screen reader support
- Focus management

## Examples

See `demo/components/map/` for complete examples:
- `Checkbox.vue` - Multi-select example
- `Radio.vue` - Single-select example
- `Tooltip.vue` - Map with tooltips
- `Link.vue` - Map with links
- `VietnamCustom.vue` - Custom styling
- `VietnamRadio.vue` - Radio variant example

## Supported Maps

Available from [@svg-country-maps](https://github.com/VictorCazanave/svg-maps):
- @svg-country-maps/vietnam
- @svg-country-maps/japan
- And others (check npm registry)

## Troubleshooting

**Map not displaying?**
- Verify map.viewBox is valid SVG viewBox string
- Ensure each location has id, name, and path properties
- Check console for prop validation errors

**Styling not applied?**
- Import CSS: `import "@vocweb/svg-map/dist/index.css"`
- Check CSS cascade (custom styles come after import)
- Use browser DevTools to inspect applied styles

**Keyboard navigation not working?**
- Ensure component is focused (click map first)
- RadioSvgMap requires focused path element
- Check console for errors

## Documentation

- **Project overview:** `/docs/project-overview-pdr.md`
- **Codebase structure:** `/docs/codebase-summary.md`
- **Code standards:** `/docs/code-standards.md`
- **Architecture:** `/docs/system-architecture.md`
- **Roadmap:** `/docs/project-roadmap.md`

## License

MIT
