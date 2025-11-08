import { ApiVersion, ApiService } from '@/shared/api/constants/services.ts';

type MethodType = 'GET' | 'POST' | 'PUT';

class Api {
    static async fetch(url: string, method: MethodType = 'GET', params = {}) {
        try {
            const response = await fetch(url, this.getInit(method, params));

            if (!response.ok) {
                throw Error(`Response status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.onError(error);
        }
    }

    private static onError(error) {
        throw Error(error);
    }

    private static getInit(method: MethodType, params = {}) {
        const init: { method: MethodType; headers: Record<string, string>; body?: string } = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (Object.keys(params).length) init.body = JSON.stringify(params);

        return init;
    }

    private static buildSarchParams(params: object) {
        return Object.entries(params).join('&').replace(/,/g, '=');
    }

    protected static buildUrl(
        url: string,
        search: Record<string, string>,
        version: MapValue<typeof ApiVersion> = ApiVersion.V_2,
        serviceName: MapValue<typeof ApiService> = ApiService.POKER,
    ): string {
        const searchParams = this.buildSarchParams(search);

        return `${serviceName}/${version}/${url}?${searchParams}`.replace(/\/\//g, '/');
    }
}

export default Api;
