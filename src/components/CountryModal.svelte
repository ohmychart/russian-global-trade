<script>
	import { onMount } from 'svelte';
	import { clickOutside } from '$utils/clickOutside.js';
	import { countries as countriesRu } from '$data/countriesRu.js';
	import { map as countryCodeMap } from '$data/countryCodeMap.js';
	import { displayYearStart, displayYearEnd } from '$stores/settings.js';

	import { rollup, sum, sort } from 'd3-array';

	import CountryTileLegend from '$components/CountryTileLegend.svelte';
	import CountryModalTabs from '$components/CountryModalTabs.svelte';
	import CountryModalTabContent from '$components/CountryModalTabContent.svelte';

	export let show = false;
	export let country;

	const countryCode = countryCodeMap[country.country];

	let importGoods = [];
	let exportGoods = [];

	$: tabs = [
		{
			label: 'Импорт в РФ',
			id: 1,
			content: CountryModalTabContent,
			data: importGoods,
			flow: 'import',
		},
		{
			label: 'Экспорт из РФ',
			id: 2,
			content: CountryModalTabContent,
			data: exportGoods,
			flow: 'export',
		},
	];

	let activeTab = 1;

	const reducer = function reduceGoodsGroup(records) {
		let total = sum(records, (v) => v.value);

		return {
			total,
			records
		};
	};

	onMount(async () => {
		const res = await fetch(`/api/goods/${countryCode}`);
		const data = await res.json();

		const importData = data.Import.filter(
			(d) => d.year >= $displayYearStart && d.year <= $displayYearEnd
		);
		const exportData = data.Export.filter(
			(d) => d.year >= $displayYearStart && d.year <= $displayYearEnd
		);

		importGoods = rollup(importData, reducer, (d) => d.ccode);
		exportGoods = rollup(exportData, reducer, (d) => d.ccode);

		importGoods = sort([...importGoods], (d) => -d[1].total).slice(0, 5);
		exportGoods = sort([...exportGoods], (d) => -d[1].total).slice(0, 5);

		console.log('exportGoods', country.country, exportGoods);
		console.log('importGoods', country.country, importGoods);
	});
</script>

{#if show}
	<div class="modal-outer">
		<section
			class="modal-inner"
			use:clickOutside
			on:outclick={() => {
				show = false;
			}}
		>
			<div class="modal-header">
				<div>
					<h1>{countriesRu[country.country]}</h1>
					<p>Чем торгует с Россией?</p>
					<p>с {$displayYearStart} по {$displayYearEnd} гг.</p>
					<div class="note">
						<p>ТОП-5 товаров по торговому объему.</p>
						<p>На графиках - изменение % доли товара в объеме.</p>
					</div>
				</div>

				<div class="modal-country-tile">
					<CountryTileLegend {country} />
				</div>
			</div>

			<CountryModalTabs {activeTab} {tabs} />

		</section>
	</div>
{/if}

<style>
	.modal-outer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: var(--color-white-primary-alpha80);

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: start;

		padding-top: 16px;

		z-index: 1;
	}

	.modal-inner {
		background-color: var(--color-white-primary);
		outline: 1px solid var(--color-dark-light);
		padding: 2rem;
		width: 700px;		
		z-index: 2;

		height: 50vh;
		min-height: 500px;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2,5rem;
	}

	.modal-header h1 {
		font-size: 1.5rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	.modal-header p {
		font-size: 1rem;
		line-height: 1.25rem;
		margin: 0;
	}

	.modal-header .note p {
		font-size: 0.8rem;
		line-height: 0.95rem;
		margin: 0;
		color: var(--color-dark-secondary);
	}

	.modal-header .note {
		margin-top: 0.5rem;
	}

	.modal-country-tile {
		width: 105px;
		margin-right: 105px;
	}

	h1 {
		font-size: 1.5rem;
		color: var(--color-dark-primary);
	}

</style>
