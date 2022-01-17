<script>
	import CountryTile from '$components/CountryTile.svelte';
	import { displayFlows } from '$stores/settings.js';
	import { countryTileScaleY, countryTileScaleX } from '$stores/scales.js';
	import { formatTicksY, formatTicksX } from '$utils/helpers.js';

	export let country;

	$: yTicks = [
		$countryTileScaleY.domain()[0],
		$countryTileScaleY.domain()[1] / 2,
		$countryTileScaleY.domain()[1]
	];

	$: xTicks = $countryTileScaleX.domain();
</script>

<CountryTile {country}>
	<g slot="xAxis" transform="translate(0, {$countryTileScaleY(yTicks[0]) + 5})">
		{#each xTicks as xTick}
			<g transform="translate({$countryTileScaleX(xTick.toFixed(0))})">
				<line y2="5" />
				<text class="x-tick-label">{formatTicksX(xTick.toFixed(0))}</text>
			</g>
		{/each}
	</g>

	<g slot="yAxis" transform="translate(-5, 0)">
		{#each yTicks as yTick}
			<g transform="translate(0, {$countryTileScaleY(yTick)})">
				<line x2="-5" />
				<text class="tick-label">{formatTicksY(yTick)}</text>
			</g>
		{/each}
	</g>

	<g slot="legend" transform="translate(120, 4)">
		{#if $displayFlows.turnover}
			<g transform="translate(0, 0)">
				<rect width="20" height="20" class="turnover" />
				<text transform="translate(25, 13)">Оборот</text>
			</g>
		{/if}
		{#if $displayFlows.import}
			<g transform="translate(0, 24)">
				<rect width="20" height="20" class="import" />
				<text transform="translate(25, 13)">Импорт</text>
			</g>
		{/if}
		{#if $displayFlows.export}
			<g transform="translate(0, 48)">
				<rect width="20" height="20" class="export" />
				<text transform="translate(25, 13)">Экспорт</text>
			</g>
		{/if}
	</g>
</CountryTile>

<style>
	text {
		font-size: 13px;
		fill: var(--color-dark-primary);
	}

	.tick-label {
		text-anchor: end;
		transform: translate(-10px, 5px);
		font-size: 13px;
	}

	.x-tick-label {
		text-anchor: middle;
		transform: translate(0, 18px);
		font-size: 13px;
	}

	line {
		stroke-width: 1px;
		stroke: var(--color-dark-secondary);
	}

	.turnover {
		stroke: #212121ff;
		stroke-width: 1px;
		fill: none;
		stroke-dasharray: 2 2;
	}

	.import {
		fill: #212121ff;
	}

	.export {
		fill: #00bfa580;
	}
</style>
