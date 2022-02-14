<script>
    import logo from '$svg/logo-sm.svg';
</script>

<footer>
    <div class="logo">{@html logo}</div>
    <p><a href="https://ohmychart.com">OhMyChart.com</a> / 2022</p>
</footer>

<style>
footer {
    background-color: var(--color-dark-light);
    color: var(--color-dark-primary);
    padding: 1rem;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1rem;
    margin-top: 2.5rem;
}

footer p {
    margin: 0;
}

.logo {
		width: 32px;
		height: 32px;
		padding: 8px;
		margin: 0 auto;
		fill: var(--color-dark-medium);
	}
</style>