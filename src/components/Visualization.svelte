<script>
	import CountryTilePanel from '$components/CountryTilePanel.svelte';
	import CountryTileLegend from '$components/CountryTileLegend.svelte';
	import Settings from '$components/Settings.svelte';

	import { displayFlows, displayYearStart, displayYearEnd, endpointsOnly } from '$stores/settings.js';
	import { countryTileConfig } from '$stores/scales';
	import { filterData, setScales } from '$utils/scales.js';

	import earth from '$svg/earth.svg';

	import { sort, sum } from 'd3-array';

	export let data;

	const sortedData = sort(data.data, (d) => {
		let tSum = sum(
			d.records.filter((rec) => rec.flow === 'Turnover'),
			(val) => val.value
		);

		return -tSum;
	});

	$: filteredData = filterData(sortedData, $displayFlows, $displayYearStart, $displayYearEnd, $endpointsOnly);
	$: setScales(filteredData, $displayYearStart, $displayYearEnd, $countryTileConfig);

	$: europe = filteredData.filter((d) => d.continent === 'Europe');
	$: africa = filteredData.filter((d) => d.continent === 'Africa');
	$: asia = filteredData.filter((d) => d.continent === 'Asia');
	$: northAmerica = filteredData.filter((d) => d.continent === 'North America');
	$: southAmerica = filteredData.filter((d) => d.continent === 'South America');
	$: oceania = filteredData.filter((d) => d.continent === 'Oceania');
	$: legend = filteredData.filter((d) => d.country === 'Germany');
</script>

<Settings />


<div id="legend-tile">
	<CountryTileLegend country={legend[0]} />
</div>



<main>
	<div id="earth-map">{@html earth}</div>

	<div id="west">
		<CountryTilePanel countries={northAmerica} continentName="Северная Америка" columns="2" />
		<CountryTilePanel countries={southAmerica} continentName="Южная Америка" columns="2" />
	</div>

	<div id="middle">
		<CountryTilePanel countries={europe} continentName="Европейские страны" columns="5" />
		<CountryTilePanel countries={africa} continentName="Африка" columns="2" />
	</div>

	<div id="east">
		<CountryTilePanel countries={asia} continentName="Азия" columns="3" />
		<CountryTilePanel countries={oceania} continentName="Океания" columns="1" />
	</div>
</main>

<style>

	#legend-tile {
		width: 105px;
		margin: auto;
		margin-top: 2rem;
	}

	main {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	#earth-map {
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		fill: var(--color-dark-light);
		stroke: var(--color-dark-light);
	}
</style>
