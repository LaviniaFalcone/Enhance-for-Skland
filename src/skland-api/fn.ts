import axios from 'axios';

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

export const queryArknightsRole = async (cred: string, uid: string | number) => {
    const config = {
        url: '/api/v1/game/player/info',
        params: {uid},
        headers: {cred}
    };

    const {data: {data}} = await axios<SklandResponseBody<ArknightsPlayer>>(config);
    console.log(data);
    return data;
};

export const getArknightsCharAvatarUrl = (charId: string) => {
    charId = charId.replace(/@/g, '%40');
    charId = charId.replace(/#/g, '%23');
    return `https://web.hycdn.cn/arknights/game/assets/char_skin/avatar/${charId}.png`;
};

export const getArknightsCharPortraitUrl = (charId: string) => {
    charId = charId.replace(/@/g, '%40');
    charId = charId.replace(/#/g, '%23');
    return `https://web.hycdn.cn/arknights/game/assets/char_skin/portrait/${charId}.png`;
};

export const getArknightsCharSkillIconUrl = (skillId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/char_skill/${skillId}.png`;
};

export const getTowerIconUrl = (towerId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/climb_tower/icon/${towerId}.png`;
};

export const getEquipIconUrl = (equipId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/uniequip/${equipId}.png`;
};

export const getEquipTypeIconUrl = (equipId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/uniequip/type/icon/${equipId}.png`;
};

export const getEquipTypeShiningUrl = (color: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/uniequip/type/shining/${color}.png`;
};

export const getSkinBrandLogoUrl = (brand: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/brand/${brand}.png`;
};

export const getZoneLogoUrl = (zoneId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/game_mode/campaign/zone_icon/${zoneId}.png`;
};

export const getMedalUrl = (medalId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/medal/${medalId}.png`;
};

export const getActivityLogoUrl = (activityId: string) => {
    return `https://bbs.hycdn.cn/skland-fe-static/skland-rn/images/game-arknight/${activityId}.png`;
};

export const getRougeBannerUrl = (rougeId: string) => {
    return `https://bbs.hycdn.cn/skland-fe-static/skland-rn/images/game-arknight/${rougeId}.png`;
};