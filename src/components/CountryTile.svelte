<script>
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import { area, line } from 'd3-shape';
	import { bisector } from 'd3-array';

	import { countryTileConfig, countryTileScaleY, countryTileScaleX } from '$stores/scales.js';
	import { displayFlows, isMobileView } from '$stores/settings.js';
	import { countries as countriesRu } from '$data/countriesRu.js';

	import Tooltip from '$components/Tooltip.svelte';

	export let country;

	let tooltip = {
		show: false,
		x: 0,
		year: $countryTileScaleX.domain()[0]
	};

	function mouseOver(event) {
		tooltip.show = true;

		let tileX = event.offsetX;
		let bisect = bisector((d) => d.year).center;
		let idx = bisect(country.records, $countryTileScaleX.invert(tileX));

		tooltip.year = country.records[idx].year;
		tooltip.x = $countryTileScaleX(tooltip.year);
	}

	function mouseLeave() {
		tooltip.show = false;
	}

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

	$: showTooltip = tooltip.show && tooltip.year && !$$slots.legend;

	// Show country's details modal window
	const dispatch = createEventDispatcher();
	function showCountryModal() {
		dispatch('showCountryModal', {
			country 
		});
	}

</script>

<svg
	viewBox="0 0 {$countryTileConfig.width} {$countryTileConfig.height}"
	class="country-tile" class:country-tile-hovered={showTooltip}
	on:mouseover={mouseOver}
	on:mousemove={mouseOver}
	on:focus={mouseOver}
	on:mouseleave={mouseLeave}
	on:click={showCountryModal}
>
	{#if $displayFlows.import}
		<path d={importArea} class="area-import" transition:fly />
	{/if}

	{#if $displayFlows.export}
		<path d={exportArea} class="area-export" transition:fly />
	{/if}

	{#if $displayFlows.turnover}
		<path d={turnoverLine} class="line-turnover" transition:fly />
	{/if}

	{#if showTooltip && !$isMobileView}
		<line x1={tooltip.x} x2={tooltip.x} y1="0" y2="100%" class="tooltip-line" />
	{/if}

	<slot name="legend" />
	<slot name="yAxis" />
	<slot name="xAxis" />

	{#if !$$slots.legend}
		<text x="2px" y="14px" class="country-name">{countriesRu[country.country]}</text>
	{:else}
		<text x="2px" y="14px" class="country-name">Торговый объем</text>
	{/if}
</svg>

{#if (showTooltip && !$isMobileView)}
	<Tooltip year={tooltip.year} {country} />
{/if}

<style>
	.country-tile {
		background-color: var(--color-white-primary);
		outline: 2px solid var(--color-dark-light);
		overflow: visible;
	}

	.country-tile-hovered {
		outline: 2px solid var(--color-dark-primary);
		cursor: pointer;
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
		/* stroke-dasharray: 2 2; */
	}

	.tooltip-line {
		stroke-width: 1px;
		fill: none;
		stroke: var(--color-dark-primary);
		stroke-opacity: 1;
		shape-rendering: crispEdges;
		stroke-dasharray: 2 2;
	}
</style>
