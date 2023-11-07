<script lang="ts">
    import type { FilterContent } from "$lib/types";
    import { countriesInJSON, filtersInputs } from "$lib/stores";
    import { target } from "$lib/index";
    import { afterUpdate } from "svelte";

    export let filter: FilterContent;
    export let index: number;

    const updateSearchParams = () => {
        target.dispatchEvent(new CustomEvent("updateSearchParams"));
    }

    const loadTable = () => {
        target.dispatchEvent(new CustomEvent("loadTable"));
    }

    const deleteFilter = () => {
        filtersInputs.delete(index);
        updateSearchParams();
        loadTable();
    }

    const moveFilterUp = () => {
        if (index > 0)
        {
            filtersInputs.swap(index, index-1);
            updateSearchParams();
            loadTable();
        }
    }

    const moveFilterDown = () => {
        if (index < $filtersInputs.length)
        {
            filtersInputs.swap(index, index+1);
            updateSearchParams();
            loadTable();
        }
    }

    afterUpdate(() => {
        loadTable();
    });
</script>

<div class="filter" on:change={updateSearchParams}>
    <div class="btns">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="btn" on:click={deleteFilter}>
            <img class="defaultImg" src="trashcan.png" alt="trashcan">
            <img class="overlayImg" src="trashcan_red.png"
                title="Remove Filter" alt="red trashcan">
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="btn" on:click={moveFilterUp}>
            {#if index > 0}
                <img class="defaultImg" src="up_arrow.png" alt="upwards arrow">
                <img class="overlayImg" src="up_arrow_green.png"
                    title="Move Filter up" alt="green upwards arrow">
            {/if}
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="btn" on:click={moveFilterDown}>
            {#if index < $filtersInputs.length-1}
                <img class="defaultImg" src="down_arrow.png" alt="downwards arrow">
                <img class="overlayImg" src="down_arrow_green.png"
                    title="Move Filter down" alt="green downwards arrow">
            {/if}
        </div>
    </div>

    {#if filter.Type === "nameContentFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will only include entries where the name matches the
                provided regular expression. If you do not know how to use
                regular expressions, I recommend this short & playful tutorial:
                <a href="https://regexone.com/">https://regexone.com/</a>
            </span>
        </div>
        <div class="filterContent">
            <p>Name Filter:</p>
            <input class="inputField" type="text" bind:value={filter.InputValues[0]} placeholder="(case sensitive)">
        </div>

    {:else if filter.Type === "nameLengthFilter" || filter.Type === "nameLengthAndFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                {#if filter.Type === "nameLengthFilter"}
                    This will only include entries where the name length is
                    longer/shorter than/equal to the provided one.
                {:else}
                    This will exclude all entries where the name length is
                    longer/shorter than/equal to the provided one.
                {/if}
            </span>
        </div>
        <div class="filterContent">
            {#if filter.Type === "nameLengthFilter"}
                <p>Name Length OR-Filter:</p>
            {:else}
                <p>Name Length AND-Filter:</p>
            {/if}
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
            </select>
            <input class="inputField numInput" type="number" min="0" bind:value={filter.InputValues[1]} on:input={loadTable}>
        </div>

    {:else if filter.Type === "CVBFilter" || filter.Type === "CVBAndFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                {#if filter.Type === "CVBFilter"}
                    This will only include entries where the CVB count is
                    longer/shorter than/equal to the provided one.
                {:else}
                    This will exclude all entries where the CVB count is
                    longer/shorter than/equal to the provided one.
                {/if}
            </span>
        </div>
        <div class="filterContent">
            {#if filter.Type === "CVBFilter"}
                <p>CVB Count OR-Filter</p>
            {:else}
                <p>CVB Count AND-Filter</p>
            {/if}
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
            </select>
            <input class="inputField numInput" type="number" min="0" bind:value={filter.InputValues[1]} on:input={loadTable}>
        </div>

    {:else if filter.Type === "genderFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will only include entries where the gender is
                equal to the provided one.
            </span>
        </div>
        <div class="filterContent">
            <p>Gender Filter</p>
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="M">M</option>
                <option value="1M">1M</option>
                <option value="?M">?M</option>
                <option value="F">F</option>
                <option value="1F">1F</option>
                <option value="?F">?F</option>
                <option value="?">?</option>
            </select>
        </div>

    {:else if filter.Type === "rarityFilter" || filter.Type === "rarityAndFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                {#if filter.Type === "rarityFilter"}
                    This will only include entries where the rarity is
                    longer/shorter than/equal to the provided one.
                {:else}
                    This will excluse all entries where the rarity is
                    longer/shorter than/equal to the provided one.
                {/if}
            </span>
        </div>
        <div class="filterContent">
            {#if filter.Type === "rarityFilter"}
                <p>Rarity OR-Filter</p>
            {:else}
                <p>Rarity AND-Filter</p>
            {/if}
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
            </select>
            <div class="squishTogether">
                <input class="inputField numInput" type="number" min="0" bind:value={filter.InputValues[1]} on:input={loadTable}>
                <p>%</p>
            </div>
            <p>in</p>
            <select class="countrySelect" bind:value={filter.InputValues[2]} on:change={loadTable}>
                <option value="highest" selected>highest</option>
                {#each $countriesInJSON as country}
                    <option value={country}>{country}</option>
                {/each}
            </select>
        </div>
    
    {:else if filter.Type === "nameContentSort"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will sort names alphabetically.
            </span>
        </div>
        <div class="filterContent">
            <p>Name Content Sort:</p>
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
    
    {:else if filter.Type === "nameLengthSort"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will sort names by length.
            </span>
        </div>
        <div class="filterContent">
            <p>Name Length Sort:</p>
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>

    {:else if filter.Type === "cvbSort"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will sort names by CVB count.
            </span>
        </div>
        <div class="filterContent">
            <p>CVB Sort:</p>
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </div>
    
    {:else if filter.Type === "raritySort"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will sort names by rarity.
            </span>
        </div>
        <div class="filterContent">
            <p>Rarity Sort:</p>
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
            <p>in</p>
            <select class="countrySelect" bind:value={filter.InputValues[1]} on:change={loadTable}>
                <option value="highest" selected>highest</option>
                {#each $countriesInJSON as country}
                    <option value={country}>{country}</option>
                {/each}
            </select>
        </div>
    {/if}
</div>

<style>
    @import '$lib/expandableInfo.css';
    
    .inputField {
        width: max-content;
    }

    .numInput {
        text-align: right;
        width: 15%;
    }

    .countrySelect {
        width: 15%;
    }

    .squishTogether {
        width: 20%;
        display: flex;
    }

    .squishTogether .numInput {
        width: 90%;
        height: fit-content;
        margin-top: auto;
        margin-bottom: auto;
    }

    p {
        margin: 0;
        display: inline;
    }

    .filterContent {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2%;
        justify-content: center;
    }

    .filterInfoBtn:hover span {
        display: block;
    }

    .filterInfoBtn span {
        width: 80%;
        top: 18px;
        line-height: normal;
    }

    .filterInfoBtn img {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0px;
        left: 0px;
        padding: 2px;
    }

    .btn {
        width: 16px;
        height: 16px;
    }

    .overlayImg,
    .defaultImg {
        display: block;
        position: absolute;
        margin-top: auto;
        margin-bottom: auto;
        top: 0;
        bottom: 0;
    }

    .overlayImg {
        display: none;
    }

    .btn:hover .overlayImg {
        display: block;
    }

    .btns {
        position: absolute;
        display: flex;
        flex-direction: row-reverse;
        top: 0;
        right: 0;
        padding-right: 2px;
        gap: 2px;
    }

    @media (min-width: 1210px) {
        .overlayImg,
        .defaultImg {
            margin-top: 0;
            margin-bottom: 0;
            top: auto;
            bottom: auto;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
        }

        .btns {
            flex-direction: column;
        }
    }

    .filter {
        position: relative;
        width: 90%;
        margin-right: auto;
        margin-left: auto;
        background-color: aliceblue;
        border: 1px solid black;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        margin-bottom: 5%;
        text-align: center;
    }

    @media (min-width: 1210px) {
        .filter {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
        }
    }
</style>
