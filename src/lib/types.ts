export type FilterContent = {
    "Type": string,
    "InputValues": string[]
}

export type RarityInfo = {
    "Country": string,
    "Rarity": string
}

export type NameInfo = {
    "Name": string,
    "Gender": "M" | "F" | "1M" | "1F" | "?M" | "?F" | "?",
    "CVBs": number,
    "Rarities": RarityInfo[]
}