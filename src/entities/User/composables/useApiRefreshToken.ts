import UserApi from '@/shared/api/UserApi.ts';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { ref } from 'vue';

const MAX_TRIES = 2;
const fails = ref(0);

export const useApiRefreshToken = () => {
    const userStore = useUserStore();
    const retryTimeout: ReturnType<typeof setTimeout> | null = null;

    async function load() {
        if (!userStore.refreshToken) return;

        try {
            const response = await UserApi.refreshToken({
                refreshToken: userStore.refreshToken,
                clientId: userStore.clientId,
            });

            userStore.updateToken(response.token, response['refresh-token'], response['life-time']);

            clearTimeout(retryTimeout);
            fails.value = 0;
        } catch {
            fails.value++;
            if (fails.value < MAX_TRIES) {
                setTimeout(async () => {
                    await load();
                }, 5000);
            } else {
                userStore.updateToken('', '', 0);
            }
        }
    }

    return { load };
};
