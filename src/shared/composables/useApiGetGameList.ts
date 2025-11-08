import { useUserStore } from '@/entities/User/store/UserStore.ts';
import GamesApi from '@/shared/api/GamesApi.ts';
import { useGlobalStore } from '@/shared/store/GlobalStore.ts';

export const useApiGetGameList = () => {
    const globalStore = useGlobalStore();
    const userStore = useUserStore();
    async function load() {
        try {
            const data = await GamesApi.getGamesList({ clientId: userStore.clientId });
            globalStore.gamesList = data.map((item) => ({ ...item.attributes, id: item.id }));
        } catch {}
    }

    return { load };
};
