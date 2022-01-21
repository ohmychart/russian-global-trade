<script>
import { clickOutside } from "$utils/clickOutside.js";
import { countries as countriesRu } from '$data/countriesRu.js';

export let show = false;
export let country;

</script>

{#if show}
<div class="modal-outer">

    <div class="modal-inner" use:clickOutside on:outclick={() => {show = false}}>
        <p>Modal is here</p>
        <p>{countriesRu[country.country]}</p>
    </div>

</div>
{/if}

<style>
.modal-outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-white-primary-alpha80);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    z-index: 1;
}

.modal-inner {
    background-color: var(--color-white-primary);
    outline: 1px solid var(--color-dark-light);
    padding: 2rem;

    z-index: 2;
}
</style>