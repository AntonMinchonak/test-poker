import { useApiGetBalance } from '@/entities/User/composables/useApiGetBalance.ts';
import { onScopeDispose } from 'vue';

export const useUpdateBalance = () => {
    const { load: getBalance } = useApiGetBalance();
    let balanceInterval: ReturnType<typeof setInterval> | null = null;

    balanceInterval = setInterval(() => {
        void getBalance();
    }, 30 * 1000);

    onScopeDispose(() => {
        clearInterval(balanceInterval);
    });
};
