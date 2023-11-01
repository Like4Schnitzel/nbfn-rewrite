import { writable } from 'svelte/store';
import type { FilterContent } from "./types";

function createFiltersList() {
    const { subscribe, set, update } = writable<FilterContent[]>([]);

    return {
        subscribe,
        delete: (i: number) => update((fc) => {
            fc.splice(i, 1);
            return fc;
        }),
        add: (filter: FilterContent) => update((fc) => {
            fc.push(filter);
            return fc;
        }),
        set: (val: FilterContent[]) => update((fc) => {
            fc = val;
            return fc;
        })
    }
}

export const filtersInputs = createFiltersList();
