<script lang="ts">
    import type { NameInfo, FilterType, DictOfFilterTypes, PracticalFilterContent } from '$lib/types';
    import { onMount } from 'svelte';
    import { target } from '$lib/index';
    import { filtersInputs } from '$lib/stores';
    import Row from './Row.svelte';

    target.addEventListener('loadTable', () => {loadTable()});

    function loadTable()
    {
        let usableFilters = filtersInputsStringsToValues();
        const needFilterCheck = usableFilters.length > 0;
        rowsToLoad = [];

        for (const row of allRowsInJSON) {
            if (!needFilterCheck || checkFilters(row, usableFilters)) {
                rowsToLoad.push(row);
            }
        }

        loadedRows = [];
        for (let i = 0; i < rowsToLoad.length && i < startRows; i++) {
            addRow();
        }
    }

    function addRow() {
        loadedRows.push(rowsToLoad[loadedRows.length]);
        loadedRows = loadedRows;
    }

    function checkFilters(name: NameInfo, filters: PracticalFilterContent[]) {
        let passesCheck: boolean = true;
        let orValues = {} as DictOfFilterTypes;

        for (const filter of filters) {
            switch (filter.Type) {
                case "nameContentFilter": FilterType:
                    orValues[filter.Type] ||= filter.InputValues[0].test(name.Name);
                    break;
                case "nameLengthFilter": FilterType:
                    switch (filter.InputValues[0]) {
                        case "<":
                            orValues[filter.Type] ||= name.Name.length < filter.InputValues[1];
                            break;
                        case ">":
                            orValues[filter.Type] ||= name.Name.length > filter.InputValues[1];
                            break;
                        case "=":
                            orValues[filter.Type] ||= name.Name.length === filter.InputValues[1];
                            break;
                    }
                    break;
            }
        }

        for (const [key, value] of Object.entries(orValues)) {
            if (!value)
                return false;
        }

        return passesCheck;
    }

    function filtersInputsStringsToValues() {
        let practicalFiltersInputs: PracticalFilterContent[] = [];

        for (let i = 0; i < $filtersInputs.length; i++) {
            const filter = $filtersInputs[i];
            practicalFiltersInputs.push({
                Type: filter.Type,
                InputValues: []
            });

            switch (filter.Type) {
                case "nameContentFilter": FilterType:
                    try {
                        practicalFiltersInputs[i].InputValues.push(
                            new RegExp(filter.InputValues[0])
                        );
                    } catch {
                        practicalFiltersInputs[i].InputValues.push(
                            new RegExp("")
                        );
                    }
                    break;
                case "nameLengthFilter": FilterType:
                    practicalFiltersInputs[i].InputValues.push(
                        filter.InputValues[0]
                    );
                    practicalFiltersInputs[i].InputValues.push(
                        parseInt(filter.InputValues[1])
                    );
            }
        }

        return practicalFiltersInputs;
    }

    const loadRarities = () => {
        loadedRows = loadedRows;
    }

    const loadRows = () => {
        const toAdd = scrollableTable.scrollTop / 20 - (loadedRows.length - startRows);

        for (let i = 0; i < rowsToLoad.length && i < toAdd; i++) {
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

        const names = jsonContents.Names;
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

            allRowsInJSON.push(row);
        }

        loadTable();
    });

    let selectedRarity: string;
    let loadedRows: NameInfo[] = [];
    let scrollableTable: HTMLDivElement;
    let rowsToLoad: NameInfo[] = [];
    let allRowsInJSON: NameInfo[] = [];
    const startRows = 50;
    let countriesInJSON: string[] = [];
    let jsonContents: { Names: any; Countries: string[]; };
</script>

<table class="table">
    <thead>
        <tr>
        <th class="nameColumn nameHeader">Name</th>
        <th class="genderColumn">Gender</th>
        <th class="cvbColumn">CVBs</th>
        <th class="rarityColumn rarityHeader">
            <div id="raritySelection">
            Rarity in
            <select
                bind:value={selectedRarity}
                on:change={loadRarities}
                class="countrySelector"
            >
                <option value="highest" selected>highest</option>
                {#each countriesInJSON as country}
                <option value={country}>{country}</option>
                {/each}
            </select>
            </div>
        </th>
        </tr>
    </thead>
    <tbody class="jsonDiv" on:scroll={loadRows} bind:this={scrollableTable}>
        {#each loadedRows as row}
        <Row data={row} rarity={selectedRarity} />
        {/each}
    </tbody>
</table>

<style>
    .nameHeader {
      text-align: left;
      border-radius: var(--table-border-radius) 0px 0px 0px;
    }
  
    .rarityHeader {
      position: relative;
      border-radius: 0px var(--table-border-radius) 0px 0px;
    }
  
    table {
      table-layout: fixed;
      background-color: #cb63d9;
      border-radius: var(--table-border-radius);
      flex-basis: 35%;
      width: max-content;
    }

    thead {
        display: block;
    }

    tbody {
      display: block;
      overflow-y: overlay;
      height: 80vh;
      border-radius: 0 0 var(--table-border-radius) var(--table-border-radius);
    }

    tbody::-webkit-scrollbar {
      display: none;
    }
  
    .countrySelector {
      width: 52%;
    }
  
    th {
      border-right: solid 1px black;
      border-left: solid 1px black;
      border-top: solid 1px black;
    }
  
    tr {
      display: grid;
      grid-template-columns: 35% 15% 15% auto;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
    }
  </style>
