<script>
	export let isSelected = false;
    export let title = ""
</script>

<button class:selected={isSelected} on:click={() => (isSelected = !isSelected)} {title}><slot /></button>

<style>
	button {
		background-color: var(--color-dark-light);
        outline: 1px solid var(--color-dark-light);
		border: 0;
		width: 1.375rem;
		height: 1.375rem;
        line-height: 1.375rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1.375rem;
		cursor: pointer;
		margin: 0;
		padding: 0;
		display: inline-block;
	}

	button.selected {
		background-color: var(--color-dark-primary);
	}
</style>
