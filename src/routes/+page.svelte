<script lang="ts">
    import { goto } from '$app/navigation';
    import { filtersInputs, displayedRarity } from '$lib/stores';
    import { target } from '$lib/index';
    import About from '$lib/About.svelte';
    import Table from '$lib/Table.svelte';
    import Filters from '$lib/Filters.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    const searchParams = new URLSearchParams();
    const updateSearchParams = () => {
        searchParams.set("filters", JSON.stringify($filtersInputs));
        searchParams.set("displayedRarity", JSON.stringify($displayedRarity));
        goto(`?${searchParams.toString()}`);
    }

    target.addEventListener("updateSearchParams", () => {
        updateSearchParams();
    });

    onMount(() => {
        filtersInputs.set(JSON.parse($page.url.searchParams.get('filters') || "[{\"Type\":\"nameContentFilter\",\"InputValues\":[]}]"));
        displayedRarity.set(JSON.parse($page.url.searchParams.get('displayedRarity') || "\"highest\""));

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
    <div class="sourceCodeLink">
        <a href="https://github.com/Like4Schnitzel/nbfn-rewrite/" title="Source Code" target="_blank" >
            <img src="github_icon.svg" alt="GitHub Logo" />
        </a>
    </div>
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
        font-family: Arial, Helvetica, sans-serif;
    }

    .sourceCodeLink {
        position: fixed;
        bottom: 2vh;
        left: 2vh;
        height: 5vh;
        width: 5vh;
        border-radius: 50%;
        background-color: black;
    }

    .sourceCodeLink a {
        height: 100%;
        width: 100%;
    }

    .sourceCodeLink a img {
        height: 100%;
        width: 100%;
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

    .tableSpace {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 2rem;
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
        font-size: clamp(30px, 3vw, 40px);
    }


    @media (min-width: 1210px) {
        .tableSpace {
            flex-direction: row;
            gap: 0;
        }
    }
</style>
