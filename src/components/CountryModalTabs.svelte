<script>
export let tabs = [];
export let activeTab = 1;

</script>

<ul>
    {#each tabs as tab}
        <li><span class:active={activeTab === tab.id} on:click={() => activeTab = tab.id}>{tab.label}</span></li>
    {/each}
</ul>

<div class="tab-container">
    {#each tabs as tab}
        {#if tab.id === activeTab}
            <svelte:component this={tab.content} data={tab.data} flow={tab.flow} />
        {/if}
    {/each}
</div>

<style>
ul {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
}

span {
    padding: 0.5rem 3rem;
    color: var(--color-dark-primary);
    display: block;
    margin: 0;
    text-align: center;
    border-bottom: 2px solid var(--color-dark-light);
}

span:hover {
    background-color: var(--color-dark-50);
    border-color: var(--color-dark-primary);
    cursor: pointer;
}

span.active {
    color: var(--color-dark-primary);
    border-color: var(--color-dark-primary);
}

li {
    flex-grow: 1;
}

</style>