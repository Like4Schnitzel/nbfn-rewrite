import { writable } from 'svelte/store';

type FilterContent = {
    "Type": string,
    "InputValues": string[]
}

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
        })
    }
}

export const filtersInputs = createFiltersList();

export const target = new EventTarget();
