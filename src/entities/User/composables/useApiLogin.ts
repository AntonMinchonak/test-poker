import UserApi from '@/shared/api/UserApi.ts';
import { useUserStore } from '@/entities/User/store/UserStore.ts';
import { ref } from 'vue';

const LoginRules = {
    length: {
        max: 10,
        min: 5,
    },
};

const PasswordRules = {
    length: {
        max: 20,
        min: 5,
    },
};

const ErrorText = {
    SHORT: 'Login is too short',
    LONG: 'Login is too long',
    SHORT_PASSWORD: 'Password is too short',
    LONG_PASSWORD: 'Password is too long',
};

export const useApiLogin = () => {
    const userStore = useUserStore();
    const isLoading = ref(false);
    const errorText = ref('');

    function checkLogin(login: string) {
        if (login.length > LoginRules.length.max) return ErrorText.LONG;
        if (login.length < LoginRules.length.min) return ErrorText.SHORT;
    }

    function checkPassword(password: string) {
        if (password.length > PasswordRules.length.max) return ErrorText.LONG_PASSWORD;
        if (password.length < PasswordRules.length.min) return ErrorText.SHORT_PASSWORD;
    }

    function validate(login: string, password: string) {
        const loginError = checkLogin(login);
        const passwordError = checkPassword(password);

        const error = loginError || passwordError;
        if (error) throw Error(error);
    }
    async function load(login: string, password: string) {
        try {
            errorText.value = '';
            validate(login, password);
            isLoading.value = true;

            const response = await UserApi.login({
                login,
                password,
                clientId: userStore.clientId,
            });

            userStore.updateToken(response.token, response['refresh-token'], response['life-time']);
        } catch (error) {
            errorText.value = error.message;
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return { load, isLoading, errorText };
};
