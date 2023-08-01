/**
 * Arknights玩家数据
 **/
declare interface ArknightsPlayer {
    activity: ArknightsActivity;
    activityInfoMap: { [id: string]: ArknightsActivityInfo };
    assistChars: ArknightsAssistChar[];
    building: ArknightsBuilding;
    campaign: ArknightsCampaign;
    campaignInfoMap: { [id: string]: ArknightsCampaignLevel };
    campaignZoneInfoMap: { [id: string]: ArknightsCampaignZone };
    chars: ArknightsChar[];
    charInfoMap: { [id: string]: ArknightsCharInfo };
    currentTs: number;
    equipmentInfoMap: { [id: string]: ArknightsEquipmentInfo };
    recruit: ArknightsRecruit[];
    rouge: ArknightsRouge;
    rougeInfoMap: { [id: string]: ArknightsRougeTheme };
    routine: ArknightsRouting;
    skins: ArknightsSkin[];
    skinInfoMap: { [id: string]: ArknightsSkinInfo };
    stageInfoMap: { [id: string]: ArknightsStageLevel };
    status: ArknightsPlayerStatus;
    tower: ArknightsTower;
    towerInfoMap: { [id: string]: ArknightsTowerZone };
    zoneInfoMap: { [id: string]: ArknightsZone };
}

/**
 * Arknights活动
 */
declare interface ArknightsActivity {
    actId: string;
    actReplicaId: string;
    type: string;
}

/**
 * Arknights活动信息
 */
declare interface ArknightsActivityInfo {
    id: string;
    name: string;
    startTime: number;
    endTime: number;
    isReplicate: boolean;
    type: string;
}

/**
 * Arknights助战干员
 **/
declare interface ArknightsAssistChar {
    charId: string;
    equip?: ArknightsEquipment;
    evolvePhase: 0 | 1 | 2;
    level: number;
    mainSkillLvl: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    potentialRank: 1 | 2 | 3 | 4 | 5 | 6;
    skillId: string;
    skinId: string;
    specializeLevel: 0 | 1 | 2 | 3;
}

/**
 * Arknights干员模组
 */
declare interface ArknightsEquipment {
    id: string;
    level: 0 | 1 | 2 | 3;
}

/**
 * Arknights模组信息
 */
declare interface ArknightsEquipmentInfo {
    id: string;
    desc: string;
    name: string;
    shiningColor: string;
    typeIcon: string;
}

/**
 * Arknights基建信息
 */
declare interface ArknightsBuilding {
    control: ArknightsBuildControl;
    dormitories: ArknightsBuildDormitory[];
    hire: ArknightsBuildHire;
    manufactures: ArknightsBuildManufacture[];
    meeting: ArknightsBuildMeeting;
    furniture: { total: number };
    labor: ArknightsBuildLabor;
    powers: ArknightsBuildPower[];
    tradings: ArknightsBuildTrading[];
    training: ArknightsBuildTraining;
}

/**
 * Arknights基建进驻干员
 */
declare interface ArknightsBuildChar {
    charId: string;
    index: number;
    ap: number;
}


/**
 * Arknights基建设施
 */
declare interface ArknightsBuildRoom {
    chars: ArknightsBuildChar[];
    level: number;
}

/**
 * Arknights基建无人机
 */
declare interface ArknightsBuildLabor {
    value: number;
    maxValue: number;
    remainSecs: number;
    lastUpdateTime: number;
}

/**
 * Arknights基建控制中枢
 */
declare interface ArknightsBuildControl extends ArknightsBuildRoom {
}

/**
 * Arknights基建宿舍
 */
declare interface ArknightsBuildDormitory extends ArknightsBuildRoom {
    comfort: number;
    slotId: string;
}

/**
 * Arknights基建人力办公室
 */
declare interface ArknightsBuildHire extends ArknightsBuildRoom {
    refreshCount: number;
    completeWorkTime: number;
}

/**
 * Arknights基建制造站
 */
declare interface ArknightsBuildManufacture extends ArknightsBuildRoom {
    complete: number;
    capacity: number;
    weight: number;
    formulaId: number;
    remain: number;
    slotId: string;
}

/**
 * Arknights基建会客室
 */
declare interface ArknightsBuildMeeting extends ArknightsBuildRoom {
    clue: {
        board: ('RHINE' | 'PENGUIN' | 'BLACKSTEEL' | 'URSUS' | 'KJERAG' | 'RHODES' | 'GLASGOW')[]
        own: number
        received: number
        shareCompleteTime: number
        sharing: boolean
    };
}

/**
 * Arknights基建发电站
 */
declare interface ArknightsBuildPower extends ArknightsBuildRoom {
    slotId: string;
}

/**
 * Arknights基建贸易站
 */
declare interface ArknightsBuildTrading extends ArknightsBuildRoom {
    stock: {
        instId: number
        type: 'O_GOLD' | string
    }[];
    stockLimit: number;
    strategy: 'O_GOLD' | string;
    slotId: string;
}

/**
 * Arknights基建训练室
 */
