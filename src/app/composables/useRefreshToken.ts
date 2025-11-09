import { computed, onScopeDispose, watch } from 'vue';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { useApiRefreshToken } from '@/entities/User/composables/useApiRefreshToken.ts';

export const useRefreshToken = () => {
    const userStore = useUserStore();
    const { load: refreshToken } = useApiRefreshToken();
    let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;

    const updateGap = computed(() => (userStore.tokenTime - 850) * 1000);

    const onError = (event: ApiErrorEvent) => {
        if (event.detail.status === '401') void refreshToken();
    };

    watch(
        () => userStore.token,
        () => {
            clearTimeout(refreshTokenTimeout);
            refreshTokenTimeout = setTimeout(() => refreshToken(), updateGap.value);
        },
    );

    document.addEventListener('Api:Error', onError);

    onScopeDispose(() => {
        clearTimeout(refreshTokenTimeout);
        document.removeEventListener('Api:Error', onError);
    });
};
