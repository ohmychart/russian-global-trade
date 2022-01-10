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
	}

	.tile {
		display: inline-block;
		background-color: var(--color-dark-50);
		border: 1px solid var(--color-dark-light);
		padding: 1rem;
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
		gap: 0.3rem 0.3rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.col-1 {
		grid-template-columns: repeat(1, 100px);
	}

	.col-2 {
		grid-template-columns: repeat(2, 100px);
	}

	.col-3 {
		grid-template-columns: repeat(3, 100px);
	}

	.col-4 {
		grid-template-columns: repeat(4, 100px);
	}

	.col-5 {
		grid-template-columns: repeat(5, 100px);
	}
</style>
