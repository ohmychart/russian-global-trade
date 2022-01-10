<script>
	import { area, line } from 'd3-shape';
	import { countryTileConfig, countryTileScaleY, countryTileScaleX } from '$stores/scales.js';
	import {countries as countriesRu} from '$data/countriesRu.js';

	export let country;

	$: width = $countryTileConfig.width;
	$: height = $countryTileConfig.height;

	$: areaGenerator = area()
		.x((d) => $countryTileScaleX(d.year))
		.y0($countryTileScaleY(0))
		.y1((d) => $countryTileScaleY(d.value));

	$: lineGenerator = line()
		.x((d) => $countryTileScaleX(d.year))
		.y((d) => $countryTileScaleY(d.value));

	$: importArea = areaGenerator(country.records.filter((d) => d.flow === 'Import'));
	$: exportArea = areaGenerator(country.records.filter((d) => d.flow === 'Export'));
    $: turnoverLine = lineGenerator(country.records.filter((d) => d.flow === 'Turnover'));

</script>


<svg viewBox="0 0 {width} {height}" class="country-tile">
    <text x="2px" y="14px" class="country-name">{countriesRu[country.country]}</text>
	<path d={importArea} class="area-import" />
	<path d={exportArea} class="area-export" />
    <path d={turnoverLine} class="line-turnover" />
</svg>

<style>
	.country-tile {
		background-color: #fff;
		border: 1px solid #BDBDBD;
	}

    .country-name {
        font-size: 14px;
        fill: #757575;
    }

	.area-import {
		fill: #212121ff;
	}

	.area-export {
		fill: #00bfa580;
	}

    .line-turnover {
        stroke: #212121ff;
        stroke-width: 1px;
        fill: none;
        stroke-dasharray: 2 2;
    }
</style>
