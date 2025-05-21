import type { FilterContent, FilterType, MinimalFilterContent, MinimalFilterType } from "./types";

export const target = new EventTarget();

const filterTypeToMinimal: Record<FilterType, MinimalFilterType> = {
    "nameContentFilter": "ncf",
    "nameLengthFilter": "nlf",
    "genderFilter": "gf",
    "CVBFilter": "cvbf",
    "rarityFilter": "rf",
    "nameLengthAndFilter": "nla",
    "CVBAndFilter": "cvba",
    "rarityAndFilter": "ra",
    "nameContentSort": "ncs",
    "nameLengthSort": "nls",
    "cvbSort": "cvbs",
    "raritySort": "rs"
}

export function minimizeFilterType(filter: FilterType): MinimalFilterType {
    return filterTypeToMinimal[filter];
}

export function maximizeFilterType(minimalFilter: MinimalFilterType): FilterType {
    const minimals = Object.values(filterTypeToMinimal);
    const maximizeds = Object.keys(filterTypeToMinimal) as FilterType[];
    return maximizeds[minimals.indexOf(minimalFilter)];
}

export function minimizeFilterContent(filter: FilterContent): MinimalFilterContent {
    return {
        t: minimizeFilterType(filter.Type),
        v: filter.InputValues
    }
}

export function maximizeFilterContent(minimalFilter: MinimalFilterContent): FilterContent {
    return {
        Type: maximizeFilterType(minimalFilter.t),
        InputValues: minimalFilter.v
    }
}
