import { useInitQueries } from '@/app/composables/useInitQueries.ts';
import { useRefreshToken } from '@/app/composables/useRefreshToken.ts';
import { useUpdateBalance } from '@/app/composables/useUpdateBalance.ts';

export const useGlobalActions = () => {
    useInitQueries();
    useRefreshToken();
    useUpdateBalance();
};
