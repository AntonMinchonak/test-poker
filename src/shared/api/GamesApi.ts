import Api from '@/shared/api/base/Api.ts';

class GamesApi extends Api {
    static async getGamesList({ clientId }: { clientId: string }) {
        const url = this.buildUrl('casino/games', {
            clientId,
        });

        const data = await this.fetch(url);

        return data.data;
    }

    static async getGameURL({
        clientId,
        gameId,
        token,
        currency,
    }: {
        clientId: string;
        gameId: string;
        token: string;
        currency: string;
    }) {
        const url = this.buildUrl(`casino/games/${gameId}/session`, {
            clientId,
            auth: token,
        });

        const data = await this.fetch(url, 'POST', { clientId, currency });

        return data.data[0];
    }
}

export default GamesApi;
