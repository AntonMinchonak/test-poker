import { onScopeDispose, watch } from 'vue';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { useApiRefreshToken } from '@/entities/User/composables/useApiRefreshToken.ts';

export const useRefreshToken = () => {
    const userStore = useUserStore();
    const { load: refreshToken } = useApiRefreshToken();
    let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;

    const onError = (event: ApiErrorEvent) => {
        if (event.detail.status === '401') void refreshToken();
    };

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

    document.addEventListener('Api:Error', onError);

    onScopeDispose(() => {
        clearTimeout(refreshTokenTimeout);
        document.removeEventListener('Api:Error', onError);
    });
};
