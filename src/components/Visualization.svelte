<script>
	import CountryTilePanel from '$components/CountryTilePanel.svelte';
	import CountryTileLegend from '$components/CountryTileLegend.svelte';
	import Settings from '$components/Settings.svelte';
	import CountryModal from '$components/CountryModal.svelte';

	import { countryTileConfig, commodityAreaConfig } from '$stores/scales';
	import {
		displayFlows,
		displayYearStart,
		displayYearEnd,
		endpointsOnly,
		clientWidth,
		isMobileView
	} from '$stores/settings.js';
	
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

	$: $isMobileView = $clientWidth < 1300;

	$: filteredData = filterData(
		sortedData,
		$displayFlows,
		$displayYearStart,
		$displayYearEnd,
		$endpointsOnly
	);
	$: setScales(filteredData, $displayYearStart, $displayYearEnd, $countryTileConfig, $commodityAreaConfig);

	$: europe = filteredData.filter((d) => d.continent === 'Europe');
	$: africa = filteredData.filter((d) => d.continent === 'Africa');
	$: asia = filteredData.filter((d) => d.continent === 'Asia');
	$: northAmerica = filteredData.filter((d) => d.continent === 'North America');
	$: southAmerica = filteredData.filter((d) => d.continent === 'South America');
	$: oceania = filteredData.filter((d) => d.continent === 'Oceania');
	$: legend = filteredData.filter((d) => d.country === 'Germany');

	// Handling country's details modal
	let showCountryModal = false;
	let countryModalInfo;

	function handleShowCountryModal(event) {
		showCountryModal = true;
		countryModalInfo = event.detail.country;
	}

</script>

<main bind:clientWidth={$clientWidth}>
	<div class="controls-container" class:flex-row={!$isMobileView}>
		<Settings />

		<div id="legend-container">
			<p>Легенда:</p>
			<CountryTileLegend country={legend[0]} />
		</div>
	</div>

	<div class="viz-container" class:flex-row={!$isMobileView}>
		{#if !$isMobileView}
			<div id="earth-map">{@html earth}</div>
		{/if}

		<div id="west">
			<CountryTilePanel countries={northAmerica} continentName="Северная Америка" columns="2" on:showCountryModal={handleShowCountryModal}/>
			<CountryTilePanel countries={southAmerica} continentName="Южная Америка" columns="2" on:showCountryModal={handleShowCountryModal} />
		</div>

		<div id="middle">
			<CountryTilePanel countries={europe} continentName="Европейские страны" columns="5" on:showCountryModal={handleShowCountryModal} />
			<CountryTilePanel countries={africa} continentName="Африка" columns="2" on:showCountryModal={handleShowCountryModal} />
		</div>

		<div id="east">
			<CountryTilePanel countries={asia} continentName="Азия" columns="3" on:showCountryModal={handleShowCountryModal} />
			<CountryTilePanel countries={oceania} continentName="Океания" columns="1" on:showCountryModal={handleShowCountryModal} />
		</div>
	</div>
	{#if showCountryModal}
		<CountryModal bind:show={showCountryModal} country={countryModalInfo} />
	{/if}
	
</main>

<style>
	.controls-container {
		display: block;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	#legend-container {
		width: 105px;
		margin: auto;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}

	#legend-container p {
		font-size: 0.8rem;
		line-height: 0.95rem;
		margin: 0 0 0.8rem 0;
		color: var(--color-dark-secondary);
	}

	.viz-container {
		position: relative;
		display: block;
		margin-top: 2rem;
		/* display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center; */
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
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
