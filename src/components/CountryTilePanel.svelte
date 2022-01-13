<script>
	import CountryTile from '$components/CountryTile.svelte';

	export let continentName;
	export let countries;
	export let columns = 2;

	const columnsClass = `col-${columns}`
</script>

<section>
	<div class="tile">
		<h2>{continentName}</h2>
		<ul class={columnsClass} >
			{#each countries as country}
				<li class="col-2-item"><CountryTile {country} /></li>
			{/each}
		</ul>
	</div>
</section>

<style>
	section {
		margin: 1rem 1rem 2rem 1rem;
		text-align: center;
	}

	h2 {
		text-align: left;
	}

	.tile {
		display: inline-block;
		background-color: var(--color-dark-50);
		border: 1px solid var(--color-dark-light);
		padding: 0.5rem 1rem;
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
		gap: 10px 10px;
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

	.col-4 {
		grid-template-columns: repeat(4, 105px);
	}

	.col-5 {
		grid-template-columns: repeat(5, 105px);
	}
</style>
