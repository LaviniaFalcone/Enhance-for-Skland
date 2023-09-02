export const getSkinAvatarUrl = (skinId: string) => {
    skinId = skinId.replace(/@/g, '%40');
    skinId = skinId.replace(/#/g, '%23');
    return `https://web.hycdn.cn/arknights/game/assets/char_skin/avatar/${skinId}.png`;
};

export const getSkinPortraitUrl = (skinId: string) => {
    skinId = skinId.replace(/@/g, '%40');
    skinId = skinId.replace(/#/g, '%23');
    return `https://web.hycdn.cn/arknights/game/assets/char_skin/portrait/${skinId}.png`;
};

export const getAvatarUrl = (skinId: string) => {
    return `https://web.hycdn.cn/arknights/game/assets/avatar/${skinId}.png`;
};

export const getSkillIconUrl = (skillId: string) => {
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
