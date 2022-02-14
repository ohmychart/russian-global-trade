<script>
	import Icon from '$components/Icon.svelte';
	export let open = false;
</script>

<aside class:open>
	<section>
		<h2>Что это?</h2>
		<p>
			Визуализация “С кем торгует Россия?” – это часть проекта <a href="https://ohmychart.com"><span class="highlight"
				>OhMyChart!</span></a>, цель которого – создание и публикация инфографики, а также визуальных нарративов на
			социальные, экономические и исторические темы.
		</p>
	</section>
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
		max-width: 100vw;
		z-index: 999;
		background-color: var(--color-white-primary);
		border-left: 2px solid var(--color-dark-light);

		transition: transform 0.3s ease-in-out;
		transform: translate(100%, 0);
	}

	.open {
		transform: translate(0, 0);
	}

	section {
		padding: 1.5rem 2rem;
	}

	h2 {
		font-size: 1.2rem;
		color: var(--color-dark-primary);
		margin: 1.5rem 0 1rem 0;
	}

	p {
		font-size: 1rem;
		line-height: 1.25rem;
	}

	a {
		text-decoration: none;
	}

	.highlight {
	background: linear-gradient(120deg, var(--color-teal-primary) 0%, var(--color-teal-primary) 100%);
    background-repeat: no-repeat;
    background-size: 100% 30%;
    background-position: 0 95%;
	color: var(--color-dark-primary);
	font-weight: 500;
	padding: 2px 6px;
	transition: all .2s ease-in-out;
	}

	.highlight:hover {
		background-size: 100% 100%;
		color: var(--color-white-primary);
	}

	#closeMenuLink {
		position: absolute;
		top: 0;
		right: 0;
		height: 2.5rem;
		padding: 16px;
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
