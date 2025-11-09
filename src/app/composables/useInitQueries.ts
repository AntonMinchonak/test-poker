import { watch } from 'vue';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { useApiGetBalance } from '@/entities/User/composables/useApiGetBalance.ts';
import { useApiGetGameList } from '@/shared/composables/useApiGetGameList.ts';

export const useInitQueries = () => {
    const userStore = useUserStore();
    const { load: getBalance } = useApiGetBalance();
    const { load: getGamesList } = useApiGetGameList();

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
};
