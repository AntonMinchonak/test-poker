import { watch } from 'vue';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { useRouter } from 'vue-router';
import RouteName from '@/app/router/constants/RouteName.ts';

export const useRedirects = () => {
    const router = useRouter();
    const userStore = useUserStore();

    watch(
        () => userStore.isAuthorized,
        (value) => {
            if (value) {
                router.push({
                    name: RouteName.MAIN_PAGE,
                });
            } else {
                router.push({
                    name: RouteName.LOGIN_PAGE,
                });
            }
        },
    );
};
