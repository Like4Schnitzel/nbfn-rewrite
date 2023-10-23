<script lang="ts">
    import { onMount } from 'svelte';

    let selectedRarity: string = "highest";
    const countriesInJSON: string[] = [];

    onMount(async () => {
        const res = await fetch('nam_dict.json');
        const jsonContents = await res.json();
        const countries: string[] = jsonContents.Countries;

        for (const country of countries)
        {
            countriesInJSON.push(country);
        }
    });

    const loadRarities = () => {
        console.log(selectedRarity);
    }
</script>


<head>
    <title>Name Browser for Nerds</title>
    <meta content="Name Browser for Nerds" property="og:title" />
    <meta content="A Name Browser, for Nerds" property="og:description" />
    <meta content="https://www.like4schnitzel.at/NBFN/" property="og:url" />
    <meta content="https://www.like4schnitzel.at/NBFN/imgs/icon.png" property="og:image" />
    <meta content="#F9AEC4" data-react-helmet="true" name="theme-color" />
    <link rel="icon" href="icon.png"/>
</head>

<body class="main">
    <div class="title">
        <img src="icon.png" loading="eager" alt="pixel art magnifying glass wearing nerd glasses">
        <h1>Name Browser for Nerds</h1>
    </div>
    <div class="tableSpace">
        <div class="about">
            <details>
                <summary>
                    <h1>About this page<br></h1>
                    <img class="icon" src="triangle.png" alt="a white triangle">
                </summary>
                <div class="detailsContent">
                    <h2><img src="info.png" alt="an i character in a blue circle"> Icons<br></h2>
                    <h4>
                        You will find these next to rarities and in the top left of most filters. When hovering over them or tapping them,
                        some extra info will be displayed. For ones in the rarity section, a full list of known rarities for that name
                        will be displayed. If a lot of names are currently loaded, you may have to wait a little for the info box to appear.
                        For ones within filters, you will be shown an explanation of how the filter works.
                    </h4>
                    <h2>The plus symbol</h2>
                    <h4>
                        Within some names you will see the character '+'. This symbolizes a '-', ' ' or an empty string, 
                        though the last option only applies to Arabic, Chinese and Korean names.
                        Thus, "Jun+Wei" represents the names "Jun-Wei", "Jun Wei" and "Junwei"
                    </h4>
                    <h2>Genders</h2>
                    <h4>
                        This dataset classifies names into one of seven genders:<br>
                        M - Male first name<br>
                        1M - Male name if first part of name, otherwise mostly male name.<br>
                        ?M - Mostly male name. Unisex name, which is mostly male.<br>
                        F - Female first name<br>
                        1F - Female name if first part of name, otherwise mostly female name.<br>
                        ?F - Mostly female name. Unisex name, which is mostly female.<br>
                        ? - Unisex name.
                    </h4>
                    <h2>CVBs<br></h2>
                    <h4>
                        CVB stands for consecutive vowel block. I originally wanted to count syllables, but quickly realised
                        that, because of how different pronounciations are from language to language, it was unfeasible.
                        So Instead I opted to count how many "blocks" of consecutive vowels there are. For this count,
                        the letter "Y" is counted as a vowel.
                    </h4>
                    <h2>Rarities</h2>
                    <h4>
                        x% directly refers to the percentage of the population with the given name. If it is unknown, a question mark is displayed.
                        In the original dataset, rarities are given on a logarithmic scale and in ranges. For the purpose of
                        being more intuitive, what's presented here are the averages of said ranges.
                    </h4>
                    <h2>Filter Explanation<br></h2>
                    <h4>
                        Almost all filters work on an "and" based system, however the regular Name Content and Gender filters
                        work on an "or" based system, within their respective filter group. This means that, should you wish to
                        include for example both names that start with the letter A and ones that start with the letter B, you can
                        do so by creating multiple Name Content filters.<br>
                        You can change the priority of filters by clicking the up/down arrows on the right, below the trash bin icons.
                        This only has an effect for sorting filters. Should you, for example, give sorting by rarity a higher priority
                        than sorting by name, entries of the same rarity will be sorted by name. In actuality this means that the
                        filters get executed in reverse, which is a little confusing but it works.
                    </h4>
                    <h2>Why this site exists<br></h2>
                    <h4>
                        I know quite a few trans people who are still struggling to pick a name. Being a trans woman myself I have also
                        noticed that a lot of popular sites are very annoying to use. This site is intended to serve as a simple alternative,
                        without bloat, ads, or other annoyances.
                    </h4>
                    <h2>Name Data<br></h2>
                    <h4>
                        Obtained from <a href="https://ftp.heise.de/ct/listings/0717-182.zip">ftp.heise.de/ct/listings/0717-182.zip</a>
                        (&copy; 2007-2008 Jörg MICHAEL, Adalbert-Stifter-Str. 11, 30655 Hannover, Germany)
                        and processed into <a href="/data/nam_dict.json">nam_dict.json</a>, which is also available under the
                        <a href="https://www.gnu.org/licenses/fdl-1.3.en.html">GNU FDL</a>.
                    </h4>
                    <h2>Misc. Credits<br></h2>
                    <h4>
                        Thanks to polilolo2 on Discord for making the sprites for the main icon as well as the up and down arrows.
                    </h4>
                </div>
            </details>
        </div>
        <div class="tableColumn">
            <table class="table" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <table cellspacing="0" cellpadding="1">
                            <tr>
                                <th id="nameHeader">Name</th>
                                <th id="genderHeader">Gender</th>
                                <th id="cvbHeader">CVBs</th>
                                <th id="raritySelector">
                                    <div id="rarityLoading" class="hidden">
                                        Loading...
                                    </div>
                                    <div id="raritySelection">
                                        Rarity in
                                        <select bind:value={selectedRarity} on:change={loadRarities} id="countrySelector">
                                            <option value="highest" selected>highest</option>
                                            {#each countriesInJSON as country}
                                                <option value={country}>{country}</option>
                                            {:else}
                                                <option>this isn't supposed to happen</option>
                                            {/each}
                                        </select>
                                    </div>
                                </th>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>

<style>
    :root {
        --about-text-color: ivory;
    }

    @keyframes invisiblyGrowFontSize {
        0% {
        font-size: 0;
        opacity: 0;
        }
        100% {
        font-size: 1em;
        opacity: 0;
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
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

    .about {
        flex-basis: 30%;
        height: fit-content;
        background-color: #9569a9;
        border-radius: 15px;
        border: 1px solid black;
    }

    .about h1 {
        margin-left: 2%;
        color: var(--about-text-color);
    }

    .about h2 {
        margin-left: 5%;
        color: var(--about-text-color);
    }

    .about h4 {
        margin-left: 10%;
        margin-right: 5%;
        color: var(--about-text-color);
    }

    img.icon {
        height: 48px;
        margin-left: auto;
        margin-right: 15px;
        margin-top: auto;
        margin-bottom: auto;
        transition: all 0.2s;
    }

    details[open] img.icon {
        transform: rotate(-90deg);
    }

    details[open] .detailsContent {
        animation-name: invisiblyGrowFontSize, fadeIn;
        animation-duration: 300ms, 200ms;
        animation-delay: 0ms, 300ms;
    }

    summary {
        display: flex;
        cursor: pointer;
    }

    summary::-webkit-details-marker {
        display: none;
    }
</style>
