import axios from 'axios';
import {Player} from './index';

export const queryArknightsRole = async (cred: string, uid: string | number) => {
    const config = {
        url: '/api/v1/game/player/info',
        params: {uid},
        headers: {cred}
    };

    const {data: {data}} = await axios<SklandResponseBody<Player>>(config);
    console.log(data);
    return data;
};