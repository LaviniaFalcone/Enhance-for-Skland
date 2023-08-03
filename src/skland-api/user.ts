import axios from 'axios';
import {SklandBinding, SklandResponseBody, SklandUser} from './index';

export const queryUser = async (cred: string) => {
    const config = {
        url: '/api/v1/user/me',
        headers: {cred}
    };

    const {data: {data: user}} = await axios<SklandResponseBody<SklandUser>>(config);
    return user;
};

export const queryBind = async (cred: string) => {
    const config = {
        url: '/api/v1/game/player/binding',
        headers: {cred}
    };

    const {data: {data: {list}}} = await axios<SklandResponseBody<{ list: SklandBinding[] }>>(config);
    return list.length !== 0 ? list : void 0;
};
