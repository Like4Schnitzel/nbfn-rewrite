<script lang="ts">
    import { target } from "$lib/index";
    import { filtersInputs } from "$lib/stores";
    import Filter from "./Filter.svelte";

    let filterSelector: HTMLSelectElement;

    const addFilter = () => {
        if (filterSelector.value !== "std")
        {
            filtersInputs.add({
                Type: filterSelector.value,
                InputValues: []
            });

            filterSelector.value = "std";
            updateSearchParams();
        }
    }

    const updateSearchParams = () => {
        target.dispatchEvent(new CustomEvent("updateSearchParams"));
    }
</script>

<div class="filtersColumn">
    <div class="filters">
        {#each $filtersInputs as filter, i}
            <Filter filter={filter} index={i}/>
        {/each}
    </div>
    <select class="addFilter" bind:this={filterSelector} on:change={addFilter}>
        <option value="std" selected>Add Filter</option>
        <optgroup label="OR-Based Filters">
            <option value="nameContentFilter">Name Content</option>
            <option value="nameLengthFilter">Name Length</option>
            <option value="genderFilter">Gender</option>
            <option value="CVBFilter">CVB Count</option>
            <option value="rarityFilter">Rarity</option>
        </optgroup>
        <optgroup label="AND-Based Filters">
            <option value="nameLengthAndFilter">Name Length</option>
            <option value="CVBAndFilter">CVB Count</option>
            <option value="rarityAndFilter">Rarity</option>
        </optgroup>
        <optgroup label="Sorting">
            <option value="nameContentSort">Name Content</option>
            <option value="nameLengthSort">Name Length</option>
            <option value="cvbSort">CVB Count</option>
            <option value="raritySort">Rarity</option>
        </optgroup>
    </select>
</div>

<style>
    .filtersColumn {
        display: flex;
        flex-direction: column;
        flex-basis: 30%;
    }

    .addFilter {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        padding: 1%;
    }

    @media (min-width: 1210px) {
        .addFilter {
            padding: 2%;
        }
    }
</style>
