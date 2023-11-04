<script lang="ts">
    import type { RarityInfo, NameInfo } from "$lib/types";

    let rowData: NameInfo;
    let selectedRarity: string;

    export { rowData as data };
    export { selectedRarity as rarity };

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
</script>

<tr class="tableRow">
    <td class="nameColumn">{rowData.Name}</td>
    <td class="genderColumn">{rowData.Gender}</td>
    <td class="cvbColumn">{rowData.CVBs}</td>
    <td class="rarityColumn">
        {getSelectedRarityNum(rowData.Rarities)}
        <div class="rarityInfoBtn">
            <img src="info.png" alt="blue circle with a white i character">
            <span class="expandableInfo">
                {#each rowData.Rarities as countryRarityPair}
                    <p>{countryRarityPair.Country}: {countryRarityPair.Rarity}</p>
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
