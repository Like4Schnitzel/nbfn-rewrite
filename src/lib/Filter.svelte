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
            <span class="expandableInfo">
                This will only include entries where the name matches the
                provided regular expression. If you do not know how to use
                regular expressions, I recommend this short & playful tutorial:
                <a href="https://regexone.com/">https://regexone.com/</a>
            </span>
        </div>
        <div class="filterContent">
            <p>Name Filter:</p>
            <input class="inputField" type="text" bind:value={filter.InputValues[0]} on:input={loadTable}>
        </div>

    {:else if filter.Type === "nameLengthFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will only include entries where the name is
                longer/shorter than/equal to the provided length.
            </span>
        </div>
        <div class="filterContent">
            <p>Name Length OR-Filter:</p>
            <select bind:value={filter.InputValues[0]} on:change={loadTable}>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="=">=</option>
            </select>
            <input class="inputField numInput" type="number" min="0" bind:value={filter.InputValues[1]} on:input={loadTable}>
        </div>

    {:else if filter.Type === "CVBFilter"}
        <div class="filterInfoBtn">
            <img src="info.png" alt="blue circle with white i character">
            <span class="expandableInfo">
                This will only include entries where the CVB count is
                longer/shorter than/equal to the provided length.
            </span>
        </div>
        <div class="filterContent">
            <p>CVB Count OR-Filter</p>
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
    
    {/if}
</div>

<style>
    @import '$lib/expandableInfo.css';
    
    .inputField {
        width: max-content;
    }

    .numInput {
        text-align: right;
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
</style>
