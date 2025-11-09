import { onScopeDispose, watch } from 'vue';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { useApiRefreshToken } from '@/entities/User/composables/useApiRefreshToken.ts';

export const useRefreshToken = () => {
    const userStore = useUserStore();
    const { load: refreshToken } = useApiRefreshToken();
    let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;

    watch(
        () => userStore.token,
        () => {
            clearTimeout(refreshTokenTimeout);
            refreshTokenTimeout = setTimeout(
                () => {
                    void refreshToken();
                },
                (userStore.tokenTime - userStore.tokenTime / 9) * 1000,
            );
        },
    );

    onScopeDispose(() => {
        clearTimeout(refreshTokenTimeout);
    });
};
