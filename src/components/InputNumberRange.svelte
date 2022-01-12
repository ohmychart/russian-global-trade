<script>
	export let minValue;
	export let maxValue;

	export let startValue = minValue;
	export let endValue = maxValue;

	function decrementStart() {
		if (+startValue > minValue) {
			startValue = +startValue - 1;
		}
	}

	function incrementStart() {
		if (+startValue < maxValue && startValue < endValue - 1) {
			startValue = +startValue + 1;
		}
	}

	function decrementEnd() {
		if (+endValue > minValue && +endValue > +startValue + 1) {
			endValue = +endValue - 1;
		}
	}

	function incrementEnd() {
		if (+endValue < maxValue) {
			endValue = +endValue + 1;
		}
	}
</script>

<label class="range"
	>с
	<input type="number" step="1" min={minValue} max={maxValue} bind:value={startValue} /><button
		class="decrement"
		on:click={decrementStart}>-</button
	><button on:click={incrementStart}>+</button>
</label>

<label class="range"
	>по
	<input type="number" step="1" min={minValue} max={maxValue} bind:value={endValue} /><button
		class="decrement"
		on:click={decrementEnd}>-</button
	><button on:click={incrementEnd}>+</button>
</label>

<style>
	label {
		display: inline-block;
		font-size: 1rem;
		color: var(--color-dark-primary);
		border: solid var(--color-dark-medium);
		border-width: 0 0 1px 0;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	input {
		color: var(--color-dark-primary);
		font-size: 1rem;
		border: 0;
		margin: 0;
		display: inline-block;
	}

    input:focus {
        outline: none;
    }

	button {
		background-color: var(--color-dark-light);
		border: 0;
		color: var(--color-dark-primary);
		width: 1.375rem;
		height: 1.375rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1rem;
		cursor: pointer;
		margin: 0;
		padding: 0;
		display: inline-block;
	}

	button.decrement {
		border: solid var(--color-dark-medium);
		border-width: 0 1px 0 0;
	}

	button:hover {
		background-color: var(--color-dark-medium);
	}


</style>
