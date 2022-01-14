<script>
	import { area, line } from 'd3-shape';
	import { countryTileConfig, countryTileScaleY, countryTileScaleX } from '$stores/scales.js';
	import { displayFlows } from '$stores/settings.js';
	import { countries as countriesRu } from '$data/countriesRu.js';

	import { fly } from 'svelte/transition';

	export let country;

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

<svg viewBox="0 0 {$countryTileConfig.width} {$countryTileConfig.height}" class="country-tile">
	{#if $displayFlows.import}
		<path d={importArea} class="area-import" transition:fly />
	{/if}

	{#if $displayFlows.export}
		<path d={exportArea} class="area-export" transition:fly />
	{/if}

	{#if $displayFlows.turnover}
		<path d={turnoverLine} class="line-turnover" transition:fly />
	{/if}
	

	<slot name="legend" />
	<slot name="yAxis" />
	<slot name="xAxis" />

	{#if !$$slots.legend}
		<text x="2px" y="14px" class="country-name">{countriesRu[country.country]}</text>
	{:else}
		<text x="2px" y="14px" class="country-name">Страна-партнер</text>
	{/if}
</svg>

<style>
	.country-tile {
		background-color: var(--color-white-primary);
		outline: 1px solid var(--color-dark-light);
		overflow: visible;
	}

	.country-tile:hover {
		outline: 1px solid var(--color-dark-medium);
		/* cursor: pointer; */
	}

	.country-name {
		font-size: 13px;
		fill: var(--color-dark-secondary);
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
