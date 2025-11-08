import { acceptHMRUpdate, defineStore } from 'pinia';

interface Game {
    id: number | string;
    title: string;
    'provider-game-id': string;
    provider: string;
    categories: string[];
    devices: string[];
    image: string;
    table: null;
    'limit-id': number;
    'is-mini-game': boolean;
    'is-new': boolean;
    'is-single-currency': boolean;
    'is-favorite': boolean;
    'has-freespins': boolean;
    'has-demo': boolean;
    tags: [];
    'launch-options': Record<string, string>;
    'creation-date': number;
}

type State = {
    gamesList: Game[];
};

export const useGlobalStore = defineStore('GlobalStore', {
    state: (): State => ({
        gamesList: [],
    }),
    getters: {},
    actions: {},
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
