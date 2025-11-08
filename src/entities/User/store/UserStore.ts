import { acceptHMRUpdate, defineStore } from 'pinia';

type State = {
    token: string;
    refreshToken: string;
    tokenTime: number;
    clientId: string;
    balance: number;
    currency: string;
};

export const useUserStore = defineStore('UserStore', {
    state: (): State => ({
        token: '',
        refreshToken: '',
        tokenTime: 0,
        clientId: 'default',
        balance: 0,
        currency: 'USD',
    }),
    getters: {
        isAuthorized(): boolean {
            return !!this.token && !!this.refreshToken;
        },
    },
    actions: {
        updateToken(token: string, refreshToken: string, tokenTime: number) {
            this.token = token;
            this.refreshToken = refreshToken;
            this.tokenTime = tokenTime;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
