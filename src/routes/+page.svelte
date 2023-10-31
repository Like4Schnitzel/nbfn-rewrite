<script lang="ts" context="module">
    export type FilterContent = {
        "Type": string,
        "InputValues": string[]
    }

    export let filtersInputs: FilterContent[];
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import About from './About.svelte';
    import Table from './Table.svelte';

    let filterSelector: HTMLSelectElement;
    const searchParams = new URLSearchParams();

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
        updateSearchParams();
    }

    const deleteFilter = (i: number) => {
        filtersInputs.splice(i, 1);
        //loadTable();

        filtersInputs = filtersInputs;
        updateSearchParams();
    }

    const updateSearchParams = () => {
        searchParams.set("filters", JSON.stringify(filtersInputs));
        goto(`?${searchParams.toString()}`);
    }
</script>

<head>
    <title>Name Browser for Nerds</title>
    <meta content="Name Browser for Nerds" property="og:title" />
    <meta content="A Name Browser, for Nerds" property="og:description" />
    <meta content="https://www.like4schnitzel.at/NBFN/" property="og:url" />
    <meta content="https://www.like4schnitzel.at/NBFN/static/icon.png" property="og:image" />
    <meta content="#F9AEC4" data-react-helmet="true" name="theme-color" />
    <link rel="icon" href="icon.png"/>
</head>

<body class="main">
    <div class="title">
        <img class="titleIcon" src="icon.png" loading="eager" alt="pixel art magnifying glass wearing nerd glasses">
        <h1 class="titleText">Name Browser for Nerds</h1>
    </div>
    <div class="tableSpace">
        <About/>
        <Table/>
        <div class="filtersColumn">
            <div class="filters">
                <!-- {#each filtersInputs as filter, i}
                    <div class="filter" on:change={updateSearchParams}>
                        <div class="btns">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                            <!-- <div class="delBtn">
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
                                <input class="nameFilterInput" type="text" bind:value={filter.InputValues[0]}>
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
                                <input class="nameLengthInput" type="number" min="0" bind:value={filter.InputValues[1]}>
                            </div>
                        {/if}
                    </div>
                {/each} -->
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
    </div>
</body>

<style>
    :root {
        --table-border-radius: 12px;
    }

    .main {
        height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-image: linear-gradient(#6c2f88, #4e2f73);
    }

    .title {
        color: rgb(240, 252, 255);
        padding-top: 25px;
        padding-bottom: 25px;
        width: fit-content;
        height: 48px;
        margin: auto;
    }

    .title img {
        display: inline;
    }

    .title h1 {
        font-family: sans-serif;
        position: relative;
        display: inline;
        padding-left: 8px;
        margin-bottom: 0px;
        margin-top: 0px;
        vertical-align: text-bottom;
    }

    .tableSpace {
        display: flex;
        justify-content: space-evenly;
    }

    .title {
        color: rgb(240, 252, 255);
        padding-top: 25px;
        padding-bottom: 25px;
        height: 48px;
        margin: auto;
    }

    .titleIcon {
        display: inline;
    }

    .titleText {
        font-family: sans-serif;
        position: relative;
        display: inline;
        padding-left: 8px;
        margin-bottom: 0px;
        margin-top: 0px;
        vertical-align: text-bottom;
    }

    .nameFilterInput {
        width: max-content;
    }

    .filterContent {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
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

    .delBtn {
        width: 16px;
        height: 16px;
    }

    .greyTrashCan {
        display: block;
        position: absolute;
    }

    .redTrashCan {
        position: absolute;
        display: none;
    }

    .delBtn:hover .redTrashCan {
        display: block;
    }

    .btns {
        position: absolute;
        display: flex;
        flex-direction: column;
        height: 100%;
        top: 0;
        right: 0;
        padding-right: 2px;
    }

    .filter {
        position: relative;
        width: 100%;
        background-color: aliceblue;
        border: 1px solid black;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        margin-bottom: 5%;
        text-align: center;
    }

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
