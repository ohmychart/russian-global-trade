<script>
	import SideMenu from '$components/SideMenu.svelte';
	import Icon from '$components/Icon.svelte';
	import logo from '$svg/logo-sm.svg';

	export let sideMenu = false;
</script>

<header>
	<div id="main-header">
		<div id="main-logo" >{@html logo}</div>

		<div id="main-header-title">
			<h1>С кем торгует Россия?</h1>
			<p>Импорт и экспорт за последние 20 лет</p>
		</div>

		<a href="/" on:click={() => (sideMenu = !sideMenu)}>
			<Icon name="menu" size="2.5rem" id="openMenu" />
		</a>
	</div>
	<SideMenu bind:open={sideMenu} />
</header>

<style>
	#main-header {
		background-color: var(--color-white-primary);
		height: var(main-header-height);
		padding: var(--main-header-padding);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--color-dark-medium);
	}

	#main-logo {
		width: 66px;
		height: 36px;
		display: inline-block;
		padding: 0;
		margin: 0;
	}

	#main-logo {
		fill: var(--color-dark-primary);
	}

	#main-header-title {
		text-align: center;
	}

	#main-header-title h1 {
		font-family: 'IBM Plex Mono', monospace;
		font-weight: 700;
		font-size: 1.3rem;
		line-height: 2rem;
		text-transform: uppercase;
		margin: 0;
		background-color: var(--color-dark-primary);
		color: var(--color-white-primary);
		padding: 0 1.7rem 0 1.7rem
	}

	#main-header-title p {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 1rem;
		margin: 0.5rem 0 0 0;
		color: var(--color-dark-primary);
	}

	:global(#openMenu) {
		stroke: var(--color-dark-primary);
		background-color: var(--color-white-primary);
		transition: all 0.4s ease-in-out;
	}

	:global(#openMenu:hover) {
		stroke: var(--color-white-primary);
		background-color: var(--color-dark-primary);
		transform: scale(1.1);
		cursor: pointer;
	}
</style>
