<script lang="ts">
    import { goto } from '$app/navigation';
    import { filtersInputs } from '$lib/stores';
    import { target } from '$lib/index';
    import About from '$lib/About.svelte';
    import Table from '$lib/Table.svelte';
    import Filters from '$lib/Filters.svelte';

    const searchParams = new URLSearchParams();
    const updateSearchParams = () => {
        searchParams.set("filters", JSON.stringify($filtersInputs));
        goto(`?${searchParams.toString()}`);
    }

    target.addEventListener("updateSearchParams", () => {
        updateSearchParams();
    });
</script>

<head>
    <title>Name Browser for Nerds</title>
    <meta content="Name Browser for Nerds" property="og:title" />
    <meta content="A Name Browser, for Nerds" property="og:description" />
    <meta content="https://www.like4schnitzel.at/NBFN/" property="og:url" />
    <meta content="https://www.like4schnitzel.at/NBFN/icon.png" property="og:image" />
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
        <Filters/>
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
</style>