declare interface ArknightsBuildTraining extends ArknightsBuildRoom {
    remainPoint: number;
    remainSecs: number;
    trainee?: ArknightsBuildTraineeChar;
    trainer?: ArknightsBuildChar;
}

/**
 * Arknights基建训练室受训干员
 */
declare interface ArknightsBuildTraineeChar extends ArknightsBuildChar {
    targetSkill: number;
}

/**
 * Arknights剿灭作战信息
 */
declare interface ArknightsCampaign {
    records: ArknightsCampaignRecord;
    reward: ArknightsCampaignReward;
}

/**
 * Arknights剿灭作战纪录
 */
declare interface ArknightsCampaignRecord {
    campaignId: string;
    maxKills: number;
}

/**
 * Arknights剿灭作战奖励
 */
declare interface ArknightsCampaignReward {
    current: number;
    total: number;
}

/**
 * Arknights剿灭作战地图信息
 */
declare interface ArknightsCampaignLevel {
    id: string;
    name: string;
    campaignZoneId: string;
}

/**
 * Arknights剿灭作战区域信息
 */
declare interface ArknightsCampaignZone {
    id: string;
    name: string;
}

/**
 * Arknights干员
 */
declare interface ArknightsChar {
    charId: string;
    skinId: string;
    level: number;
    evolvePhase: 0 | 1 | 2;
    potentialRank: 1 | 2 | 3 | 4 | 5 | 6;
    mainSkillLvl: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    favorPercent: number;
    gainTime: number;
    skills: {
        id: string
        specializeLevel: 0 | 1 | 2 | 3
    }[];
    defaultEquipId: string;
    defaultSkillId: string;
    equip: {
        id: string
        level: 1 | 2 | 3
    }[];
}

/**
 * Arknights干员信息
 */
declare interface ArknightsCharInfo {
    id: string;
    name: string;
    nationId: string;
    groupId: string;
    profession: string;
    subProfessionId: string;
    rarity: 0 | 1 | 2 | 3 | 4 | 5;
}

/**
 * Arknights公开招募
 */
declare interface ArknightsRecruit {
    startTs: number;
    finishTs: number;
    duration: number;
    selectTags: { tagId: number, pick: number }[];
    state: number;
}

/**
 * Arknights集成战略
 */
declare interface ArknightsRouge {
    records: ArknightsRougeRecord[];
}

/**
 * Arknights集成战略记录
 */
declare interface ArknightsRougeRecord {
    rougeId: string;
    clearTime: number;
    relicCnt: number;
    bank: { current: number, record: number };
    mission: { current: number, total: number };
}

/**
 * Arknights集成战略主题信息
 */
declare interface ArknightsRougeTheme {
    id: string;
    name: string;
    sort: number;
}

/**
 * Arknights日常周常
 */
declare interface ArknightsRouting {
    daily: { current: number, total: number };
    weekly: { current: number, total: number };
}

/**
 * Arknights时装
 */
declare interface ArknightsSkin {
    id: string;
    ts: number;
}

/**
 * Arknights时装信息
 */
declare interface ArknightsSkinInfo {
    avatarId: string;
    brandName: string;
    displayTagId: string;
    id: string;
    illustId: string;
    name: string;
    portraitId: string;
}

/**
 * Arknights活动关卡信息
 */
declare interface ArknightsStageLevel {
    id: string;
    code: string;
    name: string;
}

/**
 * Arknights玩家状态
 */
declare interface ArknightsPlayerStatus {
    ap: ArknightsPlayerStatusAp;
    avatar: ArknightsPlayerAvatar;
    level: number;
    name: string;
    registerTs: number;
    resume: string;
    secretary: ArknightsPlayerSecretary;
    mainStageProgress: string;
    uid: string;
}

/**
 * Arknights玩家理智信息
 */
declare interface ArknightsPlayerStatusAp {
    current: number;
    max: number;
    lastApAddTime: number;
    completeRecoveryTime: number;
}

/**
 * Arknights玩家头像
 */
declare interface ArknightsPlayerAvatar {
    type: string;
    id: string;
}

/**
 * Arknights玩家助理干员
 */
declare interface ArknightsPlayerSecretary {
    charId: string;
    skinId: string;
}

/**
 * Arknights保全派驻信息
 */
declare interface ArknightsTower {
    records: ArknightsTowerRecord;
    reward: ArknightsTowerReward;
}


/**
 * Arknights保全派驻纪录
 */
declare interface ArknightsTowerRecord {
    towerId: string;
    best: number;
    hasHard: boolean;
    stageNum: number;
    unlockHard: boolean;
}

/**
 * Arknights保全派驻奖励
 */
declare interface ArknightsTowerReward {
    higherItem: { current: number, total: number };
    lowerItem: { current: number, total: number };
    termTs: number;
}

/**
 * Arknights保全派驻区域信息
 */
declare interface ArknightsTowerZone {
    id: string;
    name: string;
    subName: string;
    hasHard: boolean;
    stageNum: number;
}

/**
 * Arknights关卡区域信息
 */
declare interface ArknightsZone {
    id: string;
    name: string;
}
