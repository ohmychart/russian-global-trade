<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { clickOutside } from '$utils/clickOutside.js';
	import { countries as countriesRu } from '$data/countriesRu.js';
	import { map as countryCodeMap } from '$data/countryCodeMap.js';
	import { displayYearStart, displayYearEnd, isMobileView } from '$stores/settings.js';

	import { rollup, sum, sort } from 'd3-array';

	import CountryTileLegend from '$components/CountryTileLegend.svelte';
	import CountryModalTabs from '$components/CountryModalTabs.svelte';
	import CountryModalTabContent from '$components/CountryModalTabContent.svelte';
	import Icon from '$components/Icon.svelte';

	export let show = false;
	export let country;

	const countryCode = countryCodeMap[country.country];

	let importGoods = [];
	let exportGoods = [];

	$: tabs = [
		{
			label: 'Импорт',
			id: 1,
			content: CountryModalTabContent,
			data: importGoods,
			flow: 'import'
		},
		{
			label: 'Экспорт',
			id: 2,
			content: CountryModalTabContent,
			data: exportGoods,
			flow: 'export'
		}
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
		const res = await fetch(`${base}/api/goods/${countryCode}.json`);
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
	<div class="modal-outer" class:mobile={$isMobileView}>
		<section
			class="modal-inner"
			class:mobile={$isMobileView}
			use:clickOutside
			on:outclick={() => {
				show = false;
			}}
		>
			<a
				href="{base}/"
				on:click={() => {
					show = false;
				}}
				id="closeModalLink"
			>
				<Icon name="x" size="16px" id="closeModal" />
			</a>

			<div class="modal-header" class:mobile={$isMobileView}>
				<div>
					<h1>{countriesRu[country.country]}</h1>
					<p>Импорт в РФ / экспорт из РФ</p>
					<p>с {$displayYearStart} по {$displayYearEnd} гг.</p>
					<p class="note">ТОП-5 товаров по торговому объему</p>
				</div>

				{#if !$isMobileView}
					<div class="modal-country-tile">
						<CountryTileLegend {country} />
					</div>
				{/if}
			</div>

			<CountryModalTabs {activeTab} {tabs} />

			<div class="modal-footer">
				<p class="note">* На графиках показано изменение процентной доли товара в объеме импорта/экспорта РФ с этой страной.</p>
			</div>
		</section>
	</div>
{/if}

<style>
	.modal-outer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		background-color: var(--color-white-primary-alpha80);

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: start;

		padding: 16px 0;

		z-index: 1;

		overflow-y: scroll;
	}

	.modal-outer.mobile {
		padding: 0;
		margin: 0;
		display: block;
	}

	.modal-inner {
		background-color: var(--color-white-primary);
		outline: 1px solid var(--color-dark-light);
		padding: 2rem;
		width: 700px;
		z-index: 2;

		min-height: 500px;
		position: relative;
	}

	.modal-inner.mobile {
		width: auto;
		padding: 16px 8px;
		margin: 0;
		outline: none;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.modal-header.mobile {
		padding: 8px;
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

	p.note {
		font-size: 0.8rem;
		line-height: 0.95rem;
		margin: 0;
		color: var(--color-dark-secondary);
	}

	.modal-header .note {
		margin-top: 0.5rem;
	}

	.modal-footer {
		margin-top: 0.5rem;
		padding: 0 8px;
	}

	.modal-country-tile {
		width: 105px;
		margin-right: 105px;
	}

	h1 {
		font-size: 1.5rem;
		color: var(--color-dark-primary);
	}

	#closeModalLink {
		height: 16px;
		position: absolute;
		top: 0;
		right: 0;
		padding: 8px;
	}

	:global(#closeModal) {
		stroke: var(--color-dark-primary);
		background-color: var(--color-white-primary);
		transition: all 0.4s ease-in-out;
	}

	:global(#closeModal:hover) {
		stroke: var(--color-white-primary);
		background-color: var(--color-dark-primary);
		transform: scale(1.1);
		cursor: pointer;
	}
</style>
