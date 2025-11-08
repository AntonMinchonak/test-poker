import UserApi from '@/shared/api/UserApi.ts';
import { useUserStore } from '@/entities/User/store/UserStore.ts';

export const useApiGetBalance = () => {
    const userStore = useUserStore();

    async function load() {
        try {
            if (!userStore.isAuthorized) return;

            const data = await UserApi.getBalance({ token: userStore.token, clientId: userStore.clientId });

            const currentBalance = data.find(
                (somethingWeird) => somethingWeird.attributes.currency === userStore.currency,
            ).attributes.available;

            userStore.balance = currentBalance;
        } catch {}
    }

    return { load };
};
