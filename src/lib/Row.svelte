<script lang="ts">
    import type { RarityInfo, NameInfo } from "$lib/types";

    let rowData: NameInfo;
    let selectedRarity: number | null;

    export { rowData as data };
    export { selectedRarity as rarity };

    function rarityNumToString(rarity: number | null) {
        if (rarity === null) return "?";

        return `~${rarity}%`;
    }
</script>

<tr class="tableRow">
    <td class="nameColumn">{rowData.Name}</td>
    <td class="genderColumn">{rowData.Gender}</td>
    <td class="cvbColumn">{rowData.CVBs}</td>
    <td class="rarityColumn">
        {rarityNumToString(selectedRarity)}
        <div class="rarityInfoBtn">
            <img src="info.png" alt="blue circle with a white i character">
            <span class="expandableInfo">
                {#each rowData.Rarities as countryRarityPair}
                    <p>{countryRarityPair.Country}: ~{countryRarityPair.Rarity}%</p>
                {/each}
            </span>
        </div>
    </td>
</tr>

<style>
    @import '$lib/expandableInfo.css';
    @import '$lib/tableRows.css';
    
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

    td {
        border: solid 1px rgb(141, 58, 182);
    }
</style>
