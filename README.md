# vue-svg-map

[![npm version](https://badge.fury.io/js/vue-svg-map.svg)](https://badge.fury.io/js/vue-svg-map)
[![Build Status](https://travis-ci.com/VictorCazanave/vue-svg-map.svg?branch=master)](https://travis-ci.com/VictorCazanave/vue-svg-map)
[![codecov](https://codecov.io/gh/VictorCazanave/vue-svg-map/branch/master/graph/badge.svg)](https://codecov.io/gh/VictorCazanave/vue-svg-map)
[![Dependency Status](https://david-dm.org/VictorCazanave/vue-svg-map.svg)](https://david-dm.org/VictorCazanave/vue-svg-map)
[![peerDependencies Status](https://david-dm.org/VictorCazanave/vue-svg-map/peer-status.svg)](https://david-dm.org/VictorCazanave/vue-svg-map?type=peer)

_A set of Vue.js components to display an interactive SVG map._


## Installation

### npm

```shell
# Install package
npm install --save @vocweb/svg-map 

# Install SVG map 
npm install --save @svg-country-maps/japan
npm install --save @svg-country-maps/vietnam
```

### yarn

```shell
# Install package
yarn add @vocweb/svg-map 

# Install SVG map 
yarn @svg-maps/japan
```

## Usage



### :earth_africa: Simple SVG Map

This is the base component to display an SVG map.

In a SFC (Single File Component):

- Import `SvgMap` component from `@vocweb/svg-map`
- Import the map you want
- Optionally, import `@vocweb/svg-map/dist/index.css` if you want to apply the default styles

```vue
<template>
	<SvgMap :map="Japan" />
</template>

<script>
import { SvgMap } from "@vocweb/svg-map";
import Japan from "@svg-maps/japan";

export default {
	name: "MyMap",
	components: {
		SvgMap
	},
	data() {
		return {
			Japan
		};
	}
};
</script>

<style src="@vocweb/svg-map/dist/index.css"></style>
```

#### Props

| Prop                 | Type             | Default      | Description                                                                                                      |
| -------------------- | ---------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| map                  | Object           | **required** | Describe SVG map to display. See [maps section](#maps) for more details.                                         |
| location-class       | String\|Function | `null`       | CSS class of each `<path>`. The function parameters are the location object and the location index.              |
| location-tabindex    | String\|Function | `null`       | Tabindex each `<path>`. The function parameters are the location object and the location index.                  |
| location-role        | String           | `null`       | ARIA role of each `<path>`.                                                                                      |
| is-location-selected | Function         | `null`       | Executed to determine if a location is selected. This property is used to set the `aria-checked` HTML attribute. |

**Note:** other HTML attributes (e.g. `style`, `title`, `data-*`...) can be added to and customized for each `<path>` [modifying the map object](#modify-a-map).

#### Events

All the listeners (click, keypress...) are applied to each location.

#### Slots

There are 2 named slots:
* `before` which is before the locations
* `after` which is after the locations

### :ballot_box_with_check: Checkbox SVG Map

This is an implementation of `SvgMap` that behaves like a group of checkboxes.  
It is based on this [WAI-ARIA example](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-1/checkbox-1.html) to support keyboard navigation and be accessible.

- Import `CheckboxSvgMap` component from `@vocweb/svg-map`
- Import the map you want
- Optionally, import `@vocweb/svg-map/dist/index.css` if you want to apply the default styles

```vue
<template>
	<checkbox-svg-map v-model="selectedLocations" :map="Japan" />
</template>

<script>
import { CheckboxSvgMap } from "@vocweb/svg-map";
import Japan from "@svg-maps/japan";

export default {
	name: "MyCheckboxMap",
	components: {
		CheckboxSvgMap
	},
	data() {
		return {
			Japan,
			selectedLocations: []
		};
	}
};
</script>

<style src="@vocweb/svg-map/dist/index.css"></style>
```

#### Props

| Prop           | Type             | Default      | Description                                                                                         |
| -------------- | ---------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| map            | Object           | **required** | Describe SVG map to display. See [maps section](#maps) for more details.                            |
| value          | String[]         | `[]`         | List of ids of selected locations. Used for `v-model`.                                              |
| location-class | String\|Function | `null`       | CSS class of each `<path>`. The function parameters are the location object and the location index. |

**Note:** other HTML attributes (e.g. `style`, `title`, `data-*`...) can be added to and customized for each `<path>` [modifying the map object](#modify-a-map).

#### Events

Like for `SvgMap` all the listeners (click, keypress...) are applied to each location.

| Event  | Output   | Description                                                                           |
| ------ | -------- | ------------------------------------------------------------------------------------- |
| change | String[] | Emits the new list of ids when a location is selected/unselected. Used for `v-model`. |

#### Slots

Like in `SvgMap` there are 2 named slots:
* `before` which is before the locations
* `after` which is after the locations

**Note:** inserting focusable elements may break the checkboxes' behaviour.

### :radio_button: Radio SVG Map

This is an implementation of `SvgMap` that behaves like a group of radio buttons.  
It is based on this [WAI-ARIA example](https://www.w3.org/TR/wai-aria-practices/examples/radio/radio-1/radio-1.html) to support keyboard navigation and be accessible.

- Import `RadioSvgMap` component from ``@vocweb/svg-map`
- Import the map you want
- Optionally, import `@vocweb/svg-map/dist/index.css` if you want to apply the default styles

```vue
<template>
	<radio-svg-map v-model="selectedLocation" :map="Japan" />
</template>

<script>
import { RadioSvgMap } from "@vocweb/svg-map";
import Japan from "@svg-maps/japan";

export default {
	name: "MyRadioMap",
	components: {
		RadioSvgMap
	},
	data() {
		return {
			Japan,
			selectedLocation: null
		};
	}
};
</script>

<style src="@vocweb/svg-map/dist/index.css"></style>
```

#### Props

| Prop           | Type             | Default      | Description                                                                                         |
| -------------- | ---------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| map            | Object           | **required** | Describe SVG map to display. See [maps section](#maps) for more details.                            |
| value          | String           | `null`       | Id of selected location. Used for `v-model`.                                                        |
| location-class | String\|Function | `null`       | CSS class of each `<path>`. The function parameters are the location object and the location index. |

**Note:** other HTML attributes (e.g. `style`, `title`, `data-*`...) can be added to and customized for each `<path>` [modifying the map object](#modify-a-map).


#### Events

Like for `SvgMap` all the listeners (click, keypress...) are applied to each location.

| Event  | Output | Description                                                       |
| ------ | ------ | ----------------------------------------------------------------- |
| change | String | Emits the new id when a location is selected. Used for `v-model`. |

#### Slots

Like in `SvgMap` there are 2 named slots:
* `before` which is before the locations
* `after` which is after the locations

**Note:** inserting focusable elements may break the radio buttons' behaviour.

## Maps

### Existing maps

All the existing maps are in an independant [svg-maps](https://github.com/VictorCazanave/svg-maps) project because they may be useful for other components/projects.

### Custom maps

You can modify existing maps or create your own.

#### Modify a map

1. Import the map to modify
1. Create a new object from this map
1. Pass this new object as `map` prop of the component

```vue
<template>
	<SvgMap :map="customJapan" />
</template>

<script>
import { SvgMap } from "@vocweb/svg-map";
import Japan from "@svg-maps/japan";

export default {
	name: "MyMap",
	components: {
		SvgMap
	},
	data() {
		return {
			customJapan: {
				...Japan,
				label: "Custom map label",
				locations: Japan.locations.map(location => {
					// Modify each location to customize/add attributes of <path>
				})
			}
		};
	}
};
</script>
```

It is recommended to not modify the SVG properties (viewBox, path), because it may break the map's display.

## License

MIT
