import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { watch } from 'vue';
import { useApiRefreshToken } from '@/shared/composables/useApiRefreshToken.ts';
import { useApiGetBalance } from '@/shared/composables/useApiGetBalance.ts';
import { useApiGetGameList } from '@/shared/composables/useApiGetGameList.ts';

export const useGlobalActions = () => {
    const userStore = useUserStore();
    const { load: refreshToken } = useApiRefreshToken();
    const { load: getBalance } = useApiGetBalance();
    const { load: getGamesList } = useApiGetGameList();
    let refreshTokenTimeout = null;

    watch(
        () => userStore.token,
        (token, oldToken) => {
            if (token && !oldToken) {
                void getBalance();
                void getGamesList();
            }
        },
        { once: true },
    );

    watch(
        () => userStore.token,
        () => {
            clearTimeout(refreshTokenTimeout);
            refreshTokenTimeout = setTimeout(
                () => {
                    void refreshToken();
                },
                (userStore.tokenTime - 100) * 1000,
            );
        },
    );

    setInterval(() => {
        void getBalance();
    }, 30 * 1000);
};
