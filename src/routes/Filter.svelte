<script lang="ts">
    import type { FilterContent } from "$lib/types";
    import { filtersInputs } from "$lib/stores";
    import { target } from "$lib/index";

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
</script>

<div class="filter" on:change={updateSearchParams}>
    <div class="btns">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <div class="delBtn">
            <img class="greyTrashCan" src="trashcan.png" alt="trashcan">
            <img class="redTrashCan" src="trashcan_red.png"
                title="Remove Filter" on:click={()=>{deleteFilter()}} alt="red trashcan">
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
