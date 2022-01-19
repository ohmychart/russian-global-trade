<script>
	import CountryTile from '$components/CountryTile.svelte';
	import { isMobileView } from '$stores/settings.js'

	export let continentName;
	export let countries;
	export let columns = 2;

	let columnsClass;

	$: if ($isMobileView) {
		columnsClass = 'col-3';
	} else {
		columnsClass = `col-${columns}`;
	};

</script>

<section class:side-margin-sm={$isMobileView}>
	<div class="tile" class:tile-sm={$isMobileView}>
		<h2>{continentName}</h2>
		<ul class={columnsClass} >
			{#each countries as country}
				<li><CountryTile {country} /></li>
			{/each}
		</ul>
	</div>
</section>

<style>
	section {
		margin: 1rem 0.5rem 2rem 0.5rem;
		text-align: center;
	}

	.side-margin-sm {
		margin-left: 0;
		margin-right: 0;
	}

	h2 {
		text-align: left;
	}

	.tile {
		display: inline-block;
		background-color: var(--color-dark-50);
		border: none;
		padding: 1rem 1.3rem;
	}

	.tile-sm {
		padding: 0;
		background-color: var(--color-white-primary);
	}

	h2 {
		color: var(--color-dark-primary);
		font-size: 1rem;
		line-height: 1.375em;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	ul {
		display: grid;
		gap: 8px 8px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.col-1 {
		grid-template-columns: repeat(1, 105px);
	}

	.col-2 {
		grid-template-columns: repeat(2, 105px);
	}

	.col-3 {
		grid-template-columns: repeat(3, 105px);
	}

	.col-3-sm {
		grid-template-columns: repeat(3, 95px);
	}

	.col-4 {
		grid-template-columns: repeat(4, 105px);
	}

	.col-5 {
		grid-template-columns: repeat(5, 105px);
	}
</style>
