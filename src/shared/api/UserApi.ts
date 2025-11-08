import Api from '@/shared/api/base/Api.ts';
import { ApiVersion } from '@/shared/api/constants/services.ts';

class UserApi extends Api {
    static async login({ login, password, clientId }: { login: string; password: string; clientId: string }) {
        const url = this.buildUrl('login', {
            clientId,
        });

        const data = await this.fetch(url, 'POST', {
            login,
            password,
            clientId,
        });

        return data.data[0].attributes;
    }

    static async refreshToken({ refreshToken, clientId }: { refreshToken: string; clientId: string }) {
        const url = this.buildUrl(
            'auth/token',
            {
                clientId,
            },
            ApiVersion.V_1,
        );

        return this.fetch(url, 'POST', {
            refreshToken,
            clientId,
        });
    }

    static async getBalance({ token, clientId }: { token: string; clientId: string }) {
        const url = this.buildUrl('users/me/balance', {
            auth: token,
            clientId,
        });
        const data = await this.fetch(url);
        return data.data;
    }
}

export default UserApi;
