<script>
	import CountryTilePanel from '$components/CountryTilePanel.svelte';
	import Settings from '$components/Settings.svelte';

	import { displayFlows, displayYears } from '$stores/settings.js';
	import { countryTileConfig } from '$stores/scales';
	import { setScales } from '$utils/scales.js';

	import earth from '$svg/earth.svg';

	import { sort, sum } from 'd3-array';

	export let data;

	$: setScales(data.data, $displayFlows, $displayYears, $countryTileConfig);

	const sortedData = sort(data.data, (d) => {
		let tSum = sum(
			d.records.filter((rec) => rec.flow === 'Turnover'),
			(val) => val.value
		);

		return -tSum;
	});

	const europe = sortedData.filter((d) => d.continent === 'Europe');
	const africa = sortedData.filter((d) => d.continent === 'Africa');
	const asia = sortedData.filter((d) => d.continent === 'Asia');
	const northAmerica = sortedData.filter((d) => d.continent === 'North America');
	const southAmerica = sortedData.filter((d) => d.continent === 'South America');
	const oceania = sortedData.filter((d) => d.continent === 'Oceania');
</script>

<Settings />

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
