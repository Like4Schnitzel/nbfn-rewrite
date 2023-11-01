<script lang="ts" context="module">
    export type FilterContent = {
        "Type": string,
        "InputValues": string[]
    }

    export let filtersInputs: FilterContent[] = [];
    export let filterSelector: HTMLSelectElement;
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { updateSearchParams } from "./+page.svelte";
    import { target } from "./index.js";

    onMount(() => {
        filtersInputs = JSON.parse($page.url.searchParams.get('filters') || "[]");
    });

    const addFilter = () => {
        filtersInputs.push({
            "Type": filterSelector.value,
            "InputValues": []
        });

        filterSelector.value = "std";
        filtersInputs = filtersInputs;
        console.log(filtersInputs);
        updateSearchParams();
    }

    const deleteFilter = (i: number) => {
        filtersInputs.splice(i, 1);
        loadTable();

        filtersInputs = filtersInputs;
        updateSearchParams();
    }

    const loadTableEvent = new CustomEvent("loadTable");
    const loadTable = () => {
        target.dispatchEvent(loadTableEvent);
    }
</script>

<div class="filtersColumn">
    <div class="filters">
        {#each filtersInputs as filter, i}
            <div class="filter" on:change={updateSearchParams}>
                <div class="btns">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <div class="delBtn">
                        <img class="greyTrashCan" src="trashcan.png" alt="trashcan">
                        <img class="redTrashCan" src="trashcan_red.png"
                            title="Remove Filter" on:click={()=>{deleteFilter(i)}} alt="red trashcan">
                    </div>
                </div>
                {#if filter.Type === "nameContentFilter"}
                    <div class="filterInfoBtn">
                        <img src="info.png" alt="blue circle with white i character">
                        <span>
                            This will only include entries where the name matches the
                            provided regular expression. If you do not know how to use
                            regular expressions, I recommend this short & playful tutorial:
                            <a href="https://regexone.com/">https://regexone.com/</a>
                        </span>
                    </div>
                    <div class="filterContent">
                        <p>Name Filter:</p>
                        <input class="nameFilterInput" type="text" bind:value={filter.InputValues[0]} on:input={loadTable}>
                    </div>
                {:else if filter.Type === "nameLengthFilter"}
                    <div class="filterInfoBtn">
                        <img src="info.png" alt="blue circle with white i character">
                        <span>
                            This will only include entries where the name is
                            longer/shorter than/equal to the provided length.
                        </span>
                    </div>
                    <div class="filterContent">
                        <p>Name Length Filter:</p>
                        <select bind:value={filter.InputValues[0]}>
                            <option value="<">&lt;</option>
                            <option value=">">&gt;</option>
                            <option value="=">=</option>
                        </select>
                        <input class="nameLengthInput" type="number" min="0" bind:value={filter.InputValues[1]} on:input={loadTable}>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    <select class="addFilter" bind:this={filterSelector} on:change={addFilter}>
        <option value="std" selected>Add Filter</option>
        <optgroup label="Filters">
            <option value="nameContentFilter">Name Content</option>
            <option value="nameLengthFilter">Name Length</option>
            <option value="genderFilter">Gender</option>
            <option value="CVBFilter">CVB Count</option>
            <option value="rarityFilter">Rarity</option>
        </optgroup>
        <optgroup label="Sorting">
            <option value="nameSort">Name</option>
            <option value="cvbSort">CVB Count</option>
            <option value="raritySort">Rarity</option>
        </optgroup>
    </select>
    <button class="applyFilters">Apply Filters</button>
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
        margin-bottom: 5%;
        width: fit-content;
        padding: 2%;
    }

    .applyFilters {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        padding-left: 6%;
        padding-right: 6%;
        padding-top: 2%;
        padding-bottom: 2%;
        border-radius: 5px;
        background-color: rgb(244, 135, 204);
        border: solid 1px black;
        cursor: pointer;
    }

    .applyFilters:hover {
        background-color: rgb(243, 118, 197);
    }

    .applyFilters:active {
        background-color: rgb(237, 96, 185);
    }
</style>
