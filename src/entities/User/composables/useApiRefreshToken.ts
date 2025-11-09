import UserApi from '@/shared/api/UserApi.ts';
import { useUserStore } from '@/entities/User/store/UserStore.ts';

const MAX_TRIES = 3;

export const useApiRefreshToken = () => {
    const userStore = useUserStore();
    let fails = 0;

    async function load() {
        try {
            const response = await UserApi.refreshToken({
                refreshToken: userStore.refreshToken,
                clientId: userStore.clientId,
            });

            userStore.updateToken(response.token, response['refresh-token'], response['life-time']);
            fails = 0;
        } catch {
            fails++;
            if (fails < MAX_TRIES) {
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
