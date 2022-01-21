<script>
	import Icon from '$components/Icon.svelte';
	export let open = false;
</script>

<aside class:open>
	<nav>
		<ul>
			<li>One</li>
			<li>Two</li>
			<li>Three</li>
		</ul>
	</nav>
	<a href="/" on:click={() => (open = !open)} id="closeMenuLink">
		<Icon name="x" size="2.5rem" id="closeMenu" />
	</a>
</aside>

<style>
	aside {
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		width: calc(var(--main-column-width) * 0.8);
		max-width: 100%;
		z-index: 999;
		background-color: var(--color-white-primary);
		border-left: 2px solid var(--color-dark-light);

		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding: var(--main-header-padding);

		transition: transform 0.3s ease-in-out;
		transform: translate(100%, 0);
	}

	.open {
		transform: translate(0, 0);
	}

	#closeMenuLink {
		display: inline-block;
		height: 2.5rem;
	}

	:global(#closeMenu) {
		stroke: var(--color-dark-primary);
		background-color: var(--color-white-primary);
		transition: all 0.4s ease-in-out;
	}

	:global(#closeMenu:hover) {
		stroke: var(--color-white-primary);
		background-color: var(--color-dark-primary);
		transform: scale(1.1);
		cursor: pointer;
	}
</style>
