<script>
	import SideMenu from '$components/SideMenu.svelte';
	import Icon from '$components/Icon.svelte';
	import logo from '$svg/logo-sm.svg';

	export let isMobile = false;

	let sideMenu = false;
</script>

<header>
	<div class="main-header" class:mobile={isMobile}>
		<div class="main-logo" class:mobile={isMobile}>{@html logo}</div>

		<div class="main-header-title">
			<h1 class:mobile={isMobile}>С кем торгует Россия?</h1>
			{#if !isMobile}
				<p>Импорт и экспорт товаров за последние 20 лет</p>
			{/if}
		</div>

		<a href="/" on:click={() => (sideMenu = !sideMenu)}>
			<Icon
				name="menu"
				size={isMobile ? '2rem' : '2.5rem'}
				class={isMobile ? 'open-menu-mobile' : 'open-menu'}
			/>
		</a>
	</div>
	<SideMenu bind:open={sideMenu} />
</header>

<style>
	.main-header {
		background-color: var(--color-white-primary);
		height: var(--main-header-height);
		padding: var(--main-header-padding);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--color-dark-medium);
		margin-bottom: 2.5rem;
	}

	.main-header.mobile {
		height: var(--main-header-height-mobile);
		padding: var(--main-header-padding-mobile);
		background-color: var(--color-dark-primary);
		margin-bottom: 1rem;
	}

	.main-logo {
		width: 32px;
		height: 52.5px;
		display: inline-block;
		padding: 0;
		margin: 0;
		fill: var(--color-dark-medium);
		transition: all 0.4s ease-in-out;
		cursor: pointer;
	}

	.main-logo:hover {
		fill: var(--color-dark-primary);
	}

	.main-logo.mobile {
		width: 16px;
		height: 26.25px;
		fill: var(--color-teal-primary);
	}

	.main-logo.mobile:hover {
		transform: none;
		fill: var(--color-white-primary);
	}

	.main-header-title {
		text-align: center;
	}

	.main-header-title h1 {
		font-family: 'IBM Plex Mono', monospace;
		font-weight: 700;
		font-size: 1.3rem;
		line-height: 1.5rem;
		text-transform: uppercase;
		margin: 0;
		background-color: var(--color-dark-primary);
		color: var(--color-white-primary);
		padding: 0.5rem 1.7rem 0.5rem 1.7rem;
	}

	.main-header-title h1.mobile {
		font-size: 1.15rem;
		line-height: 1.375rem;
	}

	.main-header-title p {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 1rem;
		margin: 0.5rem 0 0 0;
		color: var(--color-dark-primary);
	}

	:global(.open-menu) {
		stroke: var(--color-dark-primary);
		background-color: var(--color-white-primary);
		transition: all 0.4s ease-in-out;
		cursor: pointer;
	}

	:global(.open-menu:hover) {
		stroke: var(--color-white-primary);
		background-color: var(--color-dark-primary);
		transform: scale(1.1);
	}

	:global(.open-menu-mobile) {
		stroke: var(--color-teal-primary);
		background-color: none;
		transition: all 0.4s ease-in-out;
		cursor: pointer;
	}

	:global(.open-menu-mobile:hover) {
		stroke: var(--color-white-primary);
	}
</style>
