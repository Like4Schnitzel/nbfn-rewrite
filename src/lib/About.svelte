<div class="about">
    <details>
        <summary>
            <h1>About this page<br></h1>
            <img class="icon" src="triangle.png" alt="a white triangle">
        </summary>
        <div class="detailsContent">
            <h2><img src="info.png" alt="an i character in a blue circle"> Icons<br></h2>
            <p>
                You will find these next to rarities and in the top left of most filters. When hovering over them or tapping them,
                some extra info will be displayed. For ones in the rarity section, a full list of known rarities for that name
                will be displayed. If a lot of names are currently loaded, you may have to wait a little for the info box to appear.
                For ones within filters, you will be shown an explanation of how the filter works.
            </p>
            <h2>The plus symbol</h2>
            <p>
                Within some names you will see the character '+'. This symbolizes a '-', ' ' or an empty string,
                though the last option only applies to Arabic, Chinese and Korean names.
                Thus, "Jun+Wei" represents the names "Jun-Wei", "Jun Wei" and "Junwei"
            </p>
            <h2>Genders</h2>
            <p>
                This dataset classifies names into one of seven genders:<br>
                M - Male first name<br>
                1M - Male name if first part of name, otherwise mostly male name.<br>
                ?M - Mostly male name. Unisex name, which is mostly male.<br>
                F - Female first name<br>
                1F - Female name if first part of name, otherwise mostly female name.<br>
                ?F - Mostly female name. Unisex name, which is mostly female.<br>
                ? - Unisex name.
            </p>
            <h2>CVBs<br></h2>
            <p>
                CVB stands for consecutive vowel block. I originally wanted to count syllables, but quickly realised
                that, because of how different pronounciations are from language to language, it was unfeasible.
                So Instead I opted to count how many "blocks" of consecutive vowels there are. For this count,
                the letter "Y" is counted as a vowel.
            </p>
            <h2>Rarities</h2>
            <p>
                x% directly refers to the percentage of the population with the given name. If it is unknown, a question mark is displayed.
                In the original dataset, rarities are given on a logarithmic scale and in ranges. For the purpose of
                being more intuitive, what's presented here are the averages of said ranges.
            </p>
            <h2>Filter Explanation<br></h2>
            <p>
                Almost all filters work on an "and" based system, however the regular Name Content and Gender filters
                work on an "or" based system, within their respective filter group. This means that, should you wish to
                include for example both names that start with the letter A and ones that start with the letter B, you can
                do so by creating multiple Name Content filters.<br>
                You can change the priority of filters by clicking the up/down arrows on the right, below the trash bin icons.
                This only has an effect for sorting filters. Should you, for example, give sorting by rarity a higher priority
                than sorting by name, entries of the same rarity will be sorted by name. In actuality this means that the
                filters get executed in reverse, which is a little confusing but it works.
            </p>
            <h2>Why this site exists<br></h2>
            <p>
                I know quite a few trans people who are still struggling to pick a name. Being a trans woman myself I have also
                noticed that a lot of popular sites are very annoying to use. This site is intended to serve as a simple alternative,
                without bloat, ads, or other annoyances.
            </p>
            <h2>Name Data<br></h2>
            <p>
                Obtained from <a href="https://ftp.heise.de/ct/listings/0717-182.zip">ftp.heise.de/ct/listings/0717-182.zip</a>
                (&copy; 2007-2008 Jörg MICHAEL, Adalbert-Stifter-Str. 11, 30655 Hannover, Germany)
                and processed into <a href="nam_dict.json">nam_dict.json</a>, which is also available under the
                <a href="https://www.gnu.org/licenses/fdl-1.3.en.html">GNU FDL</a>.
            </p>
            <h2>Misc. Credits<br></h2>
            <p>
                Thanks to polilolo2 on Discord for making the sprites for the main icon as well as the up and down arrows.
            </p>
        </div>
    </details>
</div>

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

    .about {
        flex-basis: 30%;
        height: fit-content;
        background-color: #9569a9;
        border-radius: 15px;
        border: 1px solid black;
        width: 97.5%;
        margin-right: auto;
        margin-left: auto;
    }

    .about h1 {
        margin-left: 2%;
        color: var(--about-text-color);
    }

    .about h2 {
        margin-left: 5%;
        color: var(--about-text-color);
    }

    .about p {
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

    @media (min-width: 1210px) {
        .about {
            width: auto;
            margin: 0;
        }
    }
</style>