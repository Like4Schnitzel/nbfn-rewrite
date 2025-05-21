export type FilterContent = {
    Type: FilterType,
    InputValues: string[]
}

export type MinimalFilterContent = {
    t: MinimalFilterType,
    v: string[]
}

export type PracticalFilterContent = {
    Type: FilterType,
    InputValues: any[]
}

export type RarityInfo = {
    Country: string,
    Rarity: number
}

export type NameInfo = {
    Name: string,
    Gender: Gender,
    CVBs: number,
    Rarities: RarityInfo[]
}

export type Gender = "M" | "F" | "1M" | "1F" | "?M" | "?F" | "?";

export type FilterType = "nameContentFilter" |
                         "nameLengthFilter" |
                         "genderFilter" |
                         "CVBFilter" |
                         "rarityFilter" |
                         "nameLengthAndFilter" |
                         "CVBAndFilter" |
                         "rarityAndFilter" |
                         "nameContentSort" |
                         "nameLengthSort" |
                         "cvbSort" |
                         "raritySort";

export type MinimalFilterType = "ncf" |
                                "nlf" |
                                "gf" |
                                "cvbf" |
                                "rf" |
                                "nla" |
                                "cvba" |
                                "ra" |
                                "ncs" |
                                "nls" |
                                "cvbs" |
                                "rs";

export type DictOfFilterTypes = Record<FilterType, boolean>;
