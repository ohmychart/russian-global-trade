<script>
	import { fly } from 'svelte/transition';
	import { formatTicksY } from '$utils/helpers.js';
	import { displayFlows } from '$stores/settings.js';

	export let year;
	export let country;

	$: valueImport = country.records.find((d) => d.year === year && d.flow === 'Import')?.value;
	$: valueExport = country.records.find((d) => d.year === year && d.flow === 'Export')?.value;
	$: valueTurnover = country.records.find((d) => d.year === year && d.flow === 'Turnover')?.value;
</script>

<div class="tooltip-box" transition:fly>
	<p>Год: {year}</p>
	<p class:hidden={!$displayFlows.turnover || !valueTurnover}>
		Оборот: {formatTicksY(valueTurnover)}
	</p>
	<p class:hidden={!$displayFlows.import || !valueImport}>Импорт: {formatTicksY(valueImport)}</p>
	<p class:hidden={!$displayFlows.export || !valueExport}>Экспорт: {formatTicksY(valueExport)}</p>
</div>

<style>
	.tooltip-box {
		position: absolute;
		background-color: var(--color-dark-primary);
		outline: 2px solid var(--color-dark-primary);
		text-align: left;
		padding: 0;
		opacity: 0.8;
		margin-top: 2px;
		border-radius: 1px;
	}

	.tooltip-box p {
		margin: 0 4px;
		font-size: 0.8rem;
		line-height: 1rem;
		color: var(--color-white-primary);
	}

	.hidden {
		display: none;
	}
</style>
