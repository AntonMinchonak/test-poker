import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '@/pages/Login/ui/LoginPage.vue';
import MainPage from '@/pages/Main/ui/MainPage.vue';
import RouteName from '@/app/router/constants/RouteName.ts';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import GamePage from '@/pages/Game/ui/GamePage.vue';

const routes = [
    {
        path: '/',
        component: MainPage,
        name: RouteName.MAIN_PAGE,
    },
    {
        path: '/login',
        component: LoginPage,
        name: RouteName.LOGIN_PAGE,
    },
    {
        path: '/game/:id',
        component: GamePage,
        name: RouteName.GAME_PAGE,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const userStore = useUserStore();
    if (!userStore.isAuthorized && to.name !== RouteName.LOGIN_PAGE) {
        return { name: RouteName.LOGIN_PAGE };
    }

    return !(userStore.isAuthorized && to.name === RouteName.LOGIN_PAGE);
});

export default router;
