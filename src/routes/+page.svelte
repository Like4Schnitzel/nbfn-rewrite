<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import About from './About.svelte';

    interface RarityInfo {
        "Country": string,
        "Rarity": string
    }

    interface NameInfo {
        "Name": string,
        "Gender": "M" | "F" | "1M" | "1F" | "?M" | "?F" | "?",
        "CVBs": number,
        "Rarities": RarityInfo[]
    }

    interface FilterContent {
        "Type": string,
        "InputValues": string[]
    }

    function maxRarity(rarities: RarityInfo[]) {
        let max = "~0%";
        let maxNum = 0;
        for (const rarityInfo of rarities) {
            let rarityNum = parseFloat(rarityInfo.Rarity.substring(1, rarityInfo.Rarity.length-1));

            if (rarityNum > maxNum) {
                max = rarityInfo.Rarity;
            }
        }

        return max;
    }

    function getSelectedRarityNum(rarites: RarityInfo[]) {
        if (selectedRarity === "highest") return maxRarity(rarites);

        for (let rarityInfo of rarites) {
            if (rarityInfo.Country === selectedRarity) {
                return rarityInfo.Rarity;
            }
        }

        return "?"
    }

    function loadTable()
    {
        allRows = [];

        const names = jsonContents.Names
        for (const name in names) {
            let row: NameInfo = {
                Name: name,
                Gender: names[name]["Gender"],
                CVBs: names[name]["CVBs"],
                Rarities: []
            };
            for (const rarity in names[name]["Rarities"]) {
                row.Rarities.push({
                    "Country": rarity,
                    "Rarity": names[name]["Rarities"][rarity]
                });
            }

            if (checkFilters(row)) {
                allRows.push(row);
            }
        }

        loadedRows = [];
        alternatingColor = 1;
        for (let i = 0; i < allRows.length && i < startRows; i++) {
            addRow();
        }
    }

    function addRow() {
        loadedRows.push(allRows[loadedRows.length]);
        loadedRows = loadedRows;
    }

    function checkFilters(name: NameInfo) {
        if (filtersInputs.length === 0) return true;

        let passesCheck: boolean = true;
        let orBasedFilters = {
            "nameContentFilter": false,
            "nameLengthFilter": false
        };

        for (const filter of filtersInputs) {
            switch (filter.Type) {
                case "nameContentFilter":
                    orBasedFilters[filter.Type] ||= new RegExp(filter.InputValues[0]).test(name.Name);
                    break;
                case "nameLengthFilter":
                    switch (filter.InputValues[0]) {
                        case "<":
                            orBasedFilters[filter.Type] ||= name.Name.length < parseInt(filter.InputValues[1]);
                            break;
                        case ">":
                            orBasedFilters[filter.Type] ||= name.Name.length > parseInt(filter.InputValues[1]);
                            break;
                        case "=":
                            orBasedFilters[filter.Type] ||= name.Name.length === parseInt(filter.InputValues[1]);
                            break;
                    }
                    break;
            }
        }

        for (const [key, value] of Object.entries(orBasedFilters)) {
            passesCheck &&= value;
        }

        return passesCheck;
    }

    let selectedRarity: string = "highest";
    let countriesInJSON: string[] = [];
    let jsonContents: { Names: any; Countries: string[]; };
    let allRows: any[] = [];
    let alternatingColor: number;
    let loadedRows: NameInfo[] = [];
    const startRows = 50;
    let scrollableTable: HTMLDivElement;
    let filterSelector: HTMLSelectElement;
    let filtersInputs: FilterContent[] = [];
    const searchParams = new URLSearchParams();

    onMount(async () => {
        const res = await fetch('nam_dict.json');
        jsonContents = await res.json();
        const countries: string[] = jsonContents.Countries;

        for (const country of countries) {
            countriesInJSON.push(country);
        }
        countriesInJSON = countriesInJSON;

        filtersInputs = JSON.parse($page.url.searchParams.get('filters') || "[]");
        loadTable();
    });

    const loadRarities = () => {
        loadedRows = loadedRows;
    }

    const loadRows = () => {
        const toAdd = scrollableTable.scrollTop / 20 - (loadedRows.length - startRows);

        for (let i = 0; i < allRows.length && i < toAdd; i++) {
            addRow();
        }
    }

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
        loadTable();

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
        <div class="tableColumn">
            <div class="table">
                <div class="headers">
                    <tr>
                        <th class="nameColumn nameHeader">Name</th>
                        <th class="genderColumn">Gender</th>
                        <th class="cvbColumn">CVBs</th>
                        <th class="rarityColumn rarityHeader">
                            <div class="hidden rarityLoading">
                                Loading...
                            </div>
                            <div id="raritySelection">
                                Rarity in
                                <select bind:value={selectedRarity} on:change={loadRarities} class="countrySelector">
                                    <option value="highest" selected>highest</option>
                                    {#each countriesInJSON as country}
                                        <option value={country}>{country}</option>
                                    {/each}
                                </select>
                            </div>
                        </th>
                    </tr>
                </div>
                <div class="jsonDiv" on:scroll={loadRows} bind:this={scrollableTable}>
                    {#each loadedRows as row}
                        <tr class="tableRow">
                            <td class="nameColumn">{row.Name}</td>
                            <td class="genderColumn">{row.Gender}</td>
                            <td class="cvbColumn">{row.CVBs}</td>
                            <td class="rarityColumn">
                                {getSelectedRarityNum(row.Rarities)}
                                <div class="rarityInfoBtn">
                                    <!-- svelte-ignore a11y-missing-attribute -->
                                    <img src="info.png">
                                    <span>
                                        {#each row.Rarities as countryRarityPair}
                                            <p>{countryRarityPair.Country}: {countryRarityPair.Rarity}</p>
                                        {/each}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </div>
            </div>
        </div>
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
            <button class="applyFilters" on:click={loadTable}>Apply Filters</button>
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

    .tableColumn {
        flex-basis: 35%;
    }

    .nameHeader {
        text-align: left;
        border-radius: var(--table-border-radius) 0px 0px 0px;
    }

    .rarityHeader {
        position: relative;
        border-radius: 0px var(--table-border-radius) 0px 0px;
    }

    .rarityLoading {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 3px;
        margin: auto;
    }

    .rarityInfoBtn img {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        padding-left: 4px;
    }

    .rarityInfoBtn span {
        width: max-content;
        top: 24px;
        left: -95px;
    }

    .rarityInfoBtn:hover span {
        display: block;
        text-align: center;
    }

    .tableSpace {
        display: flex;
        justify-content: space-evenly;
    }

    .table {
        table-layout: fixed;
        background-color: #cb63d9;
        margin-left: auto;
        margin-right: auto;
        border-radius: var(--table-border-radius);
    }

    .tableRow {
        background-color: #e1a5e9;
    }

    .tableRow:nth-child(2n) {
        background-color: #d785e1;
    }

    .countrySelector {
        width: 52%;
    }

    .jsonDiv {
        height: 780px;
        overflow-y: auto;
        overflow: overlay;
        border-radius: 0px 0px var(--table-border-radius) var(--table-border-radius);
        border: solid 1px rgb(141, 58, 182);
        width: 100%;
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

    .hidden {
        visibility: hidden;
    }

    .nameColumn {
        text-align: left;
        padding-left: 5px;
    }

    .genderColumn,
    .cvbColumn {
        text-align: center;
        padding-left: 3px;
        padding-right: 3px;
    }

    .rarityColumn {
        text-align: center;
        position: relative;
    }

    th {
        border-right: solid 1px black;
        border-left: solid 1px black;
        border-top: solid 1px black;
    }

    tr {
        display: grid;
        grid-template-columns: 35% 15% 15%  auto;
        margin: 0 auto;
        font-family: Arial, Helvetica, sans-serif;
    }

    td {
        border: solid 1px rgb(141, 58, 182);
    }

    span {
        z-index: 9;
        display: none;
        position: absolute;
        background-color: antiquewhite;
        border-radius: 7px;
        border: 1px solid black;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
