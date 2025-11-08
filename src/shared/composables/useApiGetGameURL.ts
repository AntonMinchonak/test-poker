import { useUserStore } from '@/entities/User/store/UserStore.ts';
import GamesApi from '@/shared/api/GamesApi.ts';
import { ref } from 'vue';

export const useApiGetGameURL = () => {
    const userStore = useUserStore();
    const isLoading = ref(false);
    const errorText = ref('');
    async function load(gameId: string) {
        try {
            const game = await GamesApi.getGameURL({
                clientId: userStore.clientId,
                currency: userStore.currency,
                token: userStore.token,
                gameId,
            });

            return game.attributes['launch-options']['game-url'];
        } catch {
            errorText.value = 'List is empty';
        }
    }

    return { load, isLoading };
};
