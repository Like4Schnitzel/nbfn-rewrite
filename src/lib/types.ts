export type FilterContent = {
    Type: FilterType,
    InputValues: string[]
}

export type PracticalFilterContent = {
    Type: FilterType,
    InputValues: any[]
}

export type RarityInfo = {
    Country: string,
    Rarity: string
}

export type NameInfo = {
    Name: string,
    Gender: "M" | "F" | "1M" | "1F" | "?M" | "?F" | "?",
    CVBs: number,
    Rarities: RarityInfo[]
}

export type FilterType = "nameContentFilter" |
                         "nameLengthFilter" |
                         "genderFilter" |
                         "CVBFilter" |
                         "rarityFilter" |
                         "nameSort" |
                         "cvbSort" |
                         "raritySort";

export type DictOfFilterTypes = Record<FilterType, boolean>;
