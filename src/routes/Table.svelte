<script lang="ts">
    import { onMount } from 'svelte';
    import { filtersInputs } from './+page.svelte';

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

    const loadRarities = () => {
        loadedRows = loadedRows;
    }

    const loadRows = () => {
        const toAdd = scrollableTable.scrollTop / 20 - (loadedRows.length - startRows);

        for (let i = 0; i < allRows.length && i < toAdd; i++) {
            addRow();
        }
    }

    onMount(async () => {
        const res = await fetch('nam_dict.json');
        jsonContents = await res.json();
        const countries: string[] = jsonContents.Countries;

        for (const country of countries) {
            countriesInJSON.push(country);
        }
        countriesInJSON = countriesInJSON;

        loadTable();
    });

    let loadedRows: NameInfo[] = [];
    let alternatingColor: number;
    let scrollableTable: HTMLDivElement;
    let allRows: any[] = [];    
    const startRows = 50;
    let selectedRarity: string = "highest";
    let countriesInJSON: string[] = [];
    let jsonContents: { Names: any; Countries: string[]; };
</script>

<div class="table">
    <div class="headers">
        <tr>
            <th class="nameColumn nameHeader">Name</th>
            <th class="genderColumn">Gender</th>
            <th class="cvbColumn">CVBs</th>
            <th class="rarityColumn rarityHeader">
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

<style>
    .nameHeader {
        text-align: left;
        border-radius: var(--table-border-radius) 0px 0px 0px;
    }

    .rarityHeader {
        position: relative;
        border-radius: 0px var(--table-border-radius) 0px 0px;
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

    .table {
        table-layout: fixed;
        background-color: #cb63d9;
        margin-left: auto;
        margin-right: auto;
        border-radius: var(--table-border-radius);
        flex-basis: 35%;
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
</style>
